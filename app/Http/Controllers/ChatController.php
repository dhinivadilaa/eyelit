<?php

namespace App\Http\Controllers;

use App\Models\PesanChat;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Tampilkan halaman chat untuk pembeli.
     * Jika Admin, redirect ke dashboard tab chat.
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->peran === 'Admin') {
            $chatUserId = $request->query('chat_user_id');
            if ($chatUserId) {
                return redirect()->route('dashboard', ['tab' => 'chat', 'chat_user_id' => $chatUserId]);
            }
            return redirect()->route('dashboard', ['tab' => 'chat']);
        }

        // Cari Admin penerima
        $admin = User::where('peran', 'Admin')->first();
        if (!$admin) {
            return redirect()->back()->with('error', 'Admin tidak tersedia saat ini.');
        }

        // Ambil semua pesan antara pengguna ini dan Admin
        $messages = PesanChat::with('produk')
            ->where(function ($q) use ($admin, $user) {
                $q->where('pengirim_id', $user->id)
                  ->where('penerima_id', $admin->id);
            })
            ->orWhere(function ($q) use ($admin, $user) {
                $q->where('pengirim_id', $admin->id)
                  ->where('penerima_id', $user->id);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        // Tandai pesan dari admin ke user ini sebagai sudah dibaca
        PesanChat::where('pengirim_id', $admin->id)
            ->where('penerima_id', $user->id)
            ->where('dibaca', false)
            ->update(['dibaca' => true]);

        // Opsional: Muat info produk jika ada produk_id
        $produkContext = null;
        if ($request->has('produk_id')) {
            $produkContext = Produk::find($request->query('produk_id'));
        }

        return Inertia::render('chat', [
            'messages' => $messages,
            'adminUser' => [
                'id' => $admin->id,
                'username' => $admin->username,
                'email' => $admin->email
            ],
            'produkContext' => $produkContext
        ]);
    }

    /**
     * Kirim pesan baru.
     */
    public function kirimPesan(Request $request)
    {
        $request->validate([
            'pesan' => 'required|string',
            'penerima_id' => 'nullable|exists:users,id',
            'produk_id' => 'nullable|exists:produk,id',
        ]);

        $user = auth()->user();
        $pengirimId = $user->id;
        $penerimaId = $request->penerima_id;

        if ($user->peran !== 'Admin') {
            $admin = User::where('peran', 'Admin')->first();
            $penerimaId = $admin ? $admin->id : null;
        }

        if (!$penerimaId) {
            return back()->with('error', 'Penerima tidak ditemukan.');
        }

        PesanChat::create([
            'pengirim_id' => $pengirimId,
            'penerima_id' => $penerimaId,
            'pesan' => $request->pesan,
            'produk_id' => $request->produk_id,
            'dibaca' => false,
        ]);

        return back()->with('success', 'Pesan berhasil dikirim.');
    }

    /**
     * Tandai pesan dari pengguna tertentu sebagai dibaca (untuk AJAX/Inertia request).
     */
    public function bacaSemua(Request $request)
    {
        $request->validate([
            'pengirim_id' => 'required|exists:users,id'
        ]);

        PesanChat::where('pengirim_id', $request->pengirim_id)
            ->where('penerima_id', auth()->id())
            ->where('dibaca', false)
            ->update(['dibaca' => true]);

        return back();
    }

    /**
     * Tampilkan halaman notifikasi dan tandai semua sebagai dibaca.
     */
    public function halamanNotifikasi()
    {
        $user = auth()->user();

        // Tandai notifikasi DB sebagai dibaca
        if (\Illuminate\Support\Facades\Schema::hasTable('notifikasi')) {
            \DB::table('notifikasi')
                ->where('pengguna_id', $user->id)
                ->where('dibaca', false)
                ->update(['dibaca' => true]);
        }

        // Tandai pesan chat sebagai dibaca
        if (\Illuminate\Support\Facades\Schema::hasTable('pesan_chat')) {
            if ($user->peran === 'Admin') {
                PesanChat::where('penerima_id', $user->id)
                    ->where('dibaca', false)
                    ->update(['dibaca' => true]);
            } else {
                $admin = User::where('peran', 'Admin')->first();
                if ($admin) {
                    PesanChat::where('pengirim_id', $admin->id)
                        ->where('penerima_id', $user->id)
                        ->where('dibaca', false)
                        ->update(['dibaca' => true]);
                }
            }
        }

        return Inertia::render('notifications');
    }
}

<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $allNotifications = [];
        if ($request->user()) {
            // 1. Pesan chat dari Admin ke User (untuk Pelanggan)
            $chatMessages = [];
            if (\Illuminate\Support\Facades\Schema::hasTable('pesan_chat') && $request->user()->peran !== 'Admin') {
                $chatMessages = \App\Models\PesanChat::join('users', 'pesan_chat.pengirim_id', '=', 'users.id')
                    ->where('users.peran', 'Admin')
                    ->where('pesan_chat.penerima_id', $request->user()->id)
                    ->orderBy('pesan_chat.created_at', 'desc')
                    ->limit(20)
                    ->select('pesan_chat.*')
                    ->get()
                    ->map(function ($msg) {
                        return [
                            'title' => 'Pesan dari Penjual',
                            'message' => $msg->pesan,
                            'time' => $msg->created_at->diffForHumans(),
                            'link' => '/chat',
                            'dibaca' => (bool)$msg->dibaca,
                            'timestamp' => $msg->created_at->timestamp
                        ];
                    })
                    ->toArray();
            }

            // 2. Pesan chat dari Pelanggan ke Admin (untuk Admin)
            $adminMessages = [];
            if ($request->user()->peran === 'Admin' && \Illuminate\Support\Facades\Schema::hasTable('pesan_chat')) {
                $adminMessages = \App\Models\PesanChat::with('pengirim')
                    ->where('penerima_id', $request->user()->id)
                    ->orderBy('created_at', 'desc')
                    ->limit(20)
                    ->get()
                    ->map(function ($msg) {
                        return [
                            'title' => 'Pesan dari ' . ($msg->pengirim->username ?? 'Pelanggan'),
                            'message' => $msg->pesan,
                            'time' => $msg->created_at->diffForHumans(),
                            'link' => '/dashboard?tab=chat&chat_user_id=' . $msg->pengirim_id,
                            'dibaca' => (bool)$msg->dibaca,
                            'timestamp' => $msg->created_at->timestamp
                        ];
                    })
                    ->toArray();
            }

            // 3. Notifikasi DB standar
            $dbNotifications = [];
            if (\Illuminate\Support\Facades\Schema::hasTable('notifikasi')) {
                $dbNotifications = \DB::table('notifikasi')
                    ->where('pengguna_id', $request->user()->id)
                    ->orderBy('created_at', 'desc')
                    ->limit(20)
                    ->get()
                    ->map(function ($n) {
                        return [
                            'title' => $n->judul_notifikasi,
                            'message' => $n->isi_notifikasi,
                            'time' => \Carbon\Carbon::parse($n->created_at)->diffForHumans(),
                            'link' => $n->pesanan_id ? '/pesanan/' . $n->pesanan_id : '#',
                            'dibaca' => (bool)$n->dibaca,
                            'timestamp' => \Carbon\Carbon::parse($n->created_at)->timestamp
                        ];
                    })
                    ->toArray();
            }

            $allNotifications = array_merge($chatMessages, $adminMessages, $dbNotifications);
            
            // Sort by timestamp desc
            usort($allNotifications, function ($a, $b) {
                return $b['timestamp'] <=> $a['timestamp'];
            });

            // Limit output
            $allNotifications = array_slice($allNotifications, 0, 30);
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? array_merge($request->user()->toArray(), [
                    'notifications' => $allNotifications
                ]) : null,
                'csrf' => csrf_token(),
                'unread_chat_count' => ($request->user() && \Illuminate\Support\Facades\Schema::hasTable('pesan_chat'))
                    ? \App\Models\PesanChat::where('penerima_id', $request->user()->id)
                        ->where('dibaca', false)
                        ->count()
                    : 0,
                'keranjang_count' => $request->user() ? \App\Models\Keranjang::where('pengguna_id', $request->user()->id)->sum('jumlah') : 0,
                'cart_items' => $request->user() ? \App\Models\Keranjang::with('produk')->where('pengguna_id', $request->user()->id)->get()->map(function($item) {
                    return [
                        'id' => $item->id,
                        'produk_id' => $item->produk_id,
                        'nama' => $item->produk->nama_produk ?? 'Produk tidak ditemukan',
                        'merek' => $item->produk->merek ?? 'N/A',
                        'gambar' => $item->produk->gambar,
                        'harga' => $item->produk->harga_produk ?? 0,
                        'jumlah' => $item->jumlah,
                        'tipe_pembelian' => $item->tipe_pembelian,
                    ];
                }) : [],
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}

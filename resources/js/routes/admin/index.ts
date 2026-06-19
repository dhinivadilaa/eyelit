import pesanan from './pesanan'
import laporan from './laporan'
import pengguna from './pengguna'
import produk from './produk'
const admin = {
    pesanan: Object.assign(pesanan, pesanan),
laporan: Object.assign(laporan, laporan),
pengguna: Object.assign(pengguna, pengguna),
produk: Object.assign(produk, produk),
}

export default admin
import Auth from './Auth'
import ProdukController from './ProdukController'
import UsernameCheckController from './UsernameCheckController'
import EmailCheckController from './EmailCheckController'
import KeranjangController from './KeranjangController'
import CheckoutController from './CheckoutController'
import OngkirController from './OngkirController'
import PesananController from './PesananController'
import UlasanController from './UlasanController'
import DashboardController from './DashboardController'
import ChatController from './ChatController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
ProdukController: Object.assign(ProdukController, ProdukController),
UsernameCheckController: Object.assign(UsernameCheckController, UsernameCheckController),
EmailCheckController: Object.assign(EmailCheckController, EmailCheckController),
KeranjangController: Object.assign(KeranjangController, KeranjangController),
CheckoutController: Object.assign(CheckoutController, CheckoutController),
OngkirController: Object.assign(OngkirController, OngkirController),
PesananController: Object.assign(PesananController, PesananController),
UlasanController: Object.assign(UlasanController, UlasanController),
DashboardController: Object.assign(DashboardController, DashboardController),
ChatController: Object.assign(ChatController, ChatController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers
import { React, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import LayoutSupplier from '../components/LayoutSupplier';
import Profile from '../pages/Supplier/Profile';
import Dashboard from '../pages/Supplier/Dashboard';
import KelolaPesanan from '../pages/Supplier/KelolaPesanan';
import KelolaProduk from '../pages/Supplier/KelolaProduk';
import LayoutAdmin from '../components/LayoutAdmin';
import DashboardAdmin from '../pages/Admin/DashboardAdmin';
import KelolaUser from '../pages/Admin/components/KelolaUser';
import VerifikasiSupplier from '../pages/Admin/components/VerifikasiSupplier';
import KelolaFAQ from '../pages/Admin/components/KelolaFAQ';
import KelolaArtikel from '../pages/Admin/components/KelolaArtikel';
import Faq from '../pages/Supplier/Faq';
import LihatTransaksi from '../pages/Admin/components/LihatTransaksi';
import { connect } from 'react-redux';
import PrivateRoutes from './PrivateRoutes';

class index extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/login' component={Login} />
					<PrivateRoutes exact path='/' component={Login} />
					<PrivateRoutes path='/supplier/:path?' roles={['2']} exact>
						<LayoutSupplier>
							<Switch>
								<PrivateRoutes
									path='/supplier'
									roles={['2']}
									exact
									component={Profile}
								/>
								<PrivateRoutes
									path='/supplier/profile'
									roles={['2']}
									exact
									component={Profile}
								/>
								<PrivateRoutes
									path='/supplier/dashboard'
									roles={['2']}
									component={Dashboard}
								/>
								<PrivateRoutes
									path='/supplier/kelolapesanan'
									roles={['2']}
									component={KelolaPesanan}
								/>
								<PrivateRoutes
									path='/supplier/kelolaproduk'
									roles={['2']}
									component={KelolaProduk}
								/>
								<PrivateRoutes
									path='/supplier/faq'
									roles={['2']}
									component={Faq}
								/>
							</Switch>
						</LayoutSupplier>
					</PrivateRoutes>

					{/* Route Admin */}
					<PrivateRoutes path='/admin/:path?' roles={['1']} exact>
						<LayoutAdmin>
							<Switch>
								<PrivateRoutes
									path='/admin'
									component={DashboardAdmin}
									exact
									roles={['1']}
								/>
								<PrivateRoutes
									path='/admin/lihattransaksi'
									component={LihatTransaksi}
									roles={['1']}
								/>
								<PrivateRoutes
									path='/admin/kelolauser'
									component={KelolaUser}
									roles={['1']}
								/>
								<PrivateRoutes
									path='/admin/verifikasi'
									component={VerifikasiSupplier}
									roles={['1']}
								/>
								<PrivateRoutes
									path='/admin/kelolafaq'
									roles={['1']}
									component={KelolaFAQ}
								/>
								<PrivateRoutes
									path='/admin/kelolaartikel'
									roles={['1']}
									component={KelolaArtikel}
								/>
							</Switch>
						</LayoutAdmin>
					</PrivateRoutes>
				</Switch>
			</Router>
		);
	}
}

export default connect()(index);

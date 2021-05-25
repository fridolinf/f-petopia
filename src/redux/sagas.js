import { all } from 'redux-saga/effects';
import loginSaga from './login/saga';
import supplierSaga from '../redux/supplier/saga/sagaSupplier';
import adminSaga from './admin/saga/sagaAdmin';
export default function* rootSaga() {
	yield all([loginSaga(), supplierSaga(), adminSaga()]);
}

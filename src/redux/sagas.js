import { all } from 'redux-saga/effects';
import loginSaga from './login/saga';
import supplierSaga from '../redux/supplier/saga/sagaSupplier';
export default function* rootSaga() {
	yield all([loginSaga(), supplierSaga()]);
}

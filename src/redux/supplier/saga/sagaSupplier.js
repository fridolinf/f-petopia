import { put, takeEvery, fork, all, select } from 'redux-saga/effects';
import axios from 'axios';
import { getLoggedInUser } from '../../../utils/session';
import { api } from '../../../service/api';

let supplierState = (state) => state.reducerSupplier;

function* getDataCategories(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(`${api.getCategories}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		// const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
		// yield call(delay, 1000);
		yield put({ type: 'GET_DATA_CATEGORIES_SUCCESS', value: res.data });
	} catch (e) {}
}
function* getData(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(`${api.getUser(getLoggedInUser().userId)}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		// const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
		// yield call(delay, 1000);
		yield put({ type: 'GET_DATA_SUPPLIER_SUCCESS', payload: res.data });
	} catch (e) {}
}
function* getDataProducts(action) {
	const token = getLoggedInUser().token;
	let supplier = yield select(supplierState);
	try {
		const res = yield axios.get(
			`${api.getProducts(getLoggedInUser().marketId, supplier.location)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DATA_PRODUCTS_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}

function* getDetailProducts(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.getDetailProducts(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DETAIL_P_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}

function* delProducts(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.delete(
			`${api.delProducts(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'DELETE_PRODUCTS_SUCCESS', payload: res.data });
		yield* getDataProducts();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

function* addProducts(action) {
	const token = getLoggedInUser().token;
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.post(
			`${api.addProducts(getLoggedInUser().marketId)}`,
			param,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'ADD_PRODUCTS_SUCCESS', payload: res.data });
		yield* getDataProducts();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

function* updateProducts(action) {
	const token = getLoggedInUser().token;
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.put(
			`${api.updateProducts(action.id)}`,
			param,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'UPDATE_PRODUCTS_SUCCESS', payload: res.data });
		yield* getDataProducts();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

function* watchGetDataCategories() {
	yield takeEvery('REQUEST_DATA_CATEGORIES', getDataCategories);
}
function* watchGetData() {
	yield takeEvery('REQUEST_DATA_SUPPLIER', getData);
}
function* watchGetDataProduct() {
	yield takeEvery('REQUEST_DATA_PRODUCTS', getDataProducts);
}
function* watchGetDetailProduct() {
	yield takeEvery('REQUEST_DETAIL_P', getDetailProducts);
}
function* watchDelProduct() {
	yield takeEvery('DELETE_PRODUCTS_REQUEST', delProducts);
}
function* watchAddProduct() {
	yield takeEvery('REQUEST_ADD_PRODUCTS', addProducts);
}
function* watchUpdateProduct() {
	yield takeEvery('REQUEST_UPDATE_PRODUCTS', updateProducts);
}
function* supplierSaga() {
	yield all([
		fork(watchGetDataCategories),
		fork(watchGetData),
		fork(watchGetDataProduct),
		fork(watchGetDetailProduct),
		fork(watchDelProduct),
		fork(watchAddProduct),
		fork(watchUpdateProduct),
	]);
}
export default supplierSaga;

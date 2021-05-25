import { put, takeEvery, fork, all, select } from 'redux-saga/effects';
import axios from 'axios';
import { getLoggedInUser } from '../../../utils/session';
import { api } from '../../../service/api';

let adminState = (state) => state.reducerAdmin;

function* getDataUsers(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`http://localhost:3001/api/v1/kelolauser/3`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DATA_USERS_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}
function* getDataUsersSupplier(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`http://localhost:3001/api/v1/kelolauser/2`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DATA_USERS_SUPPLIER_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}

function* getDetailSupplier(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.getSupplierDetail(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DETAIL_SUPPLIER', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}

function* delUser(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.delete(
			`${api.delUser(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'DELETE_USER_SUCCESS', payload: res.data });
		yield* getDataUsers();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

// function* addProducts(action) {
// // 	const token = getLoggedInUser().token;
// // 	let param = JSON.stringify(action.payload);
// // 	try {
// // 		const res = yield axios.post(
// // 			`${api.addProducts(getLoggedInUser().marketId)}`,
// // 			param,

// // 			{
// // 				headers: {
// // 					'Content-Type': 'application/json',
// // 					Authorization: 'Bearer ' + token,
// // 				},
// // 			}
// // 		);
// // 		yield put({ type: 'ADD_PRODUCTS_SUCCESS', payload: res.data });
// // 		yield* getDataProducts();
// // 		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
// // 	} catch (e) {
// // 		console.log(e);
// // 	}
// // }

// function* updateProducts(action) {
// 	const token = getLoggedInUser().token;
// 	let param = JSON.stringify(action.payload);
// 	try {
// 		const res = yield axios.put(
// 			`${api.updateProducts(action.id)}`,
// 			param,

// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: 'Bearer ' + token,
// 				},
// 			}
// 		);
// 		yield put({ type: 'UPDATE_PRODUCTS_SUCCESS', payload: res.data });
// 		yield* getDataProducts();
// 		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
// 	} catch (e) {
// 		console.log(e);
// 	}
// }

//

function* watchGetDataUsers() {
	yield takeEvery('REQUEST_DATA_USERS', getDataUsers);
}
function* watchGetDelUser() {
	yield takeEvery('DELETE_USER_REQUEST', delUser);
}

//Watch Supplier
function* watchGetDataUsersSupplier() {
	yield takeEvery('REQUEST_DATA_USERS_SUPPLIER', getDataUsersSupplier);
}
function* watchGetDetailSupplier() {
	yield takeEvery('REQUEST_DETAIL_SUPPLIER', getDetailSupplier);
}

function* adminSaga() {
	yield all([
		fork(watchGetDataUsers),
		fork(watchGetDelUser),
		fork(watchGetDataUsersSupplier),
		fork(watchGetDetailSupplier),
	]);
}
export default adminSaga;

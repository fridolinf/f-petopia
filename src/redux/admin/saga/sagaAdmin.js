import { put, takeEvery, fork, all, select } from 'redux-saga/effects';
import axios from 'axios';
import { getLoggedInUser } from '../../../utils/session';
import { api } from '../../../service/api';

let adminState = (state) => state.reducerAdmin;

// USER
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

// SUPPLIER
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
		console.log(res.data);
	} catch (e) {
		console.log(e);
	}
}

// ORDERS
// function* getOrderList(action) {
// 	const token = getLoggedInUser().token;
// 	let supplier = yield select(supplierState);
// 	try {
// 		const res = yield axios.get(
// 			`${api.getOrderList(getLoggedInUser().marketId, supplier.location)}`,

// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: 'Bearer ' + token,
// 				},
// 			}
// 		);
// 		yield put({ type: 'GET_ORDER_LIST_SUCCESS', payload: res.data });
// 	} catch (e) {
// 		console.log(e);
// 	}
// }

// Verifikasi
function* getDataVerifikasi(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`http://localhost:3001/api/v1/kelolauser/verifikasi/false`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DATA_VERIFIKASI_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}

function* tolakDataVerifikasi(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.delete(
			`${api.tolakVerifikasi(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'DELETE_FAQ_SUCCESS', payload: res.data });
		yield* getDataVerifikasi();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

function* accDataVerifikasi(action) {
	const token = getLoggedInUser().token;
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.put(
			`${api.accVerifikasi(action.id)}`,
			param,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'ACC_VERIFIKASI_SUCCESS', payload: res.data });
		yield* getDataVerifikasi();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

// FAQ
function* getDataFaq(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(`${api.getFaq}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		yield put({ type: 'GET_DATA_FAQ_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}

function* addFaq(action) {
	const token = getLoggedInUser().token;
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.post(`${api.addFaq}`, param, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		yield put({ type: 'ADD_FAQ_SUCCESS', payload: res.data });
		yield* getDataFaq();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

function* delFaq(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.delete(
			`${api.delFaq(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'DELETE_FAQ_SUCCESS', payload: res.data });
		yield* getDataFaq();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

function* getDetailFaq(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.detailFaq(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DETAIL_FAQ_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}

function* updateFaq(action) {
	const token = getLoggedInUser().token;
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.put(
			`${api.updateFaq(action.id)}`,
			param,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'UPDATE_FAQ_SUCCESS', payload: res.data });
		yield* getDataFaq();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

// ARTIKEL
function* getDataArtikel(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(`${api.getArtikel}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		yield put({ type: 'GET_DATA_ARTIKEL_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}

function* addArtikel(action) {
	const token = getLoggedInUser().token;
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.post(`${api.addArtikel}`, param, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		yield put({ type: 'ADD_ARTIKEL_SUCCESS', payload: res.data });
		yield* getDataArtikel();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

function* delArtikel(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.delete(
			`${api.delArtikel(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'DELETE_ARTIKEL_SUCCESS', payload: res.data });
		yield* getDataArtikel();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

function* getDetailArtikel(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.delArtikel(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DETAIL_ARTIKEL_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}

function* updateArtikel(action) {
	const token = getLoggedInUser().token;
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.put(
			`${api.updateArtikel(action.id)}`,
			param,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'UPDATE_ARTIKEL_SUCCESS', payload: res.data });
		yield* getDataArtikel();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {
		console.log(e);
	}
}

// Watch User
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

// Watch Verifikasi
function* watchGetDataVerifikasi() {
	yield takeEvery('REQUEST_DATA_VERIFIKASI', getDataVerifikasi);
}
function* watchAccDataVerifikasi() {
	yield takeEvery('REQUEST_ACC_DATA_VERIFIKASI', accDataVerifikasi);
}
function* watchTolakDataVerifikasi() {
	yield takeEvery('REQUEST_TOLAK_DATA_VERIFIKASI', tolakDataVerifikasi);
}

// Watch Faq
function* watchGetFaq() {
	yield takeEvery('REQUEST_DATA_FAQ', getDataFaq);
}
function* watchAddFaq() {
	yield takeEvery('REQUEST_ADD_FAQ', addFaq);
}
function* watchDelFaq() {
	yield takeEvery('REQUEST_DELETE_FAQ', delFaq);
}
function* watchDetailFaq() {
	yield takeEvery('REQUEST_DETAIL_FAQ', getDetailFaq);
}
function* watchUpdateFaq() {
	yield takeEvery('REQUEST_UPDATE_FAQ', updateFaq);
}

// Watch Artikel
function* watchGetArtikel() {
	yield takeEvery('REQUEST_DATA_ARTIKEL', getDataArtikel);
}
function* watchAddArtikel() {
	yield takeEvery('REQUEST_ADD_ARTIKEL', addArtikel);
}
function* watchDelArtikel() {
	yield takeEvery('REQUEST_DELETE_ARTIKEL', delArtikel);
}
function* watchDetailArtikel() {
	yield takeEvery('REQUEST_DETAIL_ARTIKEL', getDetailArtikel);
}
function* watchUpdateArtikel() {
	yield takeEvery('REQUEST_UPDATE_ARTIKEL', updateArtikel);
}

// YIELD
function* adminSaga() {
	yield all([
		fork(watchGetDataUsers),
		fork(watchGetDelUser),
		fork(watchGetDataUsersSupplier),
		fork(watchGetDetailSupplier),
		fork(watchGetDataVerifikasi),
		fork(watchAccDataVerifikasi),
		fork(watchTolakDataVerifikasi),
		fork(watchGetFaq),
		fork(watchAddFaq),
		fork(watchDelFaq),
		fork(watchDetailFaq),
		fork(watchUpdateFaq),
		fork(watchGetArtikel),
		fork(watchAddArtikel),
		fork(watchDelArtikel),
		fork(watchDetailArtikel),
		fork(watchUpdateArtikel),
	]);
}
export default adminSaga;

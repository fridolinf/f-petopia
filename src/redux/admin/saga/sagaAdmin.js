import { put, takeEvery, fork, all, select } from 'redux-saga/effects';
import axios from 'axios';
import { getLoggedInUser } from '../../../utils/session';
import { api } from '../../../service/api';

let adminState = (state) => state.reducerAdmin;

// Dashboard

function* getSuccessTransaction(action) {
	try {
		const token = getLoggedInUser().token;
		const res = yield axios.get(`${api.getSuccessTransaction}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		const _data = res.data.successTransaction;

		let totalT = 0;

		_data.map((row) => {
			totalT += row.totalPrice;
		});

		yield put({
			type: 'GET_TOTAL_T',
			payload: { totalT: totalT },
		});
		yield put({ type: 'GET_SUCCESS_TRANSACTION', payload: _data });
		// });

		if (_data === undefined || _data.length === 0) {
		} else {
		}
	} catch (e) {}
}

function* getAllTransactions(action) {
	try {
		const token = getLoggedInUser().token;
		const res = yield axios.get(`${api.getAllTransactions}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		yield put({ type: 'GET_ALL_TRANSACTIONS_SUCCESS', payload: res.data });
	} catch (e) {}
}

// Dashboard

// ORDER

// Detail Order
function* detailOrder(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.detailOrder(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DETAIL_ORDER_SUCCESS', payload: res.data });
	} catch (e) {}
}

// OrderPending
function* getOrderNewList(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.getOrderNewList(getLoggedInUser().marketId)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_ORDER_NEW_LIST_SUCCESS', payload: res.data });
	} catch (e) {}
}

// Order Terkirim
function* getOrderSentList(status) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.getOrderSentList(getLoggedInUser().marketId)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_ORDER_SENT_LIST_SUCCESS', payload: res.data });
	} catch (e) {}
}

// Order Selesai
function* getOrderDoneList(status) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.getOrderDoneList(getLoggedInUser().marketId)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_ORDER_DONE_LIST_SUCCESS', payload: res.data });
	} catch (e) {}
}

// Button Konfirmasi
function* confirmOrder(action) {
	const token = getLoggedInUser().token;
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.put(
			`${api.confirmOrder(action.id)}`,
			param,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_CONFIRM_ORDER_SUCCESS', payload: res.data });
	} catch (e) {}
}

// Button Kirim
function* sentOrder(action) {
	const token = getLoggedInUser().token;
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.put(
			`${api.sentOrder(action.id)}`,
			param,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_SENT_ORDER_SUCCESS', payload: res.data });
	} catch (e) {}
}

function* deleteOrder(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.delete(
			`${api.deleteOrder(action.id)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'DELETE_ORDERS_SUCCESS', payload: res.data });
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {}
}

// BATAS BAWAH ORDER

// USER
function* getDataUsers(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`https://petopia-b.herokuapp.com/api/v1/kelolauser/false`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DATA_USERS_SUCCESS', payload: res.data.data });
	} catch (e) {}
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
	} catch (e) {}
}

// SUPPLIER
function* getDataUsersSupplier(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`https://petopia-b.herokuapp.com/api/v1/kelolauser/true`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({
			type: 'GET_DATA_USERS_SUPPLIER_SUCCESS',
			payload: res.data.data,
		});
	} catch (e) {}
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
	} catch (e) {}
}

// Verifikasi
function* getDataVerifikasi(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`https://petopia-b.herokuapp.com/api/v1/kelolauser/verifikasi/false`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_DATA_VERIFIKASI_SUCCESS', payload: res.data });
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
}

function* getCountUser(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(`${api.countUser}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		// const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
		// yield call(delay, 1000);
		yield put({ type: 'GET_COUNT_USER_SUCCESS', payload: res.data });
	} catch (e) {}
}

// Watch Order
function* watchOrderNewList() {
	yield takeEvery('REQUEST_ORDER_NEW_LIST', getOrderNewList);
}
function* watchOrderSentList() {
	yield takeEvery('REQUEST_ORDER_SENT_LIST', getOrderSentList);
}
function* watchOrderDoneList() {
	yield takeEvery('REQUEST_ORDER_DONE_LIST', getOrderDoneList);
}
function* watchConfirmOrder() {
	yield takeEvery('REQUEST_CONFIRM_ORDER', confirmOrder);
}
function* watchSentOrder() {
	yield takeEvery('REQUEST_SENT_ORDER', sentOrder);
}
function* watchDeleteOrder() {
	yield takeEvery('REQUEST_DELETE_ORDERS', deleteOrder);
}
function* watchDetailOrder() {
	yield takeEvery('REQUEST_DETAIL_ORDER', detailOrder);
}

// Dasbboard Admin
function* watchSuccessTransaction() {
	yield takeEvery('REQUEST_SUCCESS_TRANSACTION', getSuccessTransaction);
}
function* watchAllTransactions() {
	yield takeEvery('REQUEST_ALL_TRANSACTIONS', getAllTransactions);
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

// COUNT
function* watchgetCountUser() {
	yield takeEvery('REQUEST_COUNT_USER', getCountUser);
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
		fork(watchOrderNewList),
		fork(watchOrderSentList),
		fork(watchOrderDoneList),
		fork(watchConfirmOrder),
		fork(watchSentOrder),
		fork(watchDeleteOrder),
		fork(watchSuccessTransaction),
		fork(watchAllTransactions),
		fork(watchDetailOrder),
		fork(watchgetCountUser),
	]);
}
export default adminSaga;

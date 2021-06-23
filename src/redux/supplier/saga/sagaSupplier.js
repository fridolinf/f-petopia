import { put, takeEvery, fork, all, select } from 'redux-saga/effects';
import axios from 'axios';
import { getLoggedInUser } from '../../../utils/session';
import { api } from '../../../service/api';

let supplierState = (state) => state.reducerSupplier;

function* updateSupplier(action) {
	try {
		const token = getLoggedInUser().token;
		let param = JSON.stringify(action.payload);
		const res = yield axios.put(
			`${api.updateSupplier(action.id)}`,
			param,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'UPDATE_SUPPLIER_SUCCESS', payload: res.data });
		yield* getData();
		// window.location.href = process.env.PUBLIC_URL + '/supplier/kelolaproduk';
	} catch (e) {}
}

function* getIncome(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.getIncome(getLoggedInUser().marketId)}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		// const arr = [];
		const _data = res.data.allIncome;

		let totalP = 0;

		_data.map((row) => {
			totalP += row.totalPrice;
		});
		yield put({
			type: 'GET_TOTAL_PRICE',
			payload: { totalP: totalP },
		});
		yield put({ type: 'GET_INCOME_SUCCESS', payload: _data });
		if (_data === undefined || _data.length === 0) {
		} else {
		}
	} catch (e) {}
}

// function* getTransactions(action) {
// 	const token = getLoggedInUser().token;
// 	try {
// 		const res = yield axios.get(
// 			`${api.getTransactions(getLoggedInUser().marketId)}`,

// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: 'Bearer ' + token,
// 				},
// 			}
// 		);
// 		const arr1 = [];
// 		const _data1 = res.data.allTransactions;
// 		if (_data1) {
// 			for (let i = 0; i < _data1.length; i++) {
// 				const date1 = _data1[i].dateOrdered.substring(3, 8);

// 				arr1.push({
// 					dateOrdered2: date1,
// 					// category: _data1[i].orderItems[0].product.category.name,
// 					quantity:
// 						_data1[i].orderItems[0].quantity + _data1[i].orderItems[0].quantity,
// 					// totalPrice2: _data1[i].totalPrice,
// 				});
// 			}

// 			const filtered1 = arr1.filter((v, i, a) => {
// 				return i === a.findIndex((t) => t.dateOrdered2 === v.dateOrdered2);
// 			});

// 			for (let i in filtered1) {
// 				yield put({ type: 'GET_TRANSACTIONS_SUCCESS', payload: filtered1[i] });
// 			}
// 			// for (let i in filtered2) {
// 			// 	yield put({ type: 'GET_TRANSACTIONS_SUCCESS', payload: filtered2[i] });
// 			// }
// 			// console.log(filtered2, 'filtered 2');
// 		}
// 	} catch (e) {
//
// 	}
// }

function* getFaqs(action) {
	const token = getLoggedInUser().token;
	try {
		const res = yield axios.get(
			`${api.getFaqs}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);
		yield put({ type: 'GET_FAQS_SUCCESS', payload: res.data });
	} catch (e) {}
}

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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
	} catch (e) {}
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
function* watchIncome() {
	yield takeEvery('REQUEST_DATA_INCOME', getIncome);
}
// function* watchTransaction() {
// 	yield takeEvery('REQUEST_DATA_TRANSACTIONS', getTransactions);
// }
function* watchFaqs() {
	yield takeEvery('REQUEST_DATA_FAQS', getFaqs);
}
function* watchUpdateSupplier() {
	yield takeEvery('REQUEST_UPDATE_SUPPLIER', updateSupplier);
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
		fork(watchIncome),
		// fork(watchTransaction),
		fork(watchFaqs),
		fork(watchUpdateSupplier),
	]);
}
export default supplierSaga;

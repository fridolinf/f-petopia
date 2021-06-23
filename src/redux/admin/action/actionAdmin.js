export const getDataUsers = () => {
	return { type: 'REQUEST_DATA_USERS' };
};
export const delUser = (id) => {
	return { type: 'DELETE_USER_REQUEST', id };
};
export const getDataUsersSupplier = () => {
	return { type: 'REQUEST_DATA_USERS_SUPPLIER' };
};
export const getDetailSupplier = (id) => {
	return { type: 'REQUEST_DETAIL_SUPPLIER', id };
};

// Verifikasi Supplier
export const getDataVerifikasi = () => {
	return { type: 'REQUEST_DATA_VERIFIKASI' };
};
export const accDataVerifikasi = (id) => {
	return { type: 'REQUEST_ACC_DATA_VERIFIKASI', id };
};
export const tolakDataVerifikasi = (id) => {
	return { type: 'REQUEST_TOLAK_DATA_VERIFIKASI', id };
};

// FAQ
export const getDataFaq = () => {
	return { type: 'REQUEST_DATA_FAQ' };
};
export const addFaq = (data) => {
	return { type: 'REQUEST_ADD_FAQ', payload: data };
};
export const delFaq = (id) => {
	return { type: 'REQUEST_DELETE_FAQ', id };
};
export const getDetailFaq = (id) => {
	return { type: 'REQUEST_DETAIL_FAQ', id };
};
export const updateFaq = (data, id) => {
	return { type: 'REQUEST_UPDATE_FAQ', payload: data, id };
};

// Artikel
export const getDataArtikel = () => {
	return { type: 'REQUEST_DATA_ARTIKEL' };
};
export const addArtikel = (data) => {
	return { type: 'REQUEST_ADD_ARTIKEL', payload: data };
};
export const delArtikel = (id) => {
	return { type: 'REQUEST_DELETE_ARTIKEL', id };
};
export const getDetailArtikel = (id) => {
	return { type: 'REQUEST_DETAIL_ARTIKEL', id };
};
export const updateArtikel = (data, id) => {
	return { type: 'REQUEST_UPDATE_ARTIKEL', payload: data, id };
};

// ORDERS
export const getOrderNewList = (id) => {
	return { type: 'REQUEST_ORDER_NEW_LIST', id };
};
export const getOrderSentList = (id) => {
	return { type: 'REQUEST_ORDER_SENT_LIST', id };
};
export const getOrderDoneList = (id) => {
	return { type: 'REQUEST_ORDER_DONE_LIST', id };
};
export const confirmOrder = (id) => {
	return { type: 'REQUEST_CONFIRM_ORDER', id };
};
export const sentOrder = (id) => {
	return { type: 'REQUEST_SENT_ORDER', id };
};
export const deleteOrder = (id) => {
	return { type: 'REQUEST_DELETE_ORDERS', id };
};
export const getDetailOrder = (id) => {
	return { type: 'REQUEST_DETAIL_ORDER', id };
};

// DASHBOARD

export const getSuccessTransaction = () => {
	return { type: 'REQUEST_SUCCESS_TRANSACTION' };
};

export const getAllTransactions = () => {
	return { type: 'REQUEST_ALL_TRANSACTIONS' };
};

// COUNT
export const getCountUser = () => {
	return { type: 'REQUEST_COUNT_USER' };
};

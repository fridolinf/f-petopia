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
// export const addProducts = (data) => {
// 	return { type: 'REQUEST_ADD_PRODUCTS', payload: data };
// };
// export const updateProducts = (data, id) => {
// 	return { type: 'REQUEST_UPDATE_PRODUCTS', payload: data, id };
// };

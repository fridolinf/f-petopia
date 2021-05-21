export const getDataSupplier = () => {
	return { type: 'REQUEST_DATA_SUPPLIER' };
};
export const getDataCategories = () => {
	return { type: 'REQUEST_DATA_CATEGORIES' };
};
export const getDataProducts = (id) => {
	return { type: 'REQUEST_DATA_PRODUCTS', id };
};
export const onLocationChange = (field, value) => {
	return { type: 'ON_LOCATION_CHANGE', field, value };
};
export const getDetailProducts = (id) => {
	return { type: 'REQUEST_DETAIL_P', id };
};
export const delProducts = (id) => {
	return { type: 'DELETE_PRODUCTS_REQUEST', id };
};
export const addProducts = (data) => {
	return { type: 'REQUEST_ADD_PRODUCTS', payload: data };
};
export const updateProducts = (data, id) => {
	return { type: 'REQUEST_UPDATE_PRODUCTS', payload: data, id };
};
export const addKategori = (data) => {
	return { type: 'REQUEST_ADD_PRODUCTS', payload: data };
};

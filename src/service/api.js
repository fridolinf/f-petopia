const baseUrl = 'http://localhost:3001/api/v1';
export const api = {
	getUser: (id) => `${baseUrl}/users/${id}`,
	getProducts: (id, location) => `${baseUrl}/products/${id}/${location}`,
	getDetailProducts: (id) => `${baseUrl}/products/${id}`,
	delProducts: (id) => `${baseUrl}/products/${id}`,
	addProducts: (id) => `${baseUrl}/products/supplier/tambahproduk/${id}`,
	updateProducts: (id) => `${baseUrl}/products/supplier/updateproduk/${id}`,
	getCategories: `${baseUrl}/categories`,
	getSupplierDetail: (id) => `${baseUrl}/kelolauser/detail/${id}`,
	delUser: (id) => `${baseUrl}/kelolauser/${id}`,
};

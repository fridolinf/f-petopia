const baseUrl = 'http://localhost:3001/api/v1';
export const api = {
	// USER
	getUser: (id) => `${baseUrl}/users/${id}`,
	delUser: (id) => `${baseUrl}/kelolauser/${id}`,

	// SUPPLIER
	getSupplierDetail: (id) => `${baseUrl}/kelolauser/${id}`,

	// ORDER
	getOrderList: (status) => `${baseUrl}/orders/pesanan/${status}`,

	// PRODUK
	getProducts: (id, location) => `${baseUrl}/products/${id}/${location}`,
	getDetailProducts: (id) => `${baseUrl}/products/${id}`,
	delProducts: (id) => `${baseUrl}/products/${id}`,
	addProducts: (id) => `${baseUrl}/products/supplier/tambahproduk/${id}`,
	updateProducts: (id) => `${baseUrl}/products/supplier/updateproduk/${id}`,

	// KATEGORI
	getCategories: `${baseUrl}/categories`,

	// FAQ
	getFaq: `${baseUrl}/kelolafaq`,
	addFaq: `${baseUrl}/kelolafaq/tambahFAQ`,
	delFaq: (id) => `${baseUrl}/kelolafaq/${id}`,
	detailFaq: (id) => `${baseUrl}/kelolafaq/detail/${id}`,
	updateFaq: (id) => `${baseUrl}/kelolafaq/updateFaq/${id}`,

	// VERIFIKASI
	accVerifikasi: (id) => `${baseUrl}/kelolauser/accseller/${id}`,
	tolakVerifikasi: (id) => `${baseUrl}/kelolauser/refuseseller/${id}`,

	// ARTIKEL
	getArtikel: `${baseUrl}/artikels/`,
	addArtikel: `${baseUrl}/artikels/tambahartikel`,
	delArtikel: (id) => `${baseUrl}/artikels/${id}`,
	detailArtikel: (id) => `${baseUrl}/artikels/detail/${id}`,
	updateArtikel: (id) => `${baseUrl}/artikels/updateartikel/${id}`,
};

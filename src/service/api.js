// const baseUrl = 'http://localhost:3001/api/v1';
const baseUrl = 'https://petopia-b.herokuapp.com/api/v1';
export const api = {
	// USER
	getUser: (id) => `${baseUrl}/users/${id}`,
	delUser: (id) => `${baseUrl}/kelolauser/${id}`,
	countUser: `${baseUrl}/users/get/count`,

	// SUPPLIER
	getSupplierDetail: (id) => `${baseUrl}/kelolauser/detail/${id}`,
	getIncome: (id) => `${baseUrl}/users/${id}/semuaPemasukkan`,
	getTransactions: (id) => `${baseUrl}/users/${id}/datatransaksi`,
	updateSupplier: (id) => `${baseUrl}/users/updateProfile/${id}`,

	// ORDER
	getOrderNewList: (id) => `${baseUrl}/orders/${id}/listpending`,
	getOrderSentList: (id) => `${baseUrl}/orders/${id}/listsent`,
	getOrderDoneList: (id) => `${baseUrl}/orders/${id}/listdone`,
	confirmOrder: (id) => `${baseUrl}/orders/konfirmasi/${id}`,
	sentOrder: (id) => `${baseUrl}/orders/kirim/${id}`,
	deleteOrder: (id) => `${baseUrl}/orders/deleteorder/${id}`,
	detailOrder: (id) => `${baseUrl}/orders/detailOrder/${id}`,

	// Admin Dashboard
	getSuccessTransaction: `${baseUrl}/orders/successTransaction`,
	getAllTransactions: `${baseUrl}/orders/allTransactions`,

	// PRODUK
	getProducts: (id, location) => `${baseUrl}/products/${id}/${location}`,
	getDetailProducts: (id) => `${baseUrl}/products/${id}`,
	delProducts: (id) => `${baseUrl}/products/${id}`,
	addProducts: (id) => `${baseUrl}/products/supplier/tambahproduk/${id}`,
	updateProducts: (id) => `${baseUrl}/products/supplier/updateproduk/${id}`,

	// KATEGORI
	getCategories: `${baseUrl}/categories`,

	// FAQ
	getFaq: `${baseUrl}/kelolafaq/datafaqs`,
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

	// FAQ
	getFaqs: `${baseUrl}/kelolafaq/datafaqs`,
};

const initialState = {
	users: [],
	newOrders: [],
	sentOrders: [],
	doneOrders: [],
	detailOrder: {},
	successTransaction: [],
	allUser: 0,
	totalT: 0,
	allTransactions: [],
	completeOrders: [],
	faq: {
		pertanyaan: '',
		jawaban: '',
	},
	faqs: [],
	artikel: {
		title: '',
		description: '',
		isi: '',
		image1: '',
	},
	artikels: [],
	supplierDetail: {},
	usersSupplier: [],
	userVerifikasi: [],
	categories: [],
	location: 'habispakai',
	loading: false,
	error: null,
};
const reducerAdmin = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;

		// Order
		case 'REQUEST_ORDER_NEW_LIST':
			return {
				...state,
				loading: true,
				newOrders: [],
				error: null,
			};
		case 'GET_ORDER_NEW_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				newOrders: action.payload,
				error: null,
			};
		case 'REQUEST_ORDER_SENT_LIST':
			return {
				...state,
				loading: true,
				sentOrders: [],
				error: null,
			};
		case 'GET_ORDER_SENT_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				sentOrders: action.payload,
				error: null,
			};
		case 'REQUEST_ORDER_DONE_LIST':
			return {
				...state,
				loading: true,
				doneOrders: [],
				error: null,
			};
		case 'GET_ORDER_DONE_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				doneOrders: action.payload,
				error: null,
			};
		case 'REQUEST_CONFIRM_ORDER':
			return {
				...state,
				loading: true,
				error: null,
			};
		case 'GET_CONFIRM_ORDER_SUCCESS':
			return {
				...state,
				loading: false,
				error: null,
			};
		case 'REQUEST_SENT_ORDER':
			return {
				...state,
				loading: true,
				error: null,
			};
		case 'GET_SENT_ORDER_SUCCESS':
			return {
				...state,
				loading: false,
				error: null,
			};
		case 'REQUEST_DELETE_ORDERS':
			return {
				...state,
				loading: true,
			};
		case 'DELETE_ORDERS_SUCCESS':
			return {
				...state,
				loading: false,
				doneOrders: state.doneOrders.filter((item) => item._id !== action.id),
			};

		// User
		case 'REQUEST_DATA_USERS':
			return {
				...state,
				loading: true,
				users: [],
				error: null,
			};
		case 'GET_DATA_USERS_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload,
				error: null,
			};
		case 'DELETE_USER_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'DELETE_USER_SUCCESS':
			return {
				...state,
				loading: false,
				users: state.users.filter((item) => item._id !== action.id),
			};

		// Supplier
		case 'REQUEST_DATA_USERS_SUPPLIER':
			return {
				...state,
				loading: true,
				usersSupplier: [],
				error: null,
			};
		case 'GET_DATA_USERS_SUPPLIER_SUCCESS':
			return {
				...state,
				loading: false,
				usersSupplier: action.payload,
				error: null,
			};
		case 'REQUEST_DETAIL_SUPPLIER':
			return {
				...state,
				loading: true,
				supplierDetail: {},
				error: null,
			};
		case 'GET_DETAIL_SUPPLIER':
			return {
				...state,
				loading: false,
				supplierDetail: {
					...state.supplierDetail,
					name: action.payload.name,
					address: action.payload.address,
					email: action.payload.email,
					phone: action.payload.phone,
					marketName: action.payload.marketName,
				},
				error: null,
			};

		// Verifikasi
		case 'REQUEST_DATA_VERIFIKASI':
			return {
				...state,
				loading: true,
				userVerifikasi: [],
				error: null,
			};
		case 'GET_DATA_VERIFIKASI_SUCCESS':
			return {
				...state,
				loading: false,
				userVerifikasi: action.payload,
				error: null,
			};
		case 'REQUEST_ACC_DATA_VERIFIKASI':
			return {
				...state,
				loading: true,
				error: null,
			};
		case 'ACC_VERIFIKASI_SUCCESS':
			return {
				...state,
				loading: false,
				error: null,
			};
		case 'REQUEST_TOLAK_DATA_VERIFIKASI':
			return {
				...state,
				loading: true,
				error: null,
			};
		case 'TOLAK_DATA_VERIFIKASI':
			return {
				...state,
				loading: false,
				error: null,
			};

		// FAQ
		case 'REQUEST_DATA_FAQ':
			return {
				...state,
				loading: true,
				faqs: [],
				error: null,
			};
		case 'GET_DATA_FAQ_SUCCESS':
			return {
				...state,
				loading: false,
				faqs: action.payload,
				error: null,
			};
		case 'REQUEST_ADD_FAQ':
			return {
				...state,
				loading: true,
			};
		case 'ADD_FAQ_SUCCESS':
			return {
				...state,
				loading: false,
				faq: action.payload,
				error: null,
			};
		case 'REQUEST_DELETE_FAQ':
			return {
				...state,
				loading: true,
			};
		case 'DELETE_FAQ_SUCCESS':
			return {
				...state,
				loading: false,
				faqs: state.faqs.filter((item) => item._id !== action.id),
			};
		case 'REQUEST_DETAIL_FAQ':
			return {
				...state,
				loading: true,
				faq: {},
				error: null,
			};
		case 'GET_DETAIL_FAQ_SUCCESS':
			return {
				...state,
				loading: false,
				faq: {
					...state.faq,
					pertanyaan: action.payload.pertanyaan,
					jawaban: action.payload.jawaban,
				},
				error: null,
			};
		case 'REQUEST_UPDATE_FAQ':
			return {
				...state,
				loading: true,
			};
		case 'UPDATE_FAQ_SUCCESS':
			return {
				...state,
				loading: false,
				faq: {},
				error: null,
			};

		// ARTIKEL
		case 'REQUEST_DATA_ARTIKEL':
			return {
				...state,
				loading: true,
				artikels: [],
				error: null,
			};
		case 'GET_DATA_ARTIKEL_SUCCESS':
			return {
				...state,
				loading: false,
				artikels: action.payload,
				error: null,
			};
		case 'REQUEST_ADD_ARTIKEL':
			return {
				...state,
				loading: true,
			};
		case 'ADD_ARTIKEL_SUCCESS':
			return {
				...state,
				loading: false,
				artikel: action.payload,
				error: null,
			};
		case 'REQUEST_DELETE_ARTIKEL':
			return {
				...state,
				loading: true,
			};
		case 'DELETE_ARTIKEL_SUCCESS':
			return {
				...state,
				loading: false,
				artikels: state.artikels.filter((item) => item._id !== action.id),
			};
		case 'REQUEST_DETAIL_ARTIKEL':
			return {
				...state,
				loading: true,
				artikel: {},
				error: null,
			};
		case 'GET_DETAIL_ARTIKEL_SUCCESS':
			return {
				...state,
				loading: false,
				artikel: {
					...state.artikel,
					image1: action.payload.image1,
					title: action.payload.title,
					description: action.payload.description,
					isi: action.payload.isi,
				},
				error: null,
			};
		case 'REQUEST_UPDATE_ARTIKEL':
			return {
				...state,
				loading: true,
			};
		case 'UPDATE_ARTIKEL_SUCCESS':
			return {
				...state,
				loading: false,
				artikel: {},
				error: null,
			};
		case 'REQUEST_SUCCESS_TRANSACTION':
			return {
				...state,
				loading: true,
				successTransaction: [],
				error: null,
			};
		case 'GET_SUCCESS_TRANSACTION':
			return {
				...state,
				loading: false,
				successTransaction: action.payload,
				error: null,
			};
		case 'GET_TOTAL_T':
			return {
				...state,
				loading: false,
				totalT: action.payload.totalT,
				error: null,
			};
		case 'REQUEST_ALL_TRANSACTIONS':
			return {
				...state,
				loading: true,
				allTransactions: [],
				error: null,
			};
		case 'GET_ALL_TRANSACTIONS_SUCCESS':
			return {
				...state,
				loading: false,
				allTransactions: action.payload.allTransactions,
				error: null,
			};
		case 'REQUEST_DETAIL_ORDER':
			return {
				...state,
				loading: true,
				detailOrder: {},
				error: null,
			};
		case 'GET_DETAIL_ORDER_SUCCESS':
			return {
				...state,
				loading: false,
				detailOrder: {
					...state.detailOrder,
					id: action.payload.id,
					payment: action.payload.payment,
					name: action.payload.user.name,
					quantity: action.payload.quantity,
					totalPrice: action.payload.totalPrice,
					address: action.payload.address,
					marketName: action.payload.orderItems[0].product.market.marketName,
					marketAddress: action.payload.orderItems[0].product.market.alamatToko,
					produk: action.payload.orderItems[0].product.name,
					gambar: action.payload.orderItems[0].product.image1,
					phone: action.payload.phone,
					dateOrdered: action.payload.dateOrdered,
				},
				error: null,
			};
		case 'GET_COUNT_USER_SUCCESS':
			return {
				...state,
				loading: false,
				allUser: action.payload,
				error: null,
			};
	}
};

export default reducerAdmin;

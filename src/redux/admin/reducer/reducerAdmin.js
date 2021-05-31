const initialState = {
	users: [],
	orders: [],
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

		// ORDERS
		case 'REQUEST_ORDER_LIST':
			return {
				...state,
				loading: true,
				orders: [],
				error: null,
			};
		case 'GET_ORDER_LIST_SUCCESS':
			return {
				...state,
				loading: true,
				orders: action.payload,
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
	}
};

export default reducerAdmin;

const initialState = {
	users: [],
	supplierDetail: {},
	usersSupplier: [],
	categories: [],
	location: 'habispakai',
	loading: false,
	error: null,
};
const reducerAdmin = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
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
		case 'REQUEST_ADD_PRODUCTS':
			return {
				...state,
				loading: true,
			};
		case 'ADD_PRODUCTS_SUCCESS':
			return {
				...state,
				loading: false,
				product: action.payload,
				error: null,
			};
		case 'REQUEST_UPDATE_PRODUCTS':
			return {
				...state,
				loading: true,
			};
		case 'UPDATE_PRODUCTS_SUCCESS':
	}
};

export default reducerAdmin;

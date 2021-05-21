const initialState = {
	user: {},
	products: [],
	product: {
		name: '',
		description: '',
		richDescription: '',
		image1: '',
		image2: '',
		image3: '',
		image4: '',
		tipe: '',
		brand: '',
		price: '',
		category: '',
		countInStock: '',
		dateCreated: '',
	},
	categories: [],
	location: 'habispakai',
	loading: false,
	error: null,
};

const reducerSupplier = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
		case 'REQUEST_DATA_SUPPLIER':
			return {
				...state,
				loading: true,
			};
		case 'GET_DATA_SUPPLIER_SUCCESS':
			return {
				...state,
				loading: false,
				user: action.payload,
				error: null,
			};
		case 'GET_DATA_CATEGORIES_SUCCESS':
			return {
				...state,
				loading: false,
				categories: action.value,
				error: null,
			};
		case 'REQUEST_DATA_PRODUCTS':
			return {
				...state,
				loading: true,
				products: [],
				error: null,
			};
		case 'GET_DATA_PRODUCTS_SUCCESS':
			return {
				...state,
				loading: false,
				products: action.payload,
				error: null,
			};
		case 'ON_LOCATION_CHANGE':
			return {
				...state,
				location: action.value,
			};
		case 'REQUEST_DETAIL_P':
			return {
				...state,
				loading: true,
				product: {},
				error: null,
			};
		case 'GET_DETAIL_P_SUCCESS':
			return {
				...state,
				loading: false,
				product: {
					...state.product,
					name: action.payload.name,
					description: action.payload.description,
					richDescription: action.payload.richDescription,
					image1: action.payload.image1,
					image2: action.payload.image2,
					image3: action.payload.image3,
					image4: action.payload.image4,
					tipe: action.payload.tipe,
					brand: action.payload.brand,
					price: action.payload.price,
					category: action.payload.category,
					countInStock: action.payload.countInStock,
					dateCreated: action.payload.dateCreated,
				},
				error: null,
			};
		case 'DELETE_PRODUCTS_REQUEST':
			return {
				...state,
				loading: true,
			};
		case 'DELETE_PRODUCTS_SUCCESS':
			return {
				...state,
				loading: false,
				products: state.products.filter((item) => item._id !== action.id),
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
			return {
				...state,
				loading: false,
				product: {},
				error: null,
			};
	}
};

export default reducerSupplier;

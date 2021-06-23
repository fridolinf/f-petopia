const initialState = {
	user: {},
	products: [],
	suppliers: {
		address: '',
		name: '',
		email: '',
		passwordHash: '',
		phone: '',
	},
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
	detailOrder: {},
	totalPrice: 0,
	totalQuantity: 0,
	faqs: [],
	income: [],
	transactions: [],
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
		case 'REQUEST_DATA_INCOME':
			return {
				...state,
				loading: true,
				income: [],
				error: null,
			};
		case 'GET_INCOME_SUCCESS':
			return {
				...state,
				loading: false,
				income: action.payload,
				error: null,
			};
		case 'GET_TOTAL_PRICE':
			return {
				...state,
				totalPrice: action.payload.totalP,
				totalQuantity: action.payload.totalQ,
				error: null,
			};
		// case 'REQUEST_DATA_TRANSACTIONS':
		// 	return {
		// 		...state,
		// 		loading: true,
		// 		transactions: [],
		// 		error: null,
		// 	};
		// case 'GET_TRANSACTIONS_SUCCESS':
		// 	return {
		// 		...state,
		// 		loading: false,
		// 		transactions: [...state.transactions, action.payload],
		// 		error: null,
		// 	};
		case 'REQUEST_DATA_FAQS':
			return {
				...state,
				loading: true,
				error: null,
			};
		case 'GET_FAQS_SUCCESS':
			return {
				...state,
				loading: false,
				faqs: action.payload,
				error: null,
			};
		case 'REQUEST_UPDATE_SUPPLIER':
			return {
				...state,
				loading: true,
			};
		case 'UPDATE_SUPPLIER_SUCCESS':
			return {
				...state,
				loading: false,
				suppliers: {},
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
	}
};

export default reducerSupplier;

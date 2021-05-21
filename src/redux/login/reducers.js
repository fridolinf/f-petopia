import {
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILED,
} from '../actiontypes';

const initialState = {
	user: {},
	loading: true,
	error: null,
	isAuthenticated: false,
};

const LoginReducers = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loading: true };
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				loading: false,
				error: null,
				isAuthenticated: true,
			};
		case LOGIN_USER_FAILED:
			return { ...state, error: action.payload, loading: false };

		default:
			return { ...state };
	}
};
export default LoginReducers;

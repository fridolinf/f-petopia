import {
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILED,
} from '../actiontypes';

export const loginUser = (email, password) => ({
	type: LOGIN_USER,
	payload: { email, password },
});

export const loginUserSuccess = (user) => ({
	type: LOGIN_USER_SUCCESS,
	payload: user,
});

export const loginUserFailed = (error) => ({
	type: LOGIN_USER_FAILED,
	payload: error,
});

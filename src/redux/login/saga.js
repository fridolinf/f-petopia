import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { LOGIN_USER, LOGOUT_USER } from '../actiontypes';
import { loginUserFailed, loginUserSuccess } from './actions';
import { getLoggedInUser, session } from '../../utils/session';

const fetchJSON = (url, options = {}) => {
	return fetch(url, options)
		.then((response) => {
			if (!response.status === 200) {
				throw response.json();
			}
			return response.json();
		})
		.then((json) => {
			return json;
		})
		.catch((error) => {
			throw error;
		});
};

function* login({ payload: { email, password } }) {
	const options = {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	};
	try {
		let response = yield call(
			fetchJSON,
			'https://petopia-b.herokuapp.com/api/v1/users/loginwebsite',
			options
		);
		if (response.error === 0) {
			yield put(loginUserSuccess(response));
			session(response);
			const loggedInUser = getLoggedInUser();
			switch (loggedInUser.isAdmin) {
				case '1':
					window.location.href = process.env.PUBLIC_URL + '/admin';
					break;
				case '2':
					window.location.href = process.env.PUBLIC_URL + '/supplier';
					break;
				default:
					break;
			}
		} else {
			yield put(loginUserFailed(response.message));
		}
	} catch (error) {}
}

function* logout() {
	try {
		session(null);
		window.location.href = process.env.PUBLIC_URL + '/login';
	} catch (error) {}
}

export function* watchLogoutUser() {
	yield takeEvery(LOGOUT_USER, logout);
}

export function* watchLoginUser() {
	yield takeEvery(LOGIN_USER, login);
}

function* loginSaga() {
	yield all([fork(watchLoginUser), fork(watchLogoutUser)]);
}

export default loginSaga;

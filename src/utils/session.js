import { Cookies } from 'react-cookie';

const session = (user) => {
	let cookies = new Cookies();
	if (user) cookies.set('user', JSON.stringify(user), { path: '/' });
	else cookies.remove('user');
};

const getLoggedInUser = () => {
	const cookies = new Cookies();
	const user = cookies.get('user');
	return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};
const isUserAuthenticated = () => {
	const user = getLoggedInUser();
	if (!user) {
		return false;
	}
	const token = user.token;

	// console.log(exp);
	if (token === null) {
		console.warn('access token expired');
		localStorage.clear();
		return false;
	} else {
		return true;
	}
	// if (exp) {
	//     return true;
	// }
};

export { session, getLoggedInUser, isUserAuthenticated };

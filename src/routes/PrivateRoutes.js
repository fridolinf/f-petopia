import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserAuthenticated, getLoggedInUser } from '../utils/session';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
	const isAuthenticated = isUserAuthenticated();
	const loggedInUser = getLoggedInUser();
	return (
		<Route
			{...rest}
			render={(props) => {
				isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />;
				if (isAuthenticated) {
					if (roles && roles.indexOf(loggedInUser.isAdmin) === -1) {
						switch (loggedInUser.isAdmin) {
							case '1':
								return <Redirect to={{ pathname: '/admin' }} />;
							case '2':
								return <Redirect to={{ pathname: '/supplier' }} />;
							default:
								break;
						}
					}
				} else {
					return <Redirect to={{ pathname: '/login' }} />;
				}
				return <Component {...props} />;
			}}
		/>
	);
};
export default PrivateRoute;

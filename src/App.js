import React from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Routers from './routes';
import { connect } from 'react-redux';

function App() {
	return (
		<div className='App'>
			<Routers />
		</div>
	);
}

export default connect()(App);

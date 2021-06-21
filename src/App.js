import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './index.css';
import 'react-quill/dist/quill.snow.css'; // ES6
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

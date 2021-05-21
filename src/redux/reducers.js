import { combineReducers } from 'redux';
import LoginReducers from './login/reducers';
import reducerSupplier from './supplier/reducer/reducerSupplier';

const rootReducer = combineReducers({
	LoginReducers,
	reducerSupplier,
});

export default rootReducer;

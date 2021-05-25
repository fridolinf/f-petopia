import { combineReducers } from 'redux';
import reducerAdmin from './admin/reducer/reducerAdmin';
import LoginReducers from './login/reducers';
import reducerSupplier from './supplier/reducer/reducerSupplier';
const rootReducer = combineReducers({
	LoginReducers,
	reducerSupplier,
	reducerAdmin,
});

export default rootReducer;

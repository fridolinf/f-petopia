import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import thunkMiddleware from 'redux-thunk';

function loadFromLocalStorage() {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		return undefined;
	}
}

const persistedState = loadFromLocalStorage();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunkMiddleware, sagaMiddleware];
const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const store = createStore(
	rootReducer,
	persistedState,
	composeEnhancers(applyMiddleware(...middlewares))
);
const saveState = (state) => {
	const serializedState = JSON.stringify(state);
	localStorage.setItem('state', serializedState);
};
store.subscribe(() => {
	saveState({
		reducerSupplier: store.getState().reducerSupplier,
	});
});
sagaMiddleware.run(rootSaga);

export default store;

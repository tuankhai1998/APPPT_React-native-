const { createStore, applyMiddleware } = require("redux");
import rootReducer from './reducers';
import thunk from 'redux-thunk';


const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;
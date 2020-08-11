import userReducer from "./userReducer";
import productReducer from "./productReducer";
import likeReducer from "./likeProductReducer";
import rentReducer from "./rentReducer";
import searchReducer from "./searchReducer";
import aroundReducer from "./aroundReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer,
    like: likeReducer,
    rent: rentReducer,
    search: searchReducer,
    around: aroundReducer
})

export default rootReducer;
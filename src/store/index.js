import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import adsReducer from "../reducers/adsReducer";
import userReducer from "../reducers/userReducer";
import contractsReducer from "../reducers/contractsReducer";
import realEstatesReducer from "../reducers/realEstatesReducer";
import paymentsReducer from "../reducers/paymentsReducer";
import failuresReducer from "../reducers/failuresReducer";

const loggerMiddleware = createLogger();

const store = createStore(combineReducers({
    adsReducer,
    userReducer,
    contractsReducer,
    realEstatesReducer,
    paymentsReducer,
    failuresReducer,
}), applyMiddleware(thunk, loggerMiddleware));

export default store;
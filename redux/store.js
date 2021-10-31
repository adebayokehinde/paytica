import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./root"

const middleware = [thunk]

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = () => createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

const makeStore = () => createStore(rootReducer, compose(applyMiddleware(...middleware)))
//const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))

export const wrapper = createWrapper(store)
//创建仓库
import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
//状态可视化
import {composeWithDevTools} from "redux-devtools-extension"
//在redux里处理异步操作
import thunk from "redux-thunk"


//参数：所有reducer,state,异步操作
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;
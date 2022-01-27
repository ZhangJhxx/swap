import "./app.less";
import React from "react";
import {  Route, NavLink ,Redirect} from "react-router-dom";

import Swap from "../componets/swap";
import Wallet from "../componets/wallet"; 
import News from "../componets/news"; 
function App() {
  return (
      <div className="App">
        <div className="wrapper">
          <div className="tab">
            <span><NavLink activeClassName='active'  to="/app/swap">Swap</NavLink></span>
            <span><NavLink activeClassName='active' to="/app/wallet">Wallet</NavLink></span>
            <span><NavLink activeClassName='active' to="/app/news">News</NavLink></span>
          </div>
          <div className="tabContent">
            <Route path="/app" exact render={()=><Redirect to="/app/swap"/>}></Route>
            <Route path="/app/swap" component={Swap}/>
            <Route path="/app/wallet" component={Wallet}/>
            <Route path="/app/news" component={News}/>
          </div>
        </div>
      </div>
  );
}

export default App;

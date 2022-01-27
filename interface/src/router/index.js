import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";

import App from "../pages/App"
import SignUp from "../pages/signup/SignUpPage"
import SignIn from "../pages/signin/SignInPage"
import HeaderNav from "../componets/headerNav"
import FlashMessageList from '../componets/flash/flashMessageList';

export default class index extends Component {
  render() {
      return (
          <Router>
              <HeaderNav />
              <FlashMessageList/>
              <Switch>
                  <Route path="/" exact render={()=><Redirect to="/app"/>}></Route>
                  <Route path="/app" component={ App }></Route>
                  <Route path="/signup" component={ SignUp }></Route>
                  <Route path="/signin" component={ SignIn }></Route>
              </Switch>
          </Router>
      )
  }
}
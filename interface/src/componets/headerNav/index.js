import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as authActions from "../../action/auth";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

class NavComponent extends Component {
  logoutHandle = () => {
    this.props.authActions.logOut();
    this.props.history.push("/signin");
  };
  render() {
    return (
      <ul class="nav nav-pills">
        <li class="nav-item">
          <Link className="nav-link" to="/">
              Home
          </Link>
        </li>
        {isEmpty(this.props.auth.user) ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    SignIn
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    {this.props.auth.user.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-light" onClick={this.logoutHandle}>Logot</button>
                </li>
              </>
            )}
      </ul>
      // <div className="nav-container">
      //   <div className="navbar-collapse">
      //     <ul className="navbar-nav mr-auto">
      //       <Link className="navbar-brand" to="/">
      //         首页
      //       </Link>
      //       {isEmpty(this.props.auth.user) ? (
      //         <>
      //           <li className="nav-item">
      //             <Link className="nav-link" to="/signup">
      //               注册
      //             </Link>
      //           </li>
      //           <li className="nav-item">
      //             <Link className="nav-link" to="/signin">
      //               登录
      //             </Link>
      //           </li>
      //         </>
      //       ) : (
      //         <>
      //           <li className="nav-item">
      //             <Link to="/" className="nav-link">
      //               {this.props.auth.user.username}
      //             </Link>
      //           </li>
      //           <li className="nav-item">
      //             <button onClick={this.logoutHandle}>退出登陆</button>
      //           </li>
      //         </>
      //       )}
      //     </ul>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavComponent)
);

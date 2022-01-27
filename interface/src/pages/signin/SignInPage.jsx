import React, { Component } from 'react'
import SignInForm from "./SignInForm"
import {connect} from "react-redux"
import * as flashActions from "../../action/flash"
import * as authActions from "../../action/auth"
import { bindActionCreators } from "redux"

class SignInPage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <SignInForm flashActions={ this.props.flashActions } authActions={ this.props.authActions }/>
                </div>
                <div className="col-md-3"></div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        flashActions:bindActionCreators(flashActions,dispatch),
        authActions:bindActionCreators(authActions,dispatch),
    }
}

export default connect(null,mapDispatchToProps)(SignInPage)
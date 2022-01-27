import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import classnames from "classnames"
import validator from "../../utils/validator"

class SignInForm extends Component {


    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const validatorLogin = validator({
            username: this.state.username,
            password: this.state.password
        })
        if (validatorLogin.isValid) {
            this.setState({
                errors: validatorLogin.errors
            })
        } else {
            // 还原errors的提示
            this.setState({
                errors:{}
            })
            this.props.authActions.asyncSetUserObj({
                username: this.state.username,
                password: this.state.password
            }).then(res => {
                if (res.status === 200) {
                    // 成功
                    this.props.flashActions.addFlashMessage({
                        id: Math.random().toString().slice(2),
                        msg: "登陆成功",
                        type: "success"
                    })
                    this.props.history.replace("/");//登录成功跳转到首页
                } else {
                    this.props.flashActions.addFlashMessage({
                        id: Math.random().toString().slice(2),
                        msg: "登陆失败",
                        type: "danger"
                    })
                }
            })
        }
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { username, password,errors } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1 style={{fontSize: '30px',padding:"30px 0"}}>欢迎回到CC</h1>
                    <div className="form-group">
                        <label style={{paddingBottom:"10px"}} className="control-label">Username</label>
                        <input
                            className={ classnames('form-control',{ 'is-invalid':errors.username }) }
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.changeHandle}
                        />
                        {errors.username ? <span style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span> : ''}
                    </div>
                    <div className="form-group">
                        <label style={{paddingBottom:"10px"}} className="control-label">PassWord</label>
                        <input
                            className={ classnames('form-control',{ 'is-invalid':errors.password }) }
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.changeHandle}
                        />
                        {errors.password ? <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span> : ''}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg">登录</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignInForm)
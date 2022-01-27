import React, { Component } from 'react'
import classnames from "classnames"
import api from "../../api";
import {withRouter} from "react-router-dom"

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email:"",
            password: "",
            password_confirm:"",
            errors: {}
        }
    }

    onSubmit = (e) => {
      e.preventDefault();
      api.register({
        username:this.state.username,
        password:this.state.password,
        email:this.state.email,
        password_confirm:this.state.password_confirm,
      }).then(res=>{
        if(res.data.status === 200){//成功
            this.props.flashActions.addFlashMessage({
                id:Math.random().toString().slice(2),
                msg:res.data.msg,
                type:"success"
            })
          this.setState({errors: {}});
          //注册成功，路由跳转至首页
          this.props.history.replace("/"); 
        }
        if(res.data.status === 400){
          this.setState({errors: res.data.errors})
        }
        if(res.data.status === 401){
            this.props.flashActions.addFlashMessage({
                id:Math.random().toString().slice(2),
                msg:res.data.msg,
                type:"danger"
            })
          this.setState({errors: {}})
        }
      }).catch(error=>{
        console.log(error);
      })
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onBlurCheckUserName = ()=>{
        api.ifRepeatUser({
            username:this.state.username
        }).then(res=>{
            if(res.data.flag === false){//重复
                this.setState({
                    errors:{username:res.data.msg}
                })
            }else{
                this.setState({
                    errors:{}
                })
            }
        }).catch(err=>{

        })
    }

    render() {
        const { username, password,email,password_confirm, errors } = this.state
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1 className="form-title" style={{fontSize: '30px',padding:"30px 0"}}>欢迎加入CC</h1>
                    <div className="form-group">
                        <label style={{paddingBottom:"10px"}} className="control-label">Username</label>
                        <input
                            className={ classnames('form-control',{ 'is-invalid':errors.username }) }
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.changeHandle}
                            onBlur={this.onBlurCheckUserName}
                        />
                        {errors.username ? <span style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span> : ''}
                    </div>
                    <div className="form-group">
                        <label style={{paddingBottom:"10px"}} className="control-label">Email</label>
                        <input
                            className={ classnames('form-control',{ 'is-invalid':errors.password }) }
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.changeHandle}
                        />
                        {errors.email ? <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span> : ''}
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
                        <label style={{paddingBottom:"10px"}} className="control-label">PassWord Confirm</label>
                        <input
                            className={ classnames('form-control',{ 'is-invalid':errors.password }) }
                            type="password"
                            name="password_confirm"
                            value={password_confirm}
                            onChange={this.changeHandle}
                        />
                        {errors.password_confirm ? <span style={{ color: 'red', fontSize: '12px' }}>{errors.password_confirm}</span> : ''}
                    </div>
                    <div className="form-group">
                        {
                            Object.keys(errors).length > 0  
                            ? <button disabled className="btn btn-primary btn-lg">注册</button>
                            : <button className="btn btn-primary btn-lg">注册</button>
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignUpForm)
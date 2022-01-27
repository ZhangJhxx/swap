import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import * as flashActions from "../../action/flash";
import {bindActionCreators} from "redux"


class flashMessage extends Component {
  removeFlash = ()=>{ //点击事件移除redux里flash的数据
    this.props.flashActions.delFlashMessage(this.props.item.id);
  }
  render() {
    return (
      <div
        className={classnames("alert", {
          "alert-success": this.props.item.type === "success",
          "alert-danger": this.props.item.type === "danger",
        })}
      >
        {this.props.item.msg}
        <button type="button" className="close" 
          data-dismiss="alert" aria-label="Close"
          onClick={this.removeFlash}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    flashActions:bindActionCreators(flashActions,dispatch)
  }
}

export default connect(null,mapDispatchToProps)(flashMessage)
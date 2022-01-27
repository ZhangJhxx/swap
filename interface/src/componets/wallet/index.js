import { useState} from "react";
import classnames from "classnames";
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom'
import isEmpty from "lodash/isEmpty"

import "./wallet.less";
import logo from "../../assects/logo.png";
import buy from "../../assects/buy.svg";
import send from "../../assects/send.svg";
import swap from "../../assects/swap.svg";

const Wallet=({auth,assect,transaction}) =>{
  const [assectActive, setAssectActive] = useState(true);
  const history = useHistory();
  const gotoLogin = (e)=>{
    e.preventDefault();
    history.push("/signin");
  }
  return (
    
    <div className="wallet">
      {
        isEmpty(auth.user) ? 
        <p className="login_remainer">please&nbsp;
          <a href="javascript:;" onClick={gotoLogin}>login</a>
        </p>:
        <div className="main">
          <div className="account_wrapper">
            <button className="selected-account__clickable">
              <div className="selected-account__name">Account_1</div>
              <div className="selected-account__address">
                0x526...79C4
                <div className="selected-account__copy">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 0H1H9V1H1V9H0V0ZM2 2H11V11H2V2ZM3 3H10V10H3V3Z"
                      fill="#989a9b"
                    ></path>
                  </svg>
                </div>
              </div>
            </button>
          </div>
          <div className="wallet-overview">
            <div className="wallet-overview__balance">
              <img className="identicon" src={logo} alt="" />
              <div>
                <div className="cc-overview__balance">
                  <div className="cc-overview__primary-balance">
                    <span className="currency-display-component__text">{(assect.balance.cc_balance).toExponential(2)}</span>
                    <span className="currency-display-component__suffix">CC</span>
                  </div>
                  <div className="cc-overview__secondary-balance">
                    <span className="currency-display-component__text">
                      ￥{assect.balance.cny_balance.toFixed(2)}
                    </span>
                    <span className="currency-display-component__suffix">
                      e-CNY
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="wallet-overview__buttons">
              <button className="cc-overview__button" onClick={()=>history.replace("/")}>
                <div title="" className="" tabIndex="0">
                  <div className="icon-button__circle">
                    <img src={buy} alt="" />
                  </div>
                  <span>Buy</span>
                </div>
              </button>
              <button className="cc-overview__button">
                <div title="" className="" tabIndex="0">
                  <div className="icon-button__circle">
                    <img src={send} alt="" />
                  </div>
                  <span>Send</span>
                </div>
              </button>
              <button className="cc-overview__button">
                <div title="" className="" tabIndex="0">
                  <div className="icon-button__circle">
                    <img src={swap} alt="" />
                  </div>
                  <span>Swap</span>
                </div>
              </button>
            </div>
          </div>
          <div className="tabs">
            <ul className="tab_list">
              <li
                onClick={() => setAssectActive(true)}
                className={classnames({ "tab": true, "tab-active": assectActive })}>
                <button>Assets</button>
              </li>
              <li
                onClick={() => setAssectActive(false)}
                className={classnames({ "tab": true, "tab-active": !assectActive })}>
                <button>Activity</button>
              </li>
            </ul>
            <div className="tab_content">
              <div className={classnames({ "list": true, "content-active": assectActive })}>
                <div className="list-item" tabIndex="0">
                  <div className="list-item__icon">
                    <img className="identicon" alt="CClogo" src={logo} />
                  </div>
                  <div className="list-item__heading">
                    <button className="asset-list-item__token-button" title="0 CC">
                      <h2>
                        <span className="asset-list-item__token-value">{(assect.balance.cc_balance).toExponential(2)}</span>
                        <span className="asset-list-item__token-symbol">CC</span>
                      </h2>
                    </button>
                  </div>
                  <div className="list-item__subheading"><h3 title="￥0.00 e-CNY">￥{(assect.balance.cny_balance).toFixed(2)} e-CNY</h3></div><div className="list-item__right-content">
                    <i className="fas fa-chevron-right asset-list-item__chevron-right"></i>
                  </div>
                </div>
              </div>
              <div className={classnames({ "transaction-list": true, "content-active": !assectActive })}>
                {
                  transaction.length>0  ? 
                  <div className="transaction-list-wrapper">
                      {transaction.map((item,idx)=>{
                        return (
                          <div className="transaction-list-item" key={idx}>
                            <div className="transaction_icon"><img src={item.type=== "buy" ? buy : send} alt="" /></div>
                            <div className="transaction_type"><span>{item.msg}</span></div>
                            <div className="transaction_amount"><span>+ {item.amount.toFixed(2)} {item.msg ==="充值" ? "e-CNY" : "CC"}</span></div>
                            <div className="transaction_time"><span>Date: {item.time}</span></div>
                            <div className="transaction_hash"><span>Serial Number: {item.hash}</span></div>
                          </div>
                        )
                      })}
                  </div>
                  : <div className="no_transaction">
                    no transation yet,please login
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
const mapStateToProps = state => {
  return {
      auth: state.auth,
      assect:state.assect,
      transaction:state.transaction
  }
}
export default connect(mapStateToProps)(Wallet)

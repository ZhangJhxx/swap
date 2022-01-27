import React, { useState } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import * as assectActions from "../../action/assect";
import * as flashActions from "../../action/flash"
import * as transactionActions from "../../action/transaction"
import isEmpty from "lodash/isEmpty"
import {EXCHANGE_RATE} from "../../constants"
import { useHistory } from 'react-router-dom'

import "./swap.less";


const Swap=({auth,assect,assectActions,flashActions,transactionActions})=> {
  const history = useHistory();
  const [swapInp, setSwapInp] = useState(0);
  const [swapOut, setSwapOut] = useState(0);
  const [top, setTop] = useState("CC");
  const [btn, setBtn] = useState("e-CNY");

  const handleUpperChange = (e) => {
    const inpVal = e.target.value;
    setSwapInp(inpVal);
    if (top === "CC") {
      setSwapOut(inpVal * EXCHANGE_RATE);
    } else {
      setSwapOut(inpVal / EXCHANGE_RATE);
    }
  };

  const handleLowerChange = (e) => {
    const inpVal = e.target.value;
    setSwapOut(inpVal);
    if (btn === "e-CNY") {
      setSwapInp(inpVal / EXCHANGE_RATE);
    } else {
      setSwapInp(inpVal * EXCHANGE_RATE);
    }
  };

  const swap = () => {
    setSwapInp(swapOut);
    setTop(btn);
    setSwapOut(swapInp);
    setBtn(top);
  };
  const getDate=()=>{
    const dateArr = new Date().toString().split(" ");
    console.log(dateArr);
    return `${dateArr[1]} ${dateArr[2]}-${dateArr[3]}`
  }
  const ecnyToCC = ()=>{
    assectActions.buyInFuc(Number(swapInp));
    transactionActions.buyInMessage({
      msg:"买入",
      type:"buy",
      amount:swapInp/EXCHANGE_RATE,
      time:getDate(), 
      hash:Math.random().toString().slice(2)
    })
    setTimeout(() => {
      flashActions.addFlashMessage({
        id: Math.random().toString().slice(2),
        msg: "交易成功",
        type: "success"
      })
      setSwapInp(0);
      setSwapOut(0);
    }, 500);
  }

  return (
    <div className="swap">
      <div className="symbol">
        <div className="sym_wrapper">
          <span>Swap</span>
          <span>settings</span>
        </div>
      </div>
      <div className="swap_main">
        <div className="currency_input currency">
          <div className="input_area">
            <div className="currency_name_wrapper">
              <span className="currency_name">{top}</span>
              <span className="balance">
                Balance: {top === "CC" ? assect.balance.cc_balance.toExponential(2) : assect.balance.cny_balance.toFixed(2)}
              </span>
            </div>
           
            <input
              type="text"
              className="token-amount-input"
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0.0"
              minLength="1"
              maxLength="79"
              spellCheck="false"
              value={swapInp === 0 ? "" : swapInp}
              onChange={(e) => handleUpperChange(e)}
            />
          </div>
        </div>
        <div className="currency_arrow" onClick={() => swap()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6E727D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
        <div className="currency_output currency">
          <div className="input_area">
            <span className="currency_name">{btn}</span>
            <input
              type="text"
              className="token-amount-output"
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0.0"
              minLength="1"
              maxLength="79"
              spellCheck="false"
              value={swapOut === 0 ? "" : swapOut}
              onChange={(e) => handleLowerChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="currency_exchange_rate">
        <span className="currency_rate">
          1 {btn} = {top === "CC" ? (1 / EXCHANGE_RATE).toFixed(4) : EXCHANGE_RATE} {top}
        </span>
      </div>
      <div className="wallet_connect">
        {
          isEmpty(auth.user) ?
           <button className="wallet_btn" onClick={() =>history.push("/signin")}>Connect Wallet</button>
           :
           <button className="wallet_btn" onClick={ecnyToCC}>Buy</button>
        }
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
      auth: state.auth,
      assect:state.assect
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    assectActions:bindActionCreators(assectActions,dispatch),
    flashActions:bindActionCreators(flashActions,dispatch),
    transactionActions:bindActionCreators(transactionActions,dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Swap);



const transactionState = [
  { msg: "充值",type:"buy", hash: "23510194117339012", time:"Jan 21-2022",amount:100 },
];

const transaction = (state = transactionState, action) => {
  switch (action.type) {
    case "buy":
      return [...state, action.message];
    default:
      return state;
  }
};
export default transaction;

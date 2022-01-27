
import { findIndex } from "lodash";

const flashState = [
  // { msg: "注册成功",type:"success", id: 1001 },
  // { msg: "注册失败",type:"fail", id: 1002 },
];

const flash = (state = flashState, action) => {
  switch (action.type) {
    case "addFlash":
      return [...state, action.message];
    case "delFlash":
      const currentIdx = findIndex(state,(item)=> item.id === action.id);
      return [
        ...state.slice(0, currentIdx),
        ...state.slice(currentIdx+1)
      ];
    default:
      return state;
  }
};
export default flash;

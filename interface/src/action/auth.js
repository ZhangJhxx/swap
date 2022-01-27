import api from "../api"

export function setUserObj(user) {
  return{
    type: "setUser",
    user
  };
}
export function logOut(){
  return dispatch =>{
      dispatch(setUserObj({}))
  }
}


//redux异步方法
export function asyncSetUserObj(data){
  return dispatch =>{
    return api.login(data).then(res=>{
      if(res.data.status === 200){
        dispatch(setUserObj(res.data.result[0]));
      }
      return res.data;
    })
  }
}




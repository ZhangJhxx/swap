const express = require('express');
const app = express();
const router = require("./router");
const bodyparser = require('body-parser');
const cors = require('cors');
const debug = require('debug')('my-application');

//跨域配置
app.use(cors());
//解决post接收参数的问题
app.use(bodyparser.urlencoded({ extended:true }));

app.use("/api",router);

app.listen(8888,()=>{
  console.log("server running at port 8888");
  debug();
})
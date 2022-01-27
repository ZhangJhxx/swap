const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const validator = require("validator");
const isEmpty = require("lodash/isEmpty");
const url = require("url");


//字节的线上数据库
const InspireCloud = require("@byteinspire/js-sdk");
const serviceId = "qcshgh"; // 替换serviceId

// 初始化
const inspirecloud = new InspireCloud({ serviceId });

/**
 * 如果发生错误，则返回错误信息，如果不发生错误，则返回true
 */
const validatorInput = (data) => {
  /**
   * validator.isEmpty方法验证是否为空
   */
  let errors = {};
  if (validator.isEmpty(data.username)) {
    errors.username = "用户名不能为空";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "不符合邮箱格式";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "密码不能为空";
  }
  /**
   * equals:验证字符串是否相同
   */
  if (!validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "两次密码不相同";
  }

  return {
    // 如果 value 为空，那么返回 true，否则返回 false。
    isValid: !isEmpty(errors),
    errors,
  };
};

//注册验证
router.post("/register", (req, res) => {
  const { isValid, errors } = validatorInput(req.body);
  if (isValid) {
    // 表单信息不合规 验证失败
    res.send({
      errors,
      status: 400,
    });
  } else {
    //成功数据写入数据库
    const { username, password, email } = req.body;
    // 通过 inspirecloud.run 调用云函数
    inspirecloud
      .run("insert_user", { username, password, email })
      .then((data) => {
        // 处理正常结果
        console.log(data);
        res.send({
          msg: "注册成功",
          status: 200,
        });
      })
      .catch((error) => {
        // 处理异常结果
        console.log(error);
        res.send({
          msg: "注册失败",
          status: 401,
        });
      });
  }
});

router.post("/login",(req, res) => {
  const {username, password}= req.body;
  inspirecloud
  .run("exist_user", { username, password })
  .then(data=>{
    const {result} = data;
    if(result.length>0){
      res.send({
        result,
        status:200
      })
    }else{
      res.send({
        status:400,
        msg:"用户名错误或密码错误"
      })
    }
  }).catch(err=>{
    console.log(err);
  })
})

//重复用户名处理
router.get("/repeat/username",(req,res)=>{
  const username = url.parse(req.url, true).query.username;
  inspirecloud.run("duplicate_user",{username})
  .then((data) => {
    if(data.res === true){ //用户名重复
      res.send({
        msg:"duplicate_user",
        flag: false,
        status: 201,
      })
    }else{//用户名可用
      res.send({
        msg:"用户名可用",
        flag: true,
        status: 200,
      })
    }
  })
  .catch((error)=>{
    console.log(error);
  }) 
})

//请求新闻
router.get("/news/:page", (req, res) => {
  const file = path.join(__dirname, `../newsdata/news${req.params.page}.json`); //获取文件路径
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) {
      res.send("文件读取失败");
    } else {
      res.send(data);
    }
  });
});


module.exports = router;

const usersModel = require('../models/users');
const {hash, compare} = require('../utils/tools');
const  randomstring = require('randomstring');

// 退出登录

const signout = async (req, res, next) => {
  req.session = null;
  res.send({
    code: 200,
    msg: '退出成功',
  })
}

// 登录
const signin = async (req, res, next) => {
  const {username, password} = req.body;
  res.set('Content-Type', 'application/json;charset=utf-8');

  let result = await usersModel.findUser({username});

  // 验证用户是否是合法用户
  if (result) {
    let {password: hash} = result;
    let compareRes = await compare(password, hash);
    if (compareRes) {
      // const sessionId = randomstring.generate();
      // console.log(1, sessionId);

      // // Set-Cookie http 协议种cookie字段
      // res.set('Set-Cookie', `sessionId=${sessionId}; Path=/; HttpOnly`);
      req.session.username = username;

      // console.log(2, req.session.username);
      res.send({
        code: 200,
        errorMsg: 'ok',
      });
      res.end();
    } else {
      res.send({
        code: 404,
        errorMsg: '用户名或密码错误',
      });
      res.end();
    }
  } else {
    res.send({
      code: 404,
      errorMsg: '用户名或密码错误',
    });
    res.end();
  }
}

// 注册用户
const signup = async (req, res, next) => {
  const {username, password} = req.body;
  //  密码加密
  const bcryptPassword = await hash(password);

  let findResult = await usersModel.findUser({username});
  console.log('findResult', findResult);
  res.set('Content-Type', 'application/json;charset=utf-8');
  
  if (findResult) {
    res.render('fail', {
      data: JSON.stringify({
        message: 'user already exist'
      }),
    });
  } else {
    //数据库没数据添加操作
    let result = await usersModel.signup({username, password: bcryptPassword});

    // res.render('succ', {
    //   data: JSON.stringify({
    //     message: '注册成功'
    //   }),
    // });
    res.send(result);
    res.end();
  }
}
// users list
const list = async (req, res, next) => {
  const listResult = await usersModel.findList();
  res.set('Content-Type', 'application/json;charset=utf-8');
  // res.render('succ', listResult)
  res.send(listResult);
  res.end();
}

const remove = async (req, res, next) => {
  const {id} = req.body;
  let result = await usersModel.remove(id)
  res.set('Content-Type', 'application/json;charset=utf-8');
  if (result) {
    res.send({
      code: 0
    });
    res.end();
  } else {
    res.send({
      code: -1
    });
    res.end();
  }

}

const isAuth = async (req, res, next) => {
  if (req.session.username) {
    res.send({
      code: 200,
      msg: 'ok',
    });
  } else {
    res.send({
      code: 404,
      errorMsg: '登录过期或没有登录',
    });
  }
}

exports.signup = signup;
exports.signout = signout;
exports.signin = signin;
exports.list = list;
exports.remove = remove;
exports.isAuth = isAuth;

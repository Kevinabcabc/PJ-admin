const usersModel = require('../models/users');
const {hash} = require('../utils/tools');

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

exports.signup = signup;
exports.list = list;
exports.remove = remove;

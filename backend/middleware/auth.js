const {verify} = require('../utils/tools')

const auth = (req, res, next) => {
  const token = req.get('X-Access-Token');
  console.log(111, token);
  try {
    let result = verify(token);
    if (result.username) {
      next();
    } else {
      res.send({
        code: 404,
        errorMsg: '登录过期或没有登录',
      });
    }
  } catch (error) {
    res.send({
      code: 404,
      errorMsg: '登录过期或没有登录',
    });
  }
}

exports.auth = auth;
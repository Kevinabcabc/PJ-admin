const auth = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.send({
      code: 404,
      errorMsg: '登录过期或没有登录',
    });
  }
}

exports.auth = auth;
var express = require('express');
var router = express.Router();

const {signup, list, remove, signin, signout, isAuth} = require('../controllers/users');
const {auth} = require('../middleware/auth'); 

/* GET users listing. */
// 数据操作
router.get('/', auth, list);
router.delete('/', auth, remove);


// 注册
router.post('/', auth, signup);
// 登录登出
router.post('/signin', signin);
router.get('/signout', auth, signout);

router.get('/isAuth', isAuth);
module.exports = router;

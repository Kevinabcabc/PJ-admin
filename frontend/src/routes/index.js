import SMERouter from 'sme-router';

const router = new SMERouter('root');

import {signIn, index} from '../controllers/index';


router.use((req) => {
  $.ajax({
    url: '/api/users/isAuth',
    dataType: 'json',
    headers: {
      "X-Access-Token": localStorage.getItem('token') || '',
    },
    success: (res) => {
      if (res.code === 200) {
        router.go('/index');
      } else {
        router.go('/signin');
      }
    }
  });
});

router.route('/', signIn(router));


router.route('/index', index(router));

router.route('/signin', signIn(router));

export default router;
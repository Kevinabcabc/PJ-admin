import SMERouter from 'sme-router';

const router = new SMERouter('root');

import {signIn, index} from '../controllers/index';


router.use((req) => {
  $.ajax({
    url: '/api/users/isAuth',
    dataType: 'json',
    async: false,
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
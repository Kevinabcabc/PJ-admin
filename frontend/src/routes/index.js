import SMERouter from 'sme-router';

const router = new SMERouter('root');

import {signIn, index} from '../controllers/index';


router.route('/', signIn(router));

router.route('/index', index(router));

router.route('/signin', signIn(router));

export default router;
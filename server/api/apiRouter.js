import Express from 'express';
import getItem from './getItem';
import getList from './getList';
import user from './user';
import addPost from './addPost';
import log from './log';
import reg from './reg';
import comment from './comment';
import vote from './vote';
import auth from '../middleware/auth';
import sortUsers from './sortUsers';
import getUserInfo from './getUserInfo'
const router = Express.Router();

router.get('/post',getList);
router.post('/post',auth);
router.post('/post',addPost);

router.get('/detail',getItem);

router.post('/log',log);

router.post('/reg',reg);

router.post('/user',user);

router.post('/comment',auth);
router.post('/comment',comment)

router.post('/vote',auth);
router.post('/vote',vote);

router.get('/sortUsers',sortUsers);

router.post('/getUserInfo',auth);
router.post('/getUserInfo',getUserInfo)
export default router;
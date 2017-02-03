import Express from 'express';
import qs from 'qs';
import getItem from '../api/getItem';
import getList from '../api/getList';
const router = Express.Router();

router.use('/detail',(req,res)=>{
    const id = qs.parse(req.query).id;
    const data = getItem(id);
    res.status(200).json(data);
})

router.use('/list',(req,res)=>{
    const author = qs.parse(req.query).author;
    const data = getList(author);
    res.status(200).json(data);
})

export default router;
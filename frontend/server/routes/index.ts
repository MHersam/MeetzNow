import * as Express from 'express'
const router = Express.Router();

router.get('/', async function(req, res, next) {
    try{
        res.sendFile('index.html', {root : __dirname + '../public/app'});
    }catch (err){
        next(err)
    }
});

module.exports = router;

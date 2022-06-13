const express = require('express')
const router = express.Router()
//const userRouter = require('./user')
const rootRouter = require('./root')


//router.use('/user', userRouter);
router.use('/', rootRouter);

module.exports = router
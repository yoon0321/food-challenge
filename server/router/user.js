const router = require('express').Router();
const controller = require('../controller/user');
const nicknameController = require('../controller/user/nickname')

router.post('/login' , controller.login)
router.post('/logout' , controller.logout)
router.patch('password', controller.password)
router.post('/signup', controller.signup)
router.delete('/signout', controller.signout)
router.patch('/nickname/', nicknameController.patch)
router.post('/nickname/', nicknameController.post)
router.get('/auth', controller.auth)


module.exports = router;
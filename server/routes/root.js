const router = require('express').Router();
const controller = require('../controller')

router.get('/', controller.root.get);

module.exports = router;    

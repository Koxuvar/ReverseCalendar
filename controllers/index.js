const router = require('express').Router();
const homeRoute = require('./homeRoute');
const apiRoutes = require('./api');


router.use('/api', apiRoutes);
router.use('/', homeRoute);
module.exports = router;

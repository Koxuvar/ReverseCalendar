const router = require('express').Router();
const catagoryRoutes = require('./catagoryRoutes');
const dailyCheckRoutes = require('./dailyCheckRoutes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/catagory', catagoryRoutes);
router.use('/dailyCheck', dailyCheckRoutes);

module.exports = router;

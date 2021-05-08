const router = require('express').Router();
const catagoryRoutes = require('./catagoryRoutes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/catagory', catagoryRoutes);

module.exports = router;

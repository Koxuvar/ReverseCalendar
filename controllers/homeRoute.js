const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

router.get('/',(req, res) => {
  

    res.render('homepage',{
      logged_in:req.session.loggedIn
    });

 
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/calendar', (req, res) =>
{
  res.render('calendar');
});

module.exports = router;

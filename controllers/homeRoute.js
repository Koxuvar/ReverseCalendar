const router = require('express').Router();
const { User, Catagory } = require('../models');
const withAuth = require('../utils/auth');



router.get('/',(req, res) => {
    if(req.session.logged_in)
    {
        res.redirect('/calendar');
        return;
    }

    res.render('homepage',{
        logged_in:req.session.logged_in
    });

 
});

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/calendar');
//         return;
//     }

//     res.render('login');
// });

router.get('/calendar', (req, res) =>
{
    if(!req.session.logged_in)
    {
        res.redirect('/');
        return;
    }
  
  Catagory.findAll(
    {
        where:
        {
            user_id: req.session.user_id,
        }
    })
    .then((catagories) => 
    {
        const cats = catagories.map((cat) => cat.get({plain: true}));
        res.render('calendar', {
            cats, 
            logged_in:req.session.logged_in 
        });
    });
});

router.get('/goals', (req, res) =>
{
    if(!req.session.logged_in)
    {
        res.redirect('/');
        return;
    }
  
  Catagory.findAll(
    {
        where:
        {
            user_id: req.session.user_id,
        }
    })
    .then((catagories) => 
    {
        const cats = catagories.map((cat) => cat.get({plain: true}));
        res.render('goals', {
            cats, 
            logged_in:req.session.logged_in 
        });
    });
});

router.get('/stats', (req, res) =>
{
    if(!req.session.logged_in)
    {
        res.redirect('/');
        return;
    }
  
  Catagory.findAll(
    {
        where:
        {
            user_id: req.session.user_id,
        }
    })
    .then((catagories) => 
    {
        const cats = catagories.map((cat) => cat.get({plain: true}));
        res.render('stats', {
            cats, 
            logged_in:req.session.logged_in 
        });
    });
});

module.exports = router;

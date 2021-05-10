
const router = require('express').Router();
const Catagory = require('../../models/Catagory');
const withAuth = require('../../utils/auth');




//get categories by user
router.get('/', withAuth, (req, res) =>
{
    console.log(req.session);
    console.log(req.session.user_id);
    try
    {
        Catagory.findAll(
            {
                where:
                {
                    user_id: req.session.user_id,
                }
            }
        )
        .then((catagories) => 
        {
            const catsPlain = catagories.map((cat) => cat.get({plain: true}));

            res.json(catsPlain);
        })
        .catch((err) => res.status(500).json(err));
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});



//create catagories for user
router.post('/', withAuth, async (req, res) =>
{
    console.log(req.session.user_id)
    try
    {
        Catagory.create(
            {
              ...req.body,
             
              user_id: req.session.user_id,
            }
        )
        .then((newCatagory) =>
        {
            res.status(200).json(newCatagory);
        });
    } 
    catch (err) 
    {
        res.status(500).json(err);
    }
});

//update catagories for user
router.put('/:catId', withAuth, (req,res) =>
{
    try
    {
        Catagory.update(
            {
                ...req.body
            },
            {
                where:
                {
                    
                    id: req.params.catId,
                    user_id: req.session.user_id,
                }
            }
        )
        .then((catagory) =>
        {
            res.json(catagory);
        })
        .catch((err) => res.status(500).json(err));
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});

//delete catagories for user
router.delete('/:catId', withAuth, async (req,res) =>
{
    try
    {
        Catagory.destroy(
            {
                where: {
                    
                    id: req.params.catId,
                    user_id: req.session.user_id,
                }
            }
        )
        .then((deletedCatagory) => 
        {
            res.json(deletedCatagory);
        });
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});


module.exports = router;
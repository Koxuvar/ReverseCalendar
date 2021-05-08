
const router = require('express').Router();
const Catagory = require('../../models/catagory');
const withAuth = require('../../utils/auth');




//get categories by user
router.get('/:id', (req, res) =>
{
    try
    {
        Catagory.findAll(
            {
                where:
                {
                    user_id: req.params.id,
                }
            }
        )
        .then((catagories) => 
        {
            res.json(catagories);
        })
        .catch((err) => res.status(500).json(err));
    }
    catch (err)
    {
        res.status(500).json(err);
    }
});



//create catagories for user
router.post('/:id', (req, res) =>
{
    try
    {
        Catagory.create(
            {
              ...req.body,
              user_id: req.params.id,
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
router.put('/:id/:catId', (req,res) =>
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
                    user_id:req.params.id,
                    id: req.params.catId
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
router.delete('/:id/:catId', (req,res) =>
{
    try
    {
        Catagory.destroy(
            {
                where: {
                    user_id:req.params.id,
                    id: req.params.catId
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
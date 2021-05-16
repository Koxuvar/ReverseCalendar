const router = require('express').Router();
const { User, Catagory, DailyCheck }= require('../../models');
const withAuth = require('../../utils/auth');

//get dailychecks for this user
router.get('/getChecks', withAuth, async (req,res) => 
{
    try 
    {
        const dailyCheckData = await User.findByPk(req.session.user_id,
            {
            include:[{model:Catagory}, {model: DailyCheck}]  
            });
            
            //catch errors
            if (!dailyCheckData) 
            {
                res.status(404).json({ message: 'No dailyCheck found with this id!' });
                return;
            }
            res.status(200).json(dailyCheckData);
    }
    catch (err) 
    {
        res.status(500).json(err);
    }
});

router.get('/getChecksForUsers', withAuth, async (req,res) => 
{
    try 
    {
        const dailyCheckData = await User.findAll(
            {
            include:[{model:Catagory}, {model: DailyCheck}]  
            });
            
            //catch errors
            if (!dailyCheckData) 
            {
                res.status(404).json({ message: 'No dailyCheck found with this id!' });
                return;
            }
            
            const chunkedData = dailyCheckData.slice(0, 35);
            res.status(200).json(chunkedData);
    }
    catch (err) 
    {
        res.status(500).json(err);
    }
});

    //create a daily check for this user
router.post('/create', withAuth, async (req,res) => 
{
    try 
    {
        const dailyCheckData = await DailyCheck.create(
        {
            day: req.body.day,
            user_id: req.session.user_id,
            catagory_id:req.body.catagory_id
        });

        res.status(200).json(dailyCheckData);
    }
    catch (err) 
    {
        res.status(418).json(err);
    }
});

    //delete a daily check for this user 
router.delete('/:id', withAuth, async (req, res) => 
{
    try 
    {
        const dailyCheckData = await DailyCheck.destroy(
        {
            where: 
            {
                id: req.params.id,
                user_id: req.session.user_id,
                day: req.body.day
            }
        });
     //catch errors
        if (!dailyCheckData) 
        {
            res.status(404).json({ message: 'No dailyCheck found with this id!' });
            return;
        }
        res.status(200).json(dailyCheckData);
    }
    catch (err) 
    {
        res.status(500).json(err);
    } 
});

module.exports = router;
const router = require('express').Router();
const dailyCheck = require('../../models/dailyCheck');
const withAuth = require('../../utils/auth');

//get dailychecks for this user
router.get('/', withAuth, async (req,res) => {
    try {
        const dailyCheckData = await dailyCheck.findAll({
            where:
                {
                    user_id: req.session.user_id,
                }
            });
            //catch errors
            if (!dailyCheckData) {
                res.status(404).json({ message: 'No dailyCheck found with this id!' });
                return;
            }
            const dCheckData = dailyCheckData.map((dc) => dc.get({plain:true}));
            res.status(200).json(dCheckData);
        }
        catch (err) {
            res.status(500).json(err)};
});

    //create a daily check for this user
router.post('/', withAuth, async (req,res) => {
    try {
        const dailyCheckData = await dailyCheck.create({
            day: req.body.day,
            user_id: req.session.user_id,
            catagory_id:req.body.category_id
        });
        res.status(200).json(dailyCheckData);
    }
    catch (err) {
        res.status(400).json(err);
      }
    });

    //delete a daily check for this user 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dailyCheckData = await dailyCheck.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
        day: req.body.day
      }
    });
     //catch errors
     if (!dailyCheckData) {
        res.status(404).json({ message: 'No dailyCheck found with this id!' });
        return;
    }
    res.status(200).json(dailyCheckData);
    }
    catch (err) {
        res.status(500).json(err)
    }
    
    
});

module.exports = router;
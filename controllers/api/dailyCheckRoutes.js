const router = require('express').Router();
const dailyCheck = require('../../models/dailyCheck');
const withAuth = require('../../utils/auth');

//get dailychecks for this user
router.get(':/id', withAuth, async (req,res) => {
    try {
        const dailyCheckData = await dailyCheck.findAll({
            where:
                {
                    user_id: req.params.id,
                },
            include: [
                {
                  model: dailyCheck,
                  attributes: ['category_id', 'day'],
                },
              ],
            });
            //catch errors
            if (!dailyCheckData) {
                res.status(404).json({ message: 'No dailyCheck found with this id!' });
                return;
            }
            res.status(200).json(dailyCheckData);
        }
        catch (err) {
            res.status(500).json(err)};
     });

    //create a daily check for this user
    router.post(':/id/:catId', withAuth, async (req,res) => {
        try {
            const dailyCheckData = await dailyCheck.create({
                day: req.body.day,
                user_id: req.session.user_id,
                category_id:req.body.category_id
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
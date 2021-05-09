const router = require('express').Router();
const dailyCheck = require('../../models/dailyCheck');





router.get("/", (req, res) => {
  dailyCheck.findAll().then((dailyCheckData) => {
    res.json(dailyCheckData);
  });
});




module.exports = router;
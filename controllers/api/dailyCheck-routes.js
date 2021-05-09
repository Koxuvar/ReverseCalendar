const router = require('express').Router();
const DailyCheck = require('../../models/DailyCheck');





router.get("/", (req, res) => {
  DailyCheck.findAll().then((dailyCheckData) => {
    res.json(dailyCheckData);
  });
});




module.exports = router;
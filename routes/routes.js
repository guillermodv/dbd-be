const express = require('express');
const router = express.Router();
const DashboardController = require('../controller/dashboard');

//routes
router.get('/', (req, res) => {
    res.send('Dashboard BackEnd On line.')
});



router.get('/dashboard', DashboardController.fetchDashboardData);
router.get('/dashboard/:id', DashboardController.getDashboardData);

router.get('*', (req, res) => {
    res.send('path do not exits')
});

module.exports = router;

const DashboardService = require('../services/DashboardService');

class DashboardController {
    async fetchDashboardData(_, res, next) {
        try {
            console.log("fetch all data to Dashboard");
            const response = await DashboardService.fetchDashboardData();
            res.send({response});
        } catch(err) {
            next(err);
        }
    }

    async getDashboardData(req, res, next) {
        try {
            console.log("get data from id,", req.params.id);
            const response = await DashboardService.getDashboardData(req.params.id);
            res.send({response});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new DashboardController();

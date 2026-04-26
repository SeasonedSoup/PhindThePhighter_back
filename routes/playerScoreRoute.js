const {Router} = require('express')
const playerScoreController = require("../controllers/playerScoreController");


const playerScoreRouter = Router();

playerScoreRouter.post('/create', playerScoreController.createPlayerScore);
playerScoreRouter.get('/:mapId/mapInfo', playerScoreController.getTopTenMap);
playerScoreRouter.get('/leaderboard/:mapId' , playerScoreController.getTopHundredLb);
module.exports = playerScoreRouter
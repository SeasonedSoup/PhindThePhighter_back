const {Router} = require('express')
const playerScoreController = require("../controllers/playerScoreController");
const validateScoreController = require("../controllers/validateScoreController");
const tokenController = require('../controllers/tokenController');
const playerScoreRouter = Router();

playerScoreRouter.post('/create', tokenController.verifyToken, playerScoreController.createPlayerScore);
playerScoreRouter.get('/:mapId/mapInfo', playerScoreController.getTopTenMap);
playerScoreRouter.get('/leaderboard/:mapId' , playerScoreController.getTopHundredLb);
module.exports = playerScoreRouter
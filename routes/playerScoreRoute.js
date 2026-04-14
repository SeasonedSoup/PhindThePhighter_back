const {Router} = require('express')
const playerScoreController = require("../controllers/playerScoreController");


const playerScoreRouter = Router();

playerScoreRouter.post('/create', playerScoreController.createPlayerScore);

module.exports = playerScoreRouter
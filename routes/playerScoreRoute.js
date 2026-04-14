const {Router} = require('express')
const playerScoreController = require("../controllers/playerScoreController");


const playerScoreRouter = Router();

playerScoreRouter.post('/', playerScoreController.createPlayerScore);

module.exports = playerScoreRouter
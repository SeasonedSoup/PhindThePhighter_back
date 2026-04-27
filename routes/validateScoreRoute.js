const {Router} = require('express')
const tokenController = require('../controllers/tokenController');
const validateScoreController = require('../controllers/validateScoreController');
const validateScoreRouter = Router();

validateScoreRouter.post('/gameStart', tokenController.giveUserToken)
validateScoreRouter.get('/gameEnd', tokenController.verifyToken, validateScoreController.verifyWinningCondition)
module.exports = validateScoreRouter;

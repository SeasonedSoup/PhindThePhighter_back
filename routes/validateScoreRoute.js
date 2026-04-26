const {Router} = require('express')
const validateScoreController = require('../controllers/validateScoreController');
const tokenController = require('../controllers/tokenController')
const validateScoreRouter = Router();

validateScoreRouter.post('/gameStart', tokenController.giveUserToken)


module.exports = validateScoreRouter;

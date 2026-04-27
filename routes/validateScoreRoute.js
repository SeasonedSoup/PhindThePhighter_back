const {Router} = require('express')
const tokenController = require('../controllers/tokenController');
const validateScoreRouter = Router();

validateScoreRouter.post('/gameStart', tokenController.giveUserToken)

module.exports = validateScoreRouter;

const {Router} = require('express')
const validateScoreController = require('../controllers/validateScoreController');
const validateScoreRouter = Router();

validateScoreRouter.get('/gameStart', validateScoreController.)
module.exports = validateScoreRouter;
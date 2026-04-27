const validateController = require('../controllers/validateCoordController');
const tokenController = require('../controllers/tokenController');
const { Router } = require('express');

const validateCoordRouter = Router();

validateCoordRouter.post('/', tokenController.verifyToken, validateController.validateCoordinate);

module.exports = validateCoordRouter


const validateController = require('../controllers/validateCoordController');
const { Router } = require('express');

const validateCoordRouter = Router();

validateCoordRouter.get('/', validateController.validateCoordinate);

module.exports = validateCoordRouter


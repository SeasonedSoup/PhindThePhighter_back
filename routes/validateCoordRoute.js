const validateController = require('../controllers/validateCoordController');
const { Router } = require('express');

const validateCoordRouter = Router();

validateCoordRouter.post('/', validateController.validateCoordinate);

module.exports = validateCoordRouter


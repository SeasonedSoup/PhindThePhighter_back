const request = require('supertest');
const express = require('express');
const app = express();
const validateCoordRouter = require('../routes/validateCoordRoute');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', validateCoordRouter);
//TESTS 0.753, Y: 0.726 location of coil

test('It is validating / validate route works', done => {
    request(app).post('/').type('json').send({coordinates: {x: 0.753, y: 0.726}, character: 'Coil'})
})

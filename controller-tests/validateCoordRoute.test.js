const request = require('supertest');
const express = require('express');
const app = express();
const validateCoordRouter = require('../routes/validateCoordRoute');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', validateCoordRouter);
//TESTS

test('It is validating / validate route works', done => {
    request(app).get('/').expect("Content-Type", /json/).
    expect({message: 'validating'}).expect(200, done)
})

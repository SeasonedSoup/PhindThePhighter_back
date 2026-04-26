const request = require('supertest');
const express = require('express');
const app = express();
const validateScoreRouter = require('../routes/validateScoreRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', validateScoreRouter);

test('Should give a jwt', done => {
    request(app).post('/gameStart').send({mapName: 'BogioSkatepark'}).expect(200).expect('Content-Type', /json/).end(done)
})
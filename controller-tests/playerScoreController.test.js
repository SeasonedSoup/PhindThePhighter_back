const request = require("supertest");
const express = require("express");
const {prisma} = require('../lib/prisma'); 
const app = express();
const playerScoreRouter = require('../routes/playerScoreRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', playerScoreRouter);

afterAll(async () => {
    await prisma.$disconnect();
});

test('Successful Creation of username Bob with score of 102 seconds', done => {
    request(app).post('/create').type('json').send({name: 'Bob', score: 102000}).expect(201, {message: "Name created successfully"}, done)
})

test('Should not be able to create when username is longer than 16 character', done => {
    request(app).post('/create').type('json').send({name: 'Asuperlongnamecontaining16characters', score: 90204}).expect(400, {message: "Invalid name submitted. try again"}, done)
})


test('Should not be able to submit an empty string as a name', done => {
    request(app).post('/create').type('json').send({name: '', score: 1000000}).expect(400, {message: "Invalid name submitted. try again"}, done)
})

test('There should be an type error when score is not correctly provided ', done => {
    request(app).post('/create').type('json').send({name: "James", score: ""}).expect(400, {error: "Error creating score"}, done)
})

test('There should be an type error when name is not correctly provided ', done => {
    request(app).post('/create').type('json').send({name: 1000, score: 50000}).expect(400, {error: "Error creating score"}, done)
})

test('Should Fetch Bob', done => {
    request(app).get('/1/mapInfo').expect(200).expect(res => {
            if (!Array.isArray(res.body)) throw new Error("Not an array");
        })
        .end(done); 
});



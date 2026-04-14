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
    request(app).post('/').type('json').send({name: 'Bob', score: 102000}).expect(201, {message: "Name created successfully"}, done)
})

test('Should not be able to create when username is longer than 16 character', done => {
    request(app).post('/').type('json').send({name: 'Asuperlongnamecontaining16characters', score: 90204}).expect(400, {message: "Name is too long try again"}, done)
})

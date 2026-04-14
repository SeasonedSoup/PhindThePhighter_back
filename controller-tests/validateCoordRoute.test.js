const request = require('supertest');
const express = require('express');
const app = express();
const {prisma} = require('../lib/prisma'); 

const validateCoordRouter = require('../routes/validateCoordRoute');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', validateCoordRouter);
//TESTS 0.753, Y: 0.726 location of coil

afterAll(async () => {
    await prisma.$disconnect();
});

test('Exact Coordinates Work', done => {
    request(app).post('/').type('json').send({coordinates: {x: 0.753, y: 0.726}, character: 'Coil'}).expect(200, {message: "You found Coil", status: "Found"}, done)
})

test('Coordinates at the maximum threshold works', done => {
    request(app).post('/').type('json').send({coordinates: {x: 0.703, y: 0.676}, character: 'Coil'}).expect(200, {message: "You found Coil", status: "Found"}, done)
})

test("Far away coordinates should not work", done => {
    request(app).post('/').type('json').send({coordinates: {x: 0.405, y: 0.726}, character: 'Coil'}).expect(200, {message: "Wrong coordinates Coil not found", status: "Not Found"}, done)
})


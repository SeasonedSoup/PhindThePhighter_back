const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const validateScoreRouter = require('../routes/validateScoreRoute');
const validateCoordRouter = require('../routes/validateCoordRoute');
const playerScoreRouter = require('../routes/playerScoreRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', validateScoreRouter);

app.use('/', validateCoordRouter);

app.use('/', playerScoreRouter);

test('Should give a jwt', done => {
    request(app).post('/gameStart').send({mapId: 1}).expect(200).expect('Content-Type', /json/).end(done)
})

test('validates a jwt properly with coordinate', done => {
     request(app).post('/gameStart').send({mapId: 1}).expect(200).expect('Content-Type', /json/).end((err, res1) => {
        if (err) return done(err)
        
        const token = res1.body.token
             request(app)
                .post('/') 
                .set('Authorization', `Bearer ${token}`) 
                .send({ 
                    character: 'Coil', 
                    coordinates: { x: 0.753, y: 0.726} 
                }).end((err, res2) => {
                    if (err) return done(err);

                    const newToken = res2.body.token
                    const decoded = jwt.decode(newToken);

                    expect(res2.status).toBe(200)
                    expect(res2.body.message).toBe('You found Coil');
                    expect(decoded.phighters).toContain('Coil');

                    done();
                })
     })
});

test('Completes game by finding 3 phighters in a row', async () => {
  const startRes = await request(app)
    .post('/gameStart')
    .send({ mapId: 1 });
  
  let currentToken = startRes.body.token;

  const phightersToFind = [{name: 'Coil', coordinates: { x: 0.753 , y: 0.726}}, {name: 'Medkit', coordinates: {x: 0.591, y: 0.127}}, {name: 'Sword', coordinates: { x: 0.131 , y: 0.682}}];
  
  for (const phighter of phightersToFind) {
    const res = await request(app)
      .post('/')
      .set('Authorization', `Bearer ${currentToken}`)
      .send({ character: phighter.name, coordinates: { x: phighter.coordinates.x , y: phighter.coordinates.y } });
    
    expect(res.status).toBe(200);
    currentToken = res.body.token; 
  }

  const finalRes = await request(app)
    .post('/create')
    .set('Authorization', `Bearer ${currentToken}`)
    .send({name: "Jared", score: 10000})
    
    console.log('STATUS:', finalRes.status);
    console.log('ERROR TEXT:', finalRes.text); 

    expect(finalRes.body.message).toBe('Name created successfully')
    expect(finalRes.status).toBe(201)
});

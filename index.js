const validateCoordRouter = require('./routes/validateCoordRoute');
const playerScoreRouter = require ("./routes/playerScoreRoute");
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const validateScoreRouter = require('./routes/validateScoreRoute');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', validateCoordRouter);
app.use('/', playerScoreRouter);
app.use('/', validateScoreRouter);

app.get('/', (req, res) => {
    res.send("HI IM AN API FOR PHIND")
})

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }

    console.log(`The server is now listening at http://localhost:${PORT}`)
})
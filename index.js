require('dotenv').config();

const express = require('express');
const {prisma} = require('./lib/prisma');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("HI IM AN API FOR PHIND")
})

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }

    console.log(`The server is now listening at http://localhost:${PORT}`)
})
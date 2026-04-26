const request = require('supertest');
const express = require('express');
const app = express();
const {prisma} = require('../lib/prisma'); 

const jwt = require('jsonwebtoken');


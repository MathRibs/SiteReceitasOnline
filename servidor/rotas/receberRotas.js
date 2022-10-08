

const express = require('express');

const rotas = express.Router();

const receberControles= require('../controle/receberControles');


//ROTAS DO SITE
rotas.get('/', receberControles.home);
rotas.get('/categories', receberControles.displaycategories);


module.exports = rotas ;

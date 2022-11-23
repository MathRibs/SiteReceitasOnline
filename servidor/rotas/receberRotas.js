

const express = require('express');

const rotas = express.Router();

const receberControles= require('../controle/receberControles');


//ROTAS DO SITE

rotas.get('/', receberControles.home);
rotas.get('/receita/:id', receberControles.showReceita);
rotas.get('/categories', receberControles.displaycategories);
rotas.get('/categories/:id', receberControles.showCategoriesId);
rotas.post('/pesquisar',receberControles.pesquisaReceitas);
rotas.get('/explorar-ultimo', receberControles.adicionadaRecentemente);
rotas.get('/receita-aleatoria', receberControles.receitasAleatorias);
rotas.get('/contato',receberControles.redcontato);
rotas.get('/sobre', receberControles.redsobre)


//Enviar receitas
rotas.get('/enviar-receita', receberControles.enviarReceitas);
rotas.post('/enviar-receita', receberControles.enviarReceitas2);


//DELETAR RECEITAS
rotas.get('/receita/:id/deletar',receberControles.deletar_receitas);


//Editar Receitas
rotas.get('/update',receberControles.editreceita);
rotas.post('/update', receberControles.updatereceita);

//Our API
rotas.get("/recomendations/:id", receberControles.showRecommendations);


//Rotas API de receitas 
rotas.get("/calories", receberControles.rendercalorias);


rotas.post("/calories", receberControles.postApidata);



module.exports = rotas ;
//ultimasReceita
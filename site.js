const express = require("express");

//Ajuda com o layout 
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const flash = require ('connect-flash');


const porta = process.env.PORT|| 8081;
var path = require('path');
var __dirname = path.resolve();


const site =express();



// dotnv >> Guardar no banco os detalhes
require('dotenv').config();


//CONFIGURAÇÂO DOS MIDdLEWARES

site.use(express.urlencoded({ extended: true })); //Mandar o códico pelo express/ Leitura de Json 


site.use(express.static(path.join(__dirname, "/project")));//Colocar o css 


site.use(expressLayouts);

site.use(cookieParser('segurancaDoSitezin'));

site.use(session({
    secret:'SecretSession',
    saveUninitialized: true,
    resave:true
}));
site.use(flash());

site.use(fileUpload());



site.set('layout', "./layouts/principal.ejs");

site.set('view engine', 'ejs');


const rotas = require('./servidor/rotas/receberRotas.js');

site.use('/', rotas);






site.listen(porta, ()=>{

 console.log(`O apperson esta rodando no puerta ${porta}`);});
const mongoose  = require ('mongoose');
mongoose.connect(process.env.URL_SITE,{ useNewUrlParser:true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console,'erro na conexão:'));
db.once('open', function(){
 console.log('Funfando 100%')
});

//Modelos
 require('./Categoria');
 require('./Receitas');
const mongoose = require('mongoose');

const esquemaReceita = new mongoose.Schema({
nome: {
    type: String,
    required: " Campo Nome e obrigatorio! "
},
descricao: {
    type: String,
    required: " Campo Descrição e obrigatorio! "
},
email: {
    type: String,
    required: " Campo Email e obrigatorio! "
},
ingredientes: {
    type: Array,
    required: "Campo Ingredientes e obrigatorio! "
},
categoria: {
    type: String,
    enum: ['Nordeste','Sul','Sudeste','Norte','Centro-Oeste'],
    required: " Campo Categoria e obrigatorio! "
},
image: {
    type: String,
    required: "Campo Imagem e obrigatorio! "
}
});

esquemaReceita.index({nome: 'text', descricao: 'text'});

module.exports = mongoose.model('Receitas', esquemaReceita);




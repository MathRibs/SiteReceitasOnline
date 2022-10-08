const mongoose = require('mongoose');

const esquemaReceita = new mongoose.Schema({
nome: {
    type: String,
    required: " Este campo e obrigatorio! "
},
descricao: {
    type: String,
    required: " Este campo e obrigatorio! "
},
email: {
    type: String,
    required: " Este campo e obrigatorio! "
},
ingredientes: {
    type: Array,
    required: " Este campo e obrigatorio! "
},
categoria: {
    type: String,
    enum: ['Nordeste','Sul','Sudeste','Norte','Centro-Oeste'],
    required: " Este campo e obrigatorio! "
},
image: {
    type: String,
    required: " Este campo e obrigatorio! "
}
});

module.exports = mongoose.model('Receitas', esquemaReceita);
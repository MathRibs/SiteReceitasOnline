const mongoose = require('mongoose');

const esquemaCategoria = new mongoose.Schema({
nome: {
    type: String,
    required: true
},
imagem: {
    type: String,
    required: true
}
});

module.exports = mongoose.model('Categoria', esquemaCategoria);
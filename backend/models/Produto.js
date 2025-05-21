const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['peça', 'acessório'],
        required: true
    },
    quantidade: {
        type: Number,
        required: true,
        min: 0
    },
    quantidadeMinima: {
        type: Number,
        required: true,
        min: 0
    },
    valorCompra: {
        type: Number,
        required: true,
        min: 0
    },
    valorVenda: {
        type: Number,
        required: true,
        min: 0
    },
    descricao: {
        type: String
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    dataAtualizacao: {
        type: Date,
        default: Date.now
    }
});

// Método para verificar se o produto está com estoque baixo
produtoSchema.methods.estoqueBaixo = function() {
    return this.quantidade <= this.quantidadeMinima;
};

module.exports = mongoose.model('Produto', produtoSchema); 
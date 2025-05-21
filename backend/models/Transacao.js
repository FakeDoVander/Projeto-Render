const mongoose = require('mongoose');

const transacaoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['entrada', 'saida'],
        required: true
    },
    valor: {
        type: Number,
        required: true,
        min: 0
    },
    descricao: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    },
    os: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrdemServico'
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    }
});

// Índice para melhorar a performance das consultas por data
transacaoSchema.index({ data: -1 });

module.exports = mongoose.model('Transacao', transacaoSchema); 
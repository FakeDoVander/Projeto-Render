const mongoose = require('mongoose');

const ordemServicoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    cliente: {
        nome: {
            type: String,
            required: true
        },
        telefone: {
            type: String,
            required: true
        }
    },
    aparelho: {
        marca: {
            type: String,
            required: true
        },
        modelo: {
            type: String,
            required: true
        },
        cor: {
            type: String,
            required: true
        }
    },
    problema: {
        type: String,
        required: true
    },
    acessorios: [{
        type: String
    }],
    valor: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Recebido', 'Aguardando Peça', 'Em Reparo', 'Finalizado'],
        default: 'Recebido'
    },
    historico: [{
        data: {
            type: Date,
            default: Date.now
        },
        status: String,
        observacao: String
    }],
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    dataAtualizacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('OrdemServico', ordemServicoSchema); 
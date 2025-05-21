const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');

// Criar nova transação
router.post('/', financeiroController.criarTransacao);

// Listar todas as transações
router.get('/', financeiroController.listarTransacoes);

// Obter resumo financeiro
router.get('/resumo', financeiroController.obterResumo);

// Atualizar transação
router.put('/:id', financeiroController.atualizarTransacao);

// Deletar transação
router.delete('/:id', financeiroController.deletarTransacao);

module.exports = router; 
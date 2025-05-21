const express = require('express');
const router = express.Router();
const osController = require('../controllers/osController');

// Criar nova OS
router.post('/', osController.criarOS);

// Listar todas as OS
router.get('/', osController.listarOS);

// Buscar OS por código
router.get('/:codigo', osController.buscarOSPorCodigo);

// Atualizar status da OS
router.put('/:codigo/status', osController.atualizarStatus);

// Verificar acesso público
router.get('/public/:codigo/:senha', osController.verificarAcesso);

module.exports = router; 
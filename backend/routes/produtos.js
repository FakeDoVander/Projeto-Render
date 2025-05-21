const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Criar novo produto
router.post('/', produtoController.criarProduto);

// Listar todos os produtos
router.get('/', produtoController.listarProdutos);

// Buscar produto por ID
router.get('/:id', produtoController.buscarProduto);

// Atualizar produto
router.put('/:id', produtoController.atualizarProduto);

// Deletar produto
router.delete('/:id', produtoController.deletarProduto);

// Listar alertas de estoque
router.get('/alertas/estoque', produtoController.listarAlertasEstoque);

// Atualizar quantidade do produto
router.put('/:id/quantidade', produtoController.atualizarQuantidade);

module.exports = router; 
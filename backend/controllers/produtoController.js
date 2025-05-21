const Produto = require('../models/Produto');

// Criar novo produto
exports.criarProduto = async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find().sort({ nome: 1 });
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar produto por ID
exports.buscarProduto = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar produto
exports.atualizarProduto = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        Object.assign(produto, req.body);
        produto.dataAtualizacao = new Date();
        await produto.save();

        res.json(produto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Deletar produto
exports.deletarProduto = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        await produto.deleteOne();
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Listar produtos com estoque baixo
exports.listarAlertasEstoque = async (req, res) => {
    try {
        const produtos = await Produto.find();
        const alertas = produtos.filter(produto => produto.estoqueBaixo());
        res.json(alertas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar quantidade do produto
exports.atualizarQuantidade = async (req, res) => {
    try {
        const { quantidade } = req.body;
        const produto = await Produto.findById(req.params.id);
        
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        produto.quantidade = quantidade;
        produto.dataAtualizacao = new Date();
        await produto.save();

        res.json(produto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 
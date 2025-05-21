const OrdemServico = require('../models/OrdemServico');
const crypto = require('crypto');

// Gerar código único para OS
const gerarCodigoOS = () => {
    const data = new Date();
    const dataFormatada = `${data.getFullYear()}${String(data.getMonth() + 1).padStart(2, '0')}${String(data.getDate()).padStart(2, '0')}`;
    const numero = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `OS-${dataFormatada}-${numero}`;
};

// Gerar senha aleatória
const gerarSenha = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
};

// Criar nova OS
exports.criarOS = async (req, res) => {
    try {
        const os = new OrdemServico({
            ...req.body,
            codigo: gerarCodigoOS(),
            senha: gerarSenha()
        });
        await os.save();
        res.status(201).json(os);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Listar todas as OS
exports.listarOS = async (req, res) => {
    try {
        const os = await OrdemServico.find().sort({ dataCriacao: -1 });
        res.json(os);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar OS por código
exports.buscarOSPorCodigo = async (req, res) => {
    try {
        const os = await OrdemServico.findOne({ codigo: req.params.codigo });
        if (!os) {
            return res.status(404).json({ message: 'OS não encontrada' });
        }
        res.json(os);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar status da OS
exports.atualizarStatus = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { status, observacao } = req.body;

        const os = await OrdemServico.findOne({ codigo });
        if (!os) {
            return res.status(404).json({ message: 'OS não encontrada' });
        }

        os.status = status;
        os.historico.push({
            status,
            observacao
        });
        os.dataAtualizacao = new Date();

        await os.save();
        res.json(os);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Verificar acesso público
exports.verificarAcesso = async (req, res) => {
    try {
        const { codigo, senha } = req.params;
        const os = await OrdemServico.findOne({ codigo, senha });
        
        if (!os) {
            return res.status(401).json({ message: 'Código ou senha inválidos' });
        }
        
        res.json(os);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 
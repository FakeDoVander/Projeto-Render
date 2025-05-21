const Transacao = require('../models/Transacao');

// Criar nova transação
exports.criarTransacao = async (req, res) => {
    try {
        const transacao = new Transacao(req.body);
        await transacao.save();
        res.status(201).json(transacao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Listar todas as transações
exports.listarTransacoes = async (req, res) => {
    try {
        const { inicio, fim } = req.query;
        let query = {};

        if (inicio && fim) {
            query.data = {
                $gte: new Date(inicio),
                $lte: new Date(fim)
            };
        }

        const transacoes = await Transacao.find(query)
            .sort({ data: -1 })
            .populate('os', 'codigo')
            .populate('produto', 'nome');

        res.json(transacoes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter resumo financeiro
exports.obterResumo = async (req, res) => {
    try {
        const hoje = new Date();
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

        const [entradasMes, saidasMes, todasTransacoes] = await Promise.all([
            Transacao.aggregate([
                {
                    $match: {
                        tipo: 'entrada',
                        data: { $gte: inicioMes, $lte: fimMes }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$valor' }
                    }
                }
            ]),
            Transacao.aggregate([
                {
                    $match: {
                        tipo: 'saida',
                        data: { $gte: inicioMes, $lte: fimMes }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$valor' }
                    }
                }
            ]),
            Transacao.find()
        ]);

        const saldoAtual = todasTransacoes.reduce((acc, trans) => {
            return acc + (trans.tipo === 'entrada' ? trans.valor : -trans.valor);
        }, 0);

        res.json({
            entradasMes: entradasMes[0]?.total || 0,
            saidasMes: saidasMes[0]?.total || 0,
            saldoAtual
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar transação
exports.deletarTransacao = async (req, res) => {
    try {
        const transacao = await Transacao.findById(req.params.id);
        if (!transacao) {
            return res.status(404).json({ message: 'Transação não encontrada' });
        }

        await transacao.deleteOne();
        res.json({ message: 'Transação deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar transação
exports.atualizarTransacao = async (req, res) => {
    try {
        const transacao = await Transacao.findById(req.params.id);
        if (!transacao) {
            return res.status(404).json({ message: 'Transação não encontrada' });
        }

        Object.assign(transacao, req.body);
        await transacao.save();

        res.json(transacao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 
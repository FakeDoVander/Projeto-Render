// Função para formatar valores monetários
const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
};

// Função para atualizar os contadores de OS
const atualizarContadoresOS = async () => {
    try {
        const response = await fetch('/api/os');
        const ordens = await response.json();

        const emAndamento = ordens.filter(os => os.status === 'Em Reparo').length;
        const finalizadas = ordens.filter(os => os.status === 'Finalizado').length;
        const aguardando = ordens.filter(os => os.status === 'Aguardando Peça').length;

        document.getElementById('osAndamento').textContent = emAndamento;
        document.getElementById('osFinalizadas').textContent = finalizadas;
        document.getElementById('osAguardando').textContent = aguardando;
    } catch (error) {
        console.error('Erro ao buscar dados das OS:', error);
    }
};

// Função para atualizar o resumo financeiro
const atualizarResumoFinanceiro = async () => {
    try {
        const response = await fetch('/api/financeiro/resumo');
        const dados = await response.json();

        document.getElementById('entradasMes').textContent = formatarMoeda(dados.entradasMes);
        document.getElementById('saidasMes').textContent = formatarMoeda(dados.saidasMes);
        document.getElementById('saldoAtual').textContent = formatarMoeda(dados.saldoAtual);
    } catch (error) {
        console.error('Erro ao buscar dados financeiros:', error);
    }
};

// Função para atualizar alertas de estoque
const atualizarAlertasEstoque = async () => {
    try {
        const response = await fetch('/api/produtos/alertas');
        const alertas = await response.json();

        const tbody = document.querySelector('#tabelaAlertas tbody');
        tbody.innerHTML = '';

        alertas.forEach(alerta => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${alerta.nome}</td>
                <td class="px-6 py-4 whitespace-nowrap">${alerta.quantidade}</td>
                <td class="px-6 py-4 whitespace-nowrap">${alerta.minimo}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Baixo Estoque
                    </span>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao buscar alertas de estoque:', error);
    }
};

// Função para atualizar todos os dados do dashboard
const atualizarDashboard = () => {
    atualizarContadoresOS();
    atualizarResumoFinanceiro();
    atualizarAlertasEstoque();
};

// Atualizar dados iniciais
atualizarDashboard();

// Atualizar dados a cada 5 minutos
setInterval(atualizarDashboard, 300000); 
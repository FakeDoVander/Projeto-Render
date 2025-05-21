// Função para formatar data
const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Função para obter a classe CSS do status
const getStatusClass = (status) => {
    const classes = {
        'Recebido': 'bg-gray-100 text-gray-800',
        'Aguardando Peça': 'bg-yellow-100 text-yellow-800',
        'Em Reparo': 'bg-blue-100 text-blue-800',
        'Finalizado': 'bg-green-100 text-green-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
};

// Função para verificar acesso
const verificarAcesso = async (event) => {
    event.preventDefault();

    const codigo = document.getElementById('codigo').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch(`/api/os/public/${codigo}/${senha}`);
        
        if (!response.ok) {
            throw new Error('Código ou senha inválidos');
        }

        const os = await response.json();
        exibirOS(os);
    } catch (error) {
        console.error('Erro:', error);
        alert('Código ou senha inválidos');
    }
};

// Função para exibir os dados da OS
const exibirOS = (os) => {
    // Esconder formulário e mostrar informações
    document.getElementById('formAcesso').classList.add('hidden');
    document.getElementById('infoOS').classList.remove('hidden');

    // Preencher dados básicos
    document.getElementById('osCodigo').textContent = os.codigo;
    document.getElementById('osData').textContent = `Data de criação: ${formatarData(os.dataCriacao)}`;
    
    // Status
    const statusElement = document.getElementById('osStatus');
    statusElement.textContent = os.status;
    statusElement.className = `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(os.status)}`;

    // Dados do cliente
    document.getElementById('osCliente').textContent = os.cliente.nome;
    document.getElementById('osTelefone').textContent = os.cliente.telefone;

    // Dados do aparelho
    document.getElementById('osAparelho').textContent = `${os.aparelho.marca} ${os.aparelho.modelo}`;
    document.getElementById('osCor').textContent = os.aparelho.cor;

    // Problema
    document.getElementById('osProblema').textContent = os.problema;

    // Acessórios
    const acessoriosList = document.getElementById('osAcessorios');
    acessoriosList.innerHTML = '';
    if (os.acessorios && os.acessorios.length > 0) {
        os.acessorios.forEach(acessorio => {
            const li = document.createElement('li');
            li.textContent = acessorio;
            acessoriosList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Nenhum acessório entregue';
        acessoriosList.appendChild(li);
    }

    // Histórico
    const historicoElement = document.getElementById('osHistorico');
    historicoElement.innerHTML = '';
    if (os.historico && os.historico.length > 0) {
        os.historico.forEach(item => {
            const div = document.createElement('div');
            div.className = 'border-l-4 border-blue-500 pl-4';
            div.innerHTML = `
                <p class="text-sm font-medium text-gray-900">${item.status}</p>
                <p class="text-sm text-gray-500">${formatarData(item.data)}</p>
                ${item.observacao ? `<p class="mt-1 text-sm text-gray-600">${item.observacao}</p>` : ''}
            `;
            historicoElement.appendChild(div);
        });
    } else {
        const div = document.createElement('div');
        div.textContent = 'Nenhuma atualização registrada';
        historicoElement.appendChild(div);
    }
};

// Função para voltar ao formulário de acesso
const voltarAcesso = () => {
    document.getElementById('formAcesso').classList.remove('hidden');
    document.getElementById('infoOS').classList.add('hidden');
    document.getElementById('formAcesso').reset();
};

// Verificar se há código e senha na URL
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get('codigo');
    const senha = urlParams.get('senha');

    if (codigo && senha) {
        document.getElementById('codigo').value = codigo;
        document.getElementById('senha').value = senha;
        verificarAcesso(new Event('submit'));
    }
}); 
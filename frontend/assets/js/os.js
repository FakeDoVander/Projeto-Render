// Função para formatar data
const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
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

// Função para carregar a lista de OS
const carregarOS = async () => {
    try {
        const response = await fetch('/api/os');
        const ordens = await response.json();
        const tbody = document.getElementById('listaOS');
        tbody.innerHTML = '';

        ordens.forEach(os => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${os.codigo}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${os.cliente.nome}</div>
                    <div class="text-sm text-gray-500">${os.cliente.telefone}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${os.aparelho.marca} ${os.aparelho.modelo}</div>
                    <div class="text-sm text-gray-500">${os.aparelho.cor}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(os.status)}">
                        ${os.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${formatarData(os.dataCriacao)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="abrirModal('${os._id}')" class="text-blue-600 hover:text-blue-900 mr-3">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="copiarLink('${os.codigo}', '${os.senha}')" class="text-green-600 hover:text-green-900 mr-3">
                        <i class="fas fa-link"></i>
                    </button>
                    <button onclick="deletarOS('${os._id}')" class="text-red-600 hover:text-red-900">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar OS:', error);
        alert('Erro ao carregar as Ordens de Serviço');
    }
};

// Função para abrir o modal de atualização de status
const abrirModal = (osId) => {
    document.getElementById('osId').value = osId;
    document.getElementById('modalStatus').classList.remove('hidden');
};

// Função para fechar o modal
const fecharModal = () => {
    document.getElementById('modalStatus').classList.add('hidden');
    document.getElementById('formStatus').reset();
};

// Função para copiar o link da OS
const copiarLink = (codigo, senha) => {
    const link = `${window.location.origin}/os/${codigo}?senha=${senha}`;
    navigator.clipboard.writeText(link).then(() => {
        alert('Link copiado para a área de transferência!');
    }).catch(() => {
        alert('Erro ao copiar o link. Por favor, copie manualmente: ' + link);
    });
};

// Função para deletar uma OS
const deletarOS = async (osId) => {
    if (!confirm('Tem certeza que deseja excluir esta OS?')) {
        return;
    }

    try {
        const response = await fetch(`/api/os/${osId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar OS');
        }

        alert('OS deletada com sucesso!');
        carregarOS();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar OS');
    }
};

// Evento de submit do formulário de status
document.getElementById('formStatus').addEventListener('submit', async (e) => {
    e.preventDefault();

    const osId = document.getElementById('osId').value;
    const status = document.getElementById('novoStatus').value;
    const observacao = document.getElementById('observacao').value;

    try {
        const response = await fetch(`/api/os/${osId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status, observacao })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar status');
        }

        alert('Status atualizado com sucesso!');
        fecharModal();
        carregarOS();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar status');
    }
});

// Eventos de filtro
document.getElementById('busca').addEventListener('input', carregarOS);
document.getElementById('filtroStatus').addEventListener('change', carregarOS);
document.getElementById('dataInicial').addEventListener('change', carregarOS);
document.getElementById('dataFinal').addEventListener('change', carregarOS);

// Carregar OS ao iniciar a página
carregarOS(); 
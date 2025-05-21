document.getElementById('formOS').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coletar dados do formulário
    const formData = new FormData(e.target);
    const acessorios = Array.from(formData.getAll('acessorios'));

    const osData = {
        cliente: {
            nome: formData.get('nome'),
            telefone: formData.get('telefone')
        },
        aparelho: {
            marca: formData.get('marca'),
            modelo: formData.get('modelo'),
            cor: formData.get('cor')
        },
        problema: formData.get('problema'),
        acessorios: acessorios,
        valor: formData.get('valor') ? parseFloat(formData.get('valor')) : 0
    };

    try {
        const response = await fetch('/api/os', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(osData)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar OS');
        }

        const os = await response.json();

        // Exibir mensagem de sucesso com código e senha
        alert(`OS criada com sucesso!\n\nCódigo: ${os.codigo}\nSenha: ${os.senha}\n\nGuarde estas informações para acesso do cliente.`);
        
        // Redirecionar para a lista de OS
        window.location.href = 'os.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar OS. Por favor, tente novamente.');
    }
}); 
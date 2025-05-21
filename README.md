# Sistema de Assistência Técnica de Celulares

Sistema web completo para gerenciamento de assistência técnica de celulares, desenvolvido com Node.js, Express, MongoDB e TailwindCSS.

## 🚀 Funcionalidades

- Cadastro e gerenciamento de Ordens de Serviço (OS)
- Painel para clientes acompanharem o status da OS em tempo real
- Controle financeiro da loja (entradas, saídas e saldo)
- Gestão de estoque de produtos e acessórios
- Dashboard administrativo com indicadores importantes

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - TailwindCSS
  - JavaScript (Vanilla)
  - Font Awesome (ícones)

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB (v4.4 ou superior)
- NPM ou Yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://seu-repositorio/sistema-assistencia-tecnica.git
cd sistema-assistencia-tecnica
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Adicione as seguintes variáveis:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/assistencia-tecnica
JWT_SECRET=sua_chave_secreta_aqui
```

4. Inicie o servidor:
```bash
npm run dev
```

O sistema estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
/
├── frontend/
│   ├── index.html          # Dashboard
│   ├── os.html            # Gerenciar OS
│   ├── nova-os.html       # Nova OS
│   ├── os-cliente.html    # Acesso público da OS
│   ├── estoque.html       # Estoque
│   ├── financeiro.html    # Financeiro
│   └── assets/
│       ├── css/           # Estilos
│       └── js/            # Scripts
│
├── backend/
│   ├── server.js          # Servidor Express
│   ├── routes/            # Rotas da API
│   ├── controllers/       # Controladores
│   └── models/            # Modelos MongoDB
│
├── package.json
└── README.md
```

## 🔐 Acesso ao Sistema

### Área Administrativa
- URL: `http://localhost:3000`
- Acesso direto ao dashboard administrativo

### Área do Cliente
- URL: `http://localhost:3000/os/:codigo?senha=:senha`
- Acesso via código e senha da OS

## 📝 Uso

1. **Dashboard:**
   - Visualize indicadores importantes
   - Acesse rapidamente as principais funcionalidades

2. **Ordens de Serviço:**
   - Crie novas OS
   - Acompanhe o status
   - Atualize informações

3. **Estoque:**
   - Gerencie produtos
   - Controle quantidade
   - Receba alertas de estoque baixo

4. **Financeiro:**
   - Registre entradas e saídas
   - Acompanhe o saldo
   - Gere relatórios

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/) 
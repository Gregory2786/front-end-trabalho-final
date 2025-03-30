const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da raiz do projeto
app.use(express.static(path.join(__dirname)));

// Rotas para arquivos específicos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/pages/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'pages', `${page}.html`));
});

// API Routes (mantenha as rotas da API que já existiam)
let cardapio = [
    { id: 1, nome: 'Pizza Margherita', preco: 30.00 },
    { id: 2, nome: 'Hambúrguer Clássico', preco: 20.00 },
    { id: 3, nome: 'Salada Caesar', preco: 15.00 },
    { id: 4, nome: 'Sushi Sashimi', preco: 40.00 },
    { id: 5, nome: 'Lasanha à Bolonhesa', preco: 25.00 },
    { id: 6, nome: 'Sorvete de Chocolate', preco: 10.00 }
];

app.get('/api/cardapio', (req, res) => {
    res.json(cardapio);
});

// ... (mantenha o resto das rotas da API como estava antes)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
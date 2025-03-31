document.addEventListener('DOMContentLoaded', function() {
    const cardapioList = document.getElementById('cardapio-list');
    const pedidoForm = document.getElementById('pedido-form');
    const pedidosList = document.getElementById('pedidos-list');
    const itemSelect = document.getElementById('item');
    const estoqueForm = document.getElementById('estoque-form');
    const estoqueList = document.getElementById('estoque-list');
    const totalPedidos = document.getElementById('total-pedidos');
    const valorTotal = document.getElementById('valor-total');

    // Dados do cardápio (simulação)
    const cardapio = [
        { id: 1, nome: 'Pizza Margherita', descricao: 'Molho de tomate, mussarela, manjericão.', preco: 30.00, imagem: 'images/pizza-margherita.jpg' },
        { id: 2, nome: 'Hambúrguer Clássico', descricao: 'Pão, carne, queijo, alface, tomate.', preco: 20.00, imagem: 'images/hamburguer-classico.jpg' },
        { id: 3, nome: 'Salada Caesar', descricao: 'Alface, croutons, parmesão, molho Caesar.', preco: 15.00, imagem: 'images/salada-caesar.jpg' },
        { id: 4, nome: 'Sushi Sashimi', descricao: 'Peixe cru, arroz, algas.', preco: 40.00, imagem: 'images/sushi-sashimi.jpg' },
        { id: 5, nome: 'Lasanha à Bolonhesa', descricao: 'Massa, carne moída, molho de tomate, queijo.', preco: 25.00, imagem: 'images/lasanha-bolonhesa.jpg' },
        { id: 6, nome: 'Sorvete de Chocolate', descricao: 'Sorvete cremoso de chocolate.', preco: 10.00, imagem: 'images/sorvete-chocolate.jpg' }
    ];

    let pedidos = [];
    let total = 0;
    let estoque = [];

    // Carregar cardápio
    cardapio.forEach(item => {
        const itemCardapio = document.createElement('div');
        itemCardapio.className = 'cardapio-item';
        itemCardapio.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <p class="preco">R$ ${item.preco.toFixed(2)}</p>
        `;
        cardapioList.appendChild(itemCardapio);

        // Adicionar itens ao select do formulário de pedidos
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        itemSelect.appendChild(option);
    });

    // Adicionar pedido
    pedidoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const itemId = document.getElementById('item').value;
        const quantidade = document.getElementById('quantidade').value;

        const itemSelecionado = cardapio.find(item => item.id == itemId);

        if (itemSelecionado) {
            const pedidoItem = document.createElement('div');
            pedidoItem.className = 'pedido-item';
            pedidoItem.innerHTML = `
                <p>${itemSelecionado.nome} - Quantidade: ${quantidade}</p>
                <p>Total: R$ ${(itemSelecionado.preco * quantidade).toFixed(2)}</p>
            `;
            pedidosList.appendChild(pedidoItem);

            // Atualizar relatórios
            pedidos.push(itemSelecionado);
            total += itemSelecionado.preco * quantidade;
            atualizarRelatorios();
        }
    });

    // Adicionar item ao estoque
    estoqueForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const item = document.getElementById('item-estoque').value;
        const quantidade = document.getElementById('quantidade-estoque').value;

        const novoItem = { item, quantidade };
        estoque.push(novoItem);

        const itemEstoque = document.createElement('div');
        itemEstoque.className = 'estoque-item';
        itemEstoque.innerHTML = `
            <p>${item} - Quantidade: ${quantidade}</p>
        `;
        estoqueList.appendChild(itemEstoque);

        // Limpar o formulário
        estoqueForm.reset();
    });

    // Atualizar relatórios
    function atualizarRelatorios() {
        totalPedidos.textContent = pedidos.length;
        valorTotal.textContent = total.toFixed(2);
    }
});
let carrinho = [];

function adicionarAoCarrinho(tipo, id, nome, preco) {
    // Verifica se o item já foi adicionado ao carrinho
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        alert('Este item já está no carrinho!');
        return;
    }

    // Adiciona o novo item ao carrinho
    const novoItem = {
        tipo: tipo, // Pode ser "comida" ou "bebida"
        id: id,
        nome: nome,
        preco: preco
    };

    carrinho.push(novoItem);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    // Exibe os itens do carrinho
    const carrinhoElement = document.getElementById('carrinho');
    carrinhoElement.innerHTML = '';

    carrinho.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('carrinho-item');
        itemElement.innerHTML = `
            <p><strong>${item.nome}</strong></p>
            <p>Tipo: ${item.tipo}</p>
            <p>Preço: R$ ${item.preco}</p>
        `;
        carrinhoElement.appendChild(itemElement);
    });

    // Exibe a quantidade total de itens e o preço total
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarPedido() {
    // Obter o nome e mesa do cliente
    const nomePessoa = prompt("Digite seu nome:");
    const mesa = prompt("Digite o número da mesa:");

    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    // Enviar o pedido para a API
    fetch('https://seu-backend.com/api/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nomePessoa: nomePessoa,
            mesa: mesa,
            itens: carrinho.map(item => ({
                tipo: item.tipo,
                id: item.id
            }))
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido finalizado:', data);
        alert('Pedido realizado com sucesso!');
        carrinho = []; // Limpa o carrinho após o pedido
        atualizarCarrinho();
    })
    .catch(error => {
        console.error('Erro ao finalizar o pedido:', error);
        alert('Erro ao realizar o pedido!');
    });
}
async function carregarCardapio() {
    try {
        const responseComidas = await fetch('https://seu-backend.com/api/comidas');
        const comidas = await responseComidas.json();
        
        const responseBebidas = await fetch('https://seu-backend.com/api/bebidas');
        const bebidas = await responseBebidas.json();
        
        const comidasElement = document.getElementById('comidas');
        const bebidasElement = document.getElementById('bebidas');
        
        comidas.forEach(comida => {
            const comidaElement = document.createElement('div');
            comidaElement.classList.add('item');
            comidaElement.innerHTML = `
                <h3>${comida.name}</h3>
                <img src="${comida.img}" alt="${comida.name}" width="100">
                <p>Ingredientes: ${comida.ingredientes}</p>
                <p>Preço: R$ ${comida.price}</p>
                <button onclick="adicionarAoCarrinho('comida', '${comida._id}', '${comida.name}', ${comida.price})">Adicionar ao Carrinho</button>
            `;
            comidasElement.appendChild(comidaElement);
        });

        bebidas.forEach(bebida => {
            const bebidaElement = document.createElement('div');
            bebidaElement.classList.add('item');
            bebidaElement.innerHTML = `
                <h3>${bebida.name}</h3>
                <img src="${bebida.img}" alt="${bebida.name}" width="100">
                <p>Ingredientes: ${bebida.ingredientes}</p>
                <p>Preço: R$ ${bebida.price}</p>
                <button onclick="adicionarAoCarrinho('bebida', '${bebida._id}', '${bebida.name}', ${bebida.price})">Adicionar ao Carrinho</button>
            `;
            bebidasElement.appendChild(bebidaElement);
        });

    } catch (error) {
        console.error('Erro ao carregar o cardápio:', error);
    }
}

// Carrega o cardápio assim que a página carregar
window.onload = carregarCardapio;
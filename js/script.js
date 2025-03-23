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
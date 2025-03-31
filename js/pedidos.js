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
    fetch('...', {
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
        const responseComidas = await fetch('https://back-end-trabalho-final-mw9f.vercel.app/cardapio/api/comer');
        const comidas = await responseComidas.json();
        
        const responseBebidas = await fetch('https://back-end-trabalho-final-mw9f.vercel.app/cardapio/api/beber');
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
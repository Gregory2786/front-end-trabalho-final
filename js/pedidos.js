document.addEventListener("DOMContentLoaded", function() {
    // Elementos da interface
    const cardapioList = document.getElementById("cardapio-list");
    const listaPedido = document.getElementById("lista-pedido");
    const totalValue = document.getElementById("total-value");
    const finalizarPedidoBtn = document.getElementById("finalizar-pedido");
    const limparPedidoBtn = document.getElementById("limpar-pedido");
    const customerName = document.getElementById("customer-name");
    const customerTable = document.getElementById("customer-table");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const loadingOverlay = document.getElementById("loading-overlay");

    // Variáveis de estado
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let cardapioData = [];

    // Inicialização
    carregarCardapio();
    atualizarPedido();

    // Event Listeners
    finalizarPedidoBtn.addEventListener("click", finalizarPedido);
    limparPedidoBtn.addEventListener("click", limparPedido);
    searchBtn.addEventListener("click", filtrarCardapio);
    searchInput.addEventListener("keyup", function(e) {
        if (e.key === "Enter") filtrarCardapio();
    });

    // Funções
    async function carregarCardapio() {
        showLoading();
        try {
            const response = await fetch("http://localhost:3000/api/cardapio");
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            
            cardapioData = await response.json();
            exibirCardapio(cardapioData);
        } catch (error) {
            console.error("Erro ao carregar cardápio:", error);
            mostrarFeedback("Erro ao carregar cardápio", "error");
        } finally {
            hideLoading();
        }
    }

    function exibirCardapio(itens) {
        cardapioList.innerHTML = '';
        
        if (itens.length === 0) {
            cardapioList.innerHTML = '<li class="no-items">Nenhum item disponível</li>';
            return;
        }
        
        itens.forEach(item => {
            const li = document.createElement("li");
            li.className = "cardapio-item";
            li.innerHTML = `
                <div class="item-info">
                    <h3>${escapeHTML(item.nome)}</h3>
                    <p class="item-descricao">${item.descricao ? escapeHTML(item.descricao) : ''}</p>
                </div>
                <div class="item-actions">
                    <span class="item-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="add-to-cart" data-id="${item.id}">
                        <i class="fas fa-plus"></i> Adicionar
                    </button>
                </div>
            `;
            
            li.querySelector('.add-to-cart').addEventListener('click', () => {
                adicionarAoCarrinho(item);
            });
            
            cardapioList.appendChild(li);
        });
    }

    function filtrarCardapio() {
        const termo = searchInput.value.toLowerCase();
        const itensFiltrados = cardapioData.filter(item => 
            item.nome.toLowerCase().includes(termo) || 
            (item.descricao && item.descricao.toLowerCase().includes(termo))
        );
        exibirCardapio(itensFiltrados);
    }

    function adicionarAoCarrinho(item) {
        const itemExistente = carrinho.find(i => i.id === item.id);
        
        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                quantidade: 1
            });
        }
        
        salvarCarrinho();
        atualizarPedido();
        mostrarFeedback(`"${item.nome}" adicionado ao pedido!`, "success");
    }

    function atualizarPedido() {
        listaPedido.innerHTML = '';
        
        if (carrinho.length === 0) {
            listaPedido.innerHTML = '<li class="no-items">Nenhum item adicionado</li>';
            totalValue.textContent = "0,00";
            finalizarPedidoBtn.disabled = true;
            return;
        }
        
        let total = 0;
        
        carrinho.forEach(item => {
            const itemTotal = item.preco * item.quantidade;
            total += itemTotal;
            
            const li = document.createElement("li");
            li.className = "pedido-item";
            li.innerHTML = `
                <div class="item-info">
                    <span class="item-name">${item.quantidade}x ${escapeHTML(item.nome)}</span>
                    <span class="item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="item-actions">
                    <button class="decrease-item" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                    <span class="item-quantity">${item.quantidade}</span>
                    <button class="increase-item" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                    <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            li.querySelector('.decrease-item').addEventListener('click', () => alterarQuantidade(item.id, -1));
            li.querySelector('.increase-item').addEventListener('click', () => alterarQuantidade(item.id, 1));
            li.querySelector('.remove-item').addEventListener('click', () => removerItem(item.id));
            
            listaPedido.appendChild(li);
        });
        
        totalValue.textContent = total.toFixed(2).replace('.', ',');
        finalizarPedidoBtn.disabled = false;
    }

    function alterarQuantidade(itemId, change) {
        const item = carrinho.find(i => i.id === itemId);
        if (!item) return;
        
        item.quantidade += change;
        
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(i => i.id !== itemId);
        }
        
        salvarCarrinho();
        atualizarPedido();
    }

    function removerItem(itemId) {
        carrinho = carrinho.filter(i => i.id !== itemId);
        salvarCarrinho();
        atualizarPedido();
        mostrarFeedback("Item removido do pedido", "success");
    }

    function limparPedido() {
        if (carrinho.length === 0 || !confirm("Tem certeza que deseja limpar o pedido?")) return;
        
        carrinho = [];
        salvarCarrinho();
        atualizarPedido();
        mostrarFeedback("Pedido limpo com sucesso", "success");
    }

    async function finalizarPedido() {
        if (carrinho.length === 0) {
            mostrarFeedback("Adicione itens ao pedido antes de finalizar", "error");
            return;
        }
        
        if (!customerName.value || !customerTable.value) {
            mostrarFeedback("Preencha os dados do cliente", "error");
            return;
        }
        
        showLoading();
        
        try {
            const pedidoData = {
                cliente: customerName.value,
                mesa: customerTable.value,
                itens: carrinho,
                total: calcularTotal(),
                status: "Recebido",
                data: new Date().toISOString()
            };
            
            const response = await fetch("http://localhost:3000/api/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pedidoData)
            });
            
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            
            const resultado = await response.json();
            
            // Limpar após sucesso
            carrinho = [];
            salvarCarrinho();
            customerName.value = "";
            customerTable.value = "";
            atualizarPedido();
            
            mostrarFeedback("Pedido finalizado com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
            mostrarFeedback("Erro ao finalizar pedido", "error");
        } finally {
            hideLoading();
        }
    }

    function calcularTotal() {
        return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    }

    function salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function mostrarFeedback(mensagem, tipo = "success") {
        const feedback = document.createElement('div');
        feedback.className = `feedback-message ${tipo}`;
        feedback.innerHTML = `
            <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${mensagem}
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('fade-out');
            setTimeout(() => feedback.remove(), 500);
        }, 3000);
    }

    function showLoading() {
        loadingOverlay.style.display = "flex";
    }

    function hideLoading() {
        loadingOverlay.style.display = "none";
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag]));
    }
});
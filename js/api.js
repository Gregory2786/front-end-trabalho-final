document.addEventListener("DOMContentLoaded", function() {
    // Elementos da interface
    const cardapioList = document.getElementById("cardapio-list");
    const navLinks = document.querySelectorAll("nav ul li a");
    
    // Destacar link ativo
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
        
        link.addEventListener("click", function() {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Carregar cardápio
    carregarCardapio();

    async function carregarCardapio() {
        try {
            const response = await fetch("http://localhost:3000/api/cardapio");
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            const cardapio = await response.json();
            exibirCardapio(cardapio);
        } catch (error) {
            console.error("Erro ao carregar cardápio:", error);
            cardapioList.innerHTML = `<li class="error-message">Erro ao carregar o cardápio. Tente recarregar a página.</li>`;
        }
    }

    function exibirCardapio(itens) {
        if (!cardapioList) return;
        
        cardapioList.innerHTML = '';
        
        if (itens.length === 0) {
            cardapioList.innerHTML = '<li class="no-items">Nenhum item disponível no cardápio no momento.</li>';
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
                        🛒 Adicionar
                    </button>
                </div>
            `;
            
            // Adicionar evento ao botão
            li.querySelector('.add-to-cart').addEventListener('click', function() {
                adicionarAoCarrinho(item);
            });
            
            cardapioList.appendChild(li);
        });
    }

    function adicionarAoCarrinho(item) {
        // Recuperar carrinho existente ou criar um novo
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        // Verificar se o item já está no carrinho
        const itemExistente = carrinho.find(i => i.id === item.id);
        
        if (itemExistente) {
            // Incrementar quantidade se já existir
            itemExistente.quantidade += 1;
        } else {
            // Adicionar novo item ao carrinho
            carrinho.push({
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                quantidade: 1
            });
        }
        
        // Salvar no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        // Feedback visual
        mostrarFeedback(`"${item.nome}" adicionado ao carrinho!`);
        
        // Atualizar contador de itens no carrinho (se existir)
        atualizarContadorCarrinho();
    }

    function mostrarFeedback(mensagem) {
        // Criar elemento de feedback
        const feedback = document.createElement('div');
        feedback.className = 'feedback-message';
        feedback.textContent = mensagem;
        
        // Adicionar ao corpo do documento
        document.body.appendChild(feedback);
        
        // Remover após alguns segundos
        setTimeout(() => {
            feedback.classList.add('fade-out');
            setTimeout(() => feedback.remove(), 500);
        }, 3000);
    }

    function atualizarContadorCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        
        // Atualizar no link do pedido
        const pedidosLink = document.querySelector('a[href="pedidos.html"]');
        if (pedidosLink) {
            // Remover contador existente
            const contadorExistente = pedidosLink.querySelector('.cart-count');
            if (contadorExistente) contadorExistente.remove();
            
            if (totalItens > 0) {
                const contador = document.createElement('span');
                contador.className = 'cart-count';
                contador.textContent = totalItens;
                pedidosLink.appendChild(contador);
            }
        }
    }

    // Função utilitária para segurança
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

    // Atualizar contador ao carregar a página
    atualizarContadorCarrinho();
});
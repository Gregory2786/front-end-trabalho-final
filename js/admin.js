document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("admin-login-form");
    const loginSection = document.getElementById("login-section");
    const adminPanel = document.getElementById("admin-panel");
    const loginError = document.getElementById("login-error");

    // Login
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const user = document.getElementById("admin-user").value;
        const password = document.getElementById("admin-password").value;

        if (user === "admin" && password === "1234") { 
            loginSection.style.display = "none";
            adminPanel.style.display = "block";
            carregarDadosAdmin();
        } else {
            loginError.style.display = "block";
        }
    });

    // Carregar dados para o painel admin
    function carregarDadosAdmin() {
        // Carregar cardápio
        fetch("http://localhost:3000/api/cardapio")
            .then(response => response.json())
            .then(data => {
                const cardapioList = document.getElementById("admin-cardapio-list");
                if (cardapioList) {
                    cardapioList.innerHTML = '';
                    data.forEach(item => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                            ${item.nome} - R$ ${item.preco.toFixed(2)}
                            <button class="delete-item" data-id="${item.id}">Excluir</button>
                        `;
                        cardapioList.appendChild(li);
                        
                        // Adicionar evento para excluir item
                        li.querySelector('.delete-item').addEventListener('click', function() {
                            const itemId = this.getAttribute('data-id');
                            excluirItemCardapio(itemId);
                        });
                    });
                }
            });

        // Carregar pedidos
        fetch("http://localhost:3000/api/pedidos")
            .then(response => response.json())
            .then(data => {
                const pedidosList = document.getElementById("admin-pedidos-list");
                if (pedidosList) {
                    pedidosList.innerHTML = '';
                    data.forEach(pedido => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                            <strong>Pedido #${pedido.id}</strong><br>
                            Status: ${pedido.status}<br>
                            Total: R$ ${pedido.total.toFixed(2)}<br>
                            Data: ${new Date(pedido.data).toLocaleString()}
                            <select class="status-select" data-id="${pedido.id}">
                                <option value="Recebido" ${pedido.status === 'Recebido' ? 'selected' : ''}>Recebido</option>
                                <option value="Preparando" ${pedido.status === 'Preparando' ? 'selected' : ''}>Preparando</option>
                                <option value="Pronto" ${pedido.status === 'Pronto' ? 'selected' : ''}>Pronto</option>
                                <option value="Entregue" ${pedido.status === 'Entregue' ? 'selected' : ''}>Entregue</option>
                            </select>
                        `;
                        pedidosList.appendChild(li);
                        
                        // Adicionar evento para alterar status
                        li.querySelector('.status-select').addEventListener('change', function() {
                            const pedidoId = this.getAttribute('data-id');
                            const novoStatus = this.value;
                            atualizarStatusPedido(pedidoId, novoStatus);
                        });
                    });
                }
            });
    }

    // Formulário para adicionar item ao cardápio
    const formCardapio = document.querySelector("#gerenciar-cardapio form");
    if (formCardapio) {
        formCardapio.addEventListener("submit", function(event) {
            event.preventDefault();
            const nome = document.getElementById("item-nome").value;
            const preco = parseFloat(document.getElementById("item-preco").value);

            fetch("http://localhost:3000/api/cardapio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, preco })
            })
            .then(response => response.json())
            .then(data => {
                alert("Item adicionado ao cardápio com sucesso!");
                formCardapio.reset();
                carregarDadosAdmin();
            })
            .catch(error => {
                console.error("Erro ao adicionar item:", error);
                alert("Erro ao adicionar item. Tente novamente.");
            });
        });
    }

    // Funções auxiliares
    function excluirItemCardapio(id) {
        if (confirm("Tem certeza que deseja excluir este item do cardápio?")) {
            fetch(`http://localhost:3000/api/cardapio/${id}`, {
                method: "DELETE"
            })
            .then(() => {
                alert("Item excluído com sucesso!");
                carregarDadosAdmin();
            })
            .catch(error => {
                console.error("Erro ao excluir item:", error);
                alert("Erro ao excluir item. Tente novamente.");
            });
        }
    }

    function atualizarStatusPedido(id, status) {
        fetch(`http://localhost:3000/api/pedidos/${id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Status atualizado:", data);
        })
        .catch(error => {
            console.error("Erro ao atualizar status:", error);
            alert("Erro ao atualizar status. Tente novamente.");
        });
    }
});

function showSection(sectionId) {
    document.querySelectorAll(".admin-section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}
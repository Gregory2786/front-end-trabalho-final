document.addEventListener("DOMContentLoaded", function () {
    const cardapioList = document.getElementById("cardapio-list");
    const pedidosList = document.getElementById("pedidos-list");

    if (cardapioList) fetchCardapio();
    if (pedidosList) fetchPedidos();

    function fetchCardapio() {
        fetch("http://localhost:3000/api/cardapio")
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    let li = document.createElement("li");
                    li.innerHTML = `<strong>${item.nome}</strong> - R$ ${item.preco}`;
                    cardapioList.appendChild(li);
                });
            })
            .catch(error => console.error("Erro ao carregar cardápio:", error));
    }

    function fetchPedidos() {
        fetch("http://localhost:3000/api/pedidos")
            .then(response => response.json())
            .then(data => {
                data.forEach(pedido => {
                    let li = document.createElement("li");
                    li.innerHTML = `<strong>Pedido #${pedido.id}</strong> - Cliente: ${pedido.cliente}`;
                    pedidosList.appendChild(li);
                });
            })
            .catch(error => console.error("Erro ao carregar pedidos:", error));
    }
});

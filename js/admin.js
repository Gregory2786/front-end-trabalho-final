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
    
    async function loadPedidos() {
        try {
          // Fazendo a requisição para obter os pedidos
          const response = await fetch('');
          const pedidos = await response.json();
      
          const pedidoList = document.getElementById('pedido-list');
          pedidoList.innerHTML = ''; // Limpar a lista antes de adicionar novos pedidos
      
          pedidos.forEach(pedido => {
            const pedidoCard = document.createElement('div');
            pedidoCard.classList.add('pedido-card');
            
            pedidoCard.innerHTML = `
              <h3>Pedido de ${pedido.nomePessoa}</h3>
              <p><span class="pedido-info">Mesa:</span> ${pedido.mesa}</p>
              <p><span class="pedido-info">Comida:</span> ${pedido.comida.name}</p>
              <p><span class="pedido-info">Bebida:</span> ${pedido.bebida.name}</p>
            `;
            
            pedidoList.appendChild(pedidoCard);
          });
      
        } catch (error) {
          console.error('Erro ao carregar os pedidos:', error);
        }
      }
      
      // Carregar os pedidos quando a página for carregada
      loadPedidos();
      


});


// Função para alternar entre as abas
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.style.display = 'none'; // Oculta todas as abas
    });
  
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block'; // Exibe a aba selecionada
  
    // Adiciona e remove a classe active no botão de aba
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    
    const activeButton = Array.from(buttons).find(button => button.textContent.toLowerCase() === tabName);
    activeButton.classList.add('active');
  }
  
  // Função para carregar comidas e bebidas
  async function loadMenu() {
    try {
      // Fazendo a requisição para obter as comidas e bebidas
      const responseComida = await fetch('//emilhamg:76JN8gxAGf66rsZ0@cardapio.tjagvkp.mongodb.net/?retryWrites=true&w=majority&appName=cardapio/comer');
      const comidas = await responseComida.json();
      
      const responseBebida = await fetch('mongodb+srv://emilhamg:76JN8gxAGf66rsZ0@cardapio.tjagvkp.mongodb.net/?retryWrites=true&w=majority&appName=cardapio/beber');
      const bebidas = await responseBebida.json();
  
      // Preencher a lista de comidas
      const comidaList = document.getElementById('comida-list');
      comidas.forEach(comida => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${comida.img}" alt="${comida.name}">
          <h3>${comida.name}</h3>
          <p>${comida.ingredientes}</p>
          <p class="price">R$ ${comida.price}</p>
        `;
        comidaList.appendChild(card);
      });
  
      // Preencher a lista de bebidas
      const bebidaList = document.getElementById('bebida-list');
      bebidas.forEach(bebida => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${bebida.img}" alt="${bebida.name}">
          <h3>${bebida.name}</h3>
          <p>${bebida.ingredientes}</p>
          <p class="price">R$ ${bebida.price}</p>
        `;
        bebidaList.appendChild(card);
      });
  
      // Exibir a aba inicial
      showTab('comida');
  
    } catch (error) {
      console.error('Erro ao carregar o cardápio:', error);
    }
  }
  
  // Carregar o cardápio ao iniciar a página
  loadMenu();
  
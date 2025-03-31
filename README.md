# Documentação do Projeto Front-End - Trabalho Final

## Visão Geral
O projeto é um sistema front-end desenvolvido como trabalho final de disciplina por **Gregory Almeida Silva, Emilha de Souza e Gustavo Rodrigues de Oliveira**. Trata-se de uma aplicação web interativa e responsiva que se comunica com uma API back-end desenvolvida em **Node.js**.

## Estrutura do Projeto

```
front-end-trabalho-final
├── css/
│   ├── styles.css                # Arquivo principal de estilos
├── images/                       # Pasta de imagens
│   ├── restaurant.jpg            # Imagem de exemplo
├── js/                           # Pasta de scripts JavaScript
│   ├── admin.js                  # Lógica da área administrativa
│   ├── api.js                    # Comunicação com a API
│   ├── pedidos.js                # Gerenciamento de pedidos
│   ├── relatorios.js             # Geração de relatórios
│   ├── script.js                 # Lógica principal
├── node_modules/                 # Dependências do Node.js
├── pages/                        # Páginas HTML do sistema
│   ├── admin.html                # Página administrativa
│   ├── menu.html                 # Página do menu
│   ├── pedidos.html              # Página de pedidos
│   ├── relatorios.html           # Página de relatórios
│   ├── index.html                # Página inicial
├── LICENSE                       # Licença MIT
├── package-lock.json             # Versões exatas das dependências
├── package.json                  # Configuração do projeto Node.js
├── README.md                     # Documentação principal
├── server.js                     # Arquivo principal do servidor
```

## Funcionalidades Principais

### 📌 Área Administrativa (`admin.html`)
- Gerenciamento completo do sistema
- Acessível via `admin.js`

### 🛒 Sistema de Pedidos (`pedidos.html`)
- Interface para criação e acompanhamento de pedidos
- Lógica implementada em `pedidos.js`

### 📊 Relatórios (`relatorios.html`)
- Geração de relatórios e análises
- Implementado em `relatorios.js`

### 🍽️ Menu Interativo (`menu.html`)
- Exibição dos itens disponíveis

## Tecnologias Utilizadas

### 🔹 Front-end:
- HTML5
- CSS3
- JavaScript (ES6+)

### 🔹 Back-end:
- Node.js (API)

### 🔹 Ferramentas:
- **Git/GitHub** para controle de versão
- **Metodologia Mobile-First**
- **Componentização de código**

## 🚀 Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Gregory2786/front-end-trabalho-final.git
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor**:
   ```bash
   node server.js
   ```

4. **Acesse no navegador**:
   ```
   http://localhost:3000
   ```

## 🔥 Diferenciais da Implementação

✅ **Estrutura Modular**:
- Separação clara entre componentes
- Arquivos JavaScript específicos para cada funcionalidade

✅ **API Integrada**:
- Comunicação completa com o back-end via `api.js`

✅ **Sistema Completo**:
- Desde o front-end até a lógica do servidor
- Inclui áreas administrativas e de relatórios

## 📜 Licença
O projeto está sob licença **MIT**. Consulte o arquivo `LICENSE` para detalhes.

## 🔮 Possíveis Melhorias Futuras

📌 Implementação de autenticação de usuários  
📌 Adição de testes automatizados  
📌 Melhoria na responsividade para diferentes dispositivos  
📌 Implementação de cache para melhor performance  

---  
📌 *Esta documentação reflete a estrutura atual do projeto conforme mostrado na imagem, complementada com as informações do README.md original.*

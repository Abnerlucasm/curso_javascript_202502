// Array que vai armazenar os itens da lista
let listaCompras = [];
let proximoId = 1;

const inputItem = document.getElementById("item");
const listaUL = document.getElementById("lista"); // Recebe os itens da lista
const contador = document.getElementById("contador");
const botaoAdd = document.getElementById("add");

botaoAdd.addEventListener("click", adicionarItem);

// Adicionar item
function adicionarItem() {
  const nome = inputItem.value.trim();
  if (nome === "") {
    return;
  }

  const novoItem = {
    id: proximoId++, // Atribui um ID
    nome: nome,
    comprado: false // Inicia como não comprado
  };

  listaCompras.push(novoItem);
  inputItem.value = ""; // Limpa o input
  renderizarLista();
}

// Marcar ou desmarcar como comprado
function marcarComprado(id) {
  const item = listaCompras.find(i => i.id === id); // Procura item pelo Id
  if (item) {
    item.comprado = !item.comprado; // Inverte o valor
    renderizarLista();
  }
}

// Remover item
function removerItem(id) {
  listaCompras = listaCompras.filter(i => i.id !== id);
  renderizarLista();
}

// Renderizar lista
function renderizarLista() {
  listaUL.innerHTML = "";

  listaCompras.forEach(item => { // Percorre a lista
    const li = document.createElement("li"); // Cria uma <li>

    // Aqui vai criar o texto do item
    const nomeSpan = document.createElement("span");
    nomeSpan.textContent = item.nome;
    nomeSpan.style.textDecoration = item.comprado ? "line-through" : "none"; // Risca se o item foi comprado
    li.appendChild(nomeSpan);

    const btnMarcar = document.createElement("button");
    btnMarcar.textContent = item.comprado ? "Desmarcar" : "Comprado"; // Texto vai mudar entre riscado ou não, dependendo do status
    btnMarcar.style.marginLeft = "10px";
    btnMarcar.addEventListener("click", () => marcarComprado(item.id));
    li.appendChild(btnMarcar);

    const botaoRemove = document.createElement("button");
    botaoRemove.textContent = "Remover";
    botaoRemove.style.marginLeft = "5px";
    botaoRemove.addEventListener("click", () => removerItem(item.id)); // Remove o item
    li.appendChild(botaoRemove);

    listaUL.appendChild(li);
  });

  atualizarContador(); // Contador
}

// Atualiza o contador
function atualizarContador() {
  const total = listaCompras.length; // Total de itens na lista
  const comprados = listaCompras.filter(i => i.comprado).length; // Qnt de itens comprados
  contador.textContent = `${total} itens • ${comprados} comprados`;
}

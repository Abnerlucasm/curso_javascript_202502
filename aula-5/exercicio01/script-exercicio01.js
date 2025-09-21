// Array que vai armazenar os itens da lista
let listaCompras = [];
let proximoId = 1;

// Referências do DOM
const inputItem = document.getElementById("item");
const listaUL = document.getElementById("lista");
const contador = document.getElementById("contador");
const btnAdd = document.getElementById("add");

// Adicionar evento ao botão
btnAdd.addEventListener("click", adicionarItem);

// Função para adicionar item
function adicionarItem() {
  const nome = inputItem.value.trim();
  if (nome === "") {
    alert("Digite um item!");
    return;
  }

  const novoItem = {
    id: proximoId++,
    nome: nome,
    comprado: false
  };

  listaCompras.push(novoItem);
  inputItem.value = "";
  renderizarLista();
}

// Marcar/desmarcar como comprado
function marcarComprado(id) {
  const item = listaCompras.find(i => i.id === id);
  if (item) {
    item.comprado = !item.comprado;
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

  listaCompras.forEach(item => {
    const li = document.createElement("li");

    const nomeSpan = document.createElement("span");
    nomeSpan.textContent = item.nome;
    nomeSpan.style.textDecoration = item.comprado ? "line-through" : "none";
    li.appendChild(nomeSpan);

    const btnMarcar = document.createElement("button");
    btnMarcar.textContent = item.comprado ? "Desmarcar" : "Comprar";
    btnMarcar.style.marginLeft = "10px";
    btnMarcar.addEventListener("click", () => marcarComprado(item.id));
    li.appendChild(btnMarcar);

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.style.marginLeft = "5px";
    btnRemover.addEventListener("click", () => removerItem(item.id));
    li.appendChild(btnRemover);

    listaUL.appendChild(li);
  });

  atualizarContador();
}

// Atualiza o contador
function atualizarContador() {
  const total = listaCompras.length;
  const comprados = listaCompras.filter(i => i.comprado).length;
  contador.textContent = `${total} itens • ${comprados} comprados`;
}

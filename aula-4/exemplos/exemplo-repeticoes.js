let lista = [];

function renderizarLista() {
    const listaHtml = document.getElementById("lista");
    listaHtml.innerHTML = " ";

    lista.forEach((item)=>{
        const li = document.createElement("li");
        li.textContent = item;
        listaHtml.appendChild(li);
    })
}

function adicionaItem(){
    const item = document.getElementById("item").value;
    lista.push(item);
    renderizarLista();
}

function removerItem(){
    lista.pop();
    renderizarLista();
}
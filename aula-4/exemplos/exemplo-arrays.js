const lista = [];

function adicionaItem(){
    const item = document.getElementById("item").value;
    lista.push(` ${item}`);
    const listaHtml = document.getElementById("lista");
    listaHtml.innerText =  lista;
}

function removerItem(){
    lista.pop();
    const listaHtml = document.getElementById("lista");
    listaHtml.innerText = lista;
}
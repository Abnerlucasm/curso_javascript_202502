const valores = []

function carregaLista(valores){
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    valores.forEach((item) =>{
        const li = document.createElement("li");
        li.textContent = item
        lista.appendChild(li)
    })
}

function adicionarItem(){
    const item = document.getElementById("produto").value;
    valores.push(item);
    
    carregaLista(valores);
}

function removerItem(){
    valores.pop();

    carregaLista(valores);
}
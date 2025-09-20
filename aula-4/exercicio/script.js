// Exercício 1 — Lista de Compras

let lista = [];
let id = 1;

function renderizarLista() {
    const ul  = document.getElementById("lista");
    ul.innerHTML = "";
    lista.forEach(item => {
        const li = document.createElement("li");
        li.style.textDecoration = item.comprado ? "line-through" : "none";
        li.innerHTML = `
            ${item.nome}
            <button onclick="marcarComprado(${item.id})">${item.comprado ? 'Desmarcar' : 'Comprar'}</button>
            <button onclick="removerItem(${item.id})">Remover</button>
        `;
        ul.appendChild(li);
    });
    atualizarContador();
}
function atualizarContador() {
    const total = lista.length;
    const comprados = lista.filter(item => item.comprado).length;
    document.getElementById("contador").innerText = `Total: ${total} | Comprados: ${comprados}`;
}

document.getElementById('add').onclick = () => {
    const nome = document.getElementById('item').value.trim(); 
    if (nome) {
        lista.push({ id: id++, nome, comprado: false });
        document.getElementById('item').value = '';
        renderizarLista();
    }
};

window.marcarComprado = function(id) {
    const item = lista.find(i => i.id === id);
    if (item) {
        item.comprado = !item.comprado;
        renderizarLista();
    }
};
window.removerItem = function(id) {
    lista = lista.filter(i => i.id !== id);
    renderizarLista();
}

// Exercício 2 — Laboratorio de Arrays

document.getElementById('calc').onclick = () => {
    const nums = document.getElementById('nums').value
        .split(',')
        .map(n => parseFloat(n.trim()))
        .filter(n => !isNaN(n));
    if (nums.length === 0) {
        document.getElementById('out').innerText = "Por favor, insira números válidos.";
        return;
    }   
    const pares = nums.filter(n => n % 2 === 0);
    const quadrados = nums.map(n => n * n);
    const maior = Math.max(...nums);
    const menor = Math.min(...nums);

    document.getElementById('out').innerText =
        `Números: [${nums.join(', ')}]\n` +
        `Pares: [${pares.join(', ')}]\n` +
        `Quadrados: [${quadrados.join(', ')}]\n` +
        `Maior: ${maior}\n` +
        `Menor: ${menor}`;
};

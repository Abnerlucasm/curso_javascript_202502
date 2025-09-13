let listaCompras = [];
const inputItem = document.getElementById('item');
const btnAdd = document.getElementById('add');
const ulLista = document.getElementById('lista');
const contador = document.getElementById('contador');

function renderizarLista() {
    ulLista.innerHTML = '';
    listaCompras.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.nome + (item.comprado ? ' (Comprado)' : '');

        const btnComprando = document.createElement('button');
        btnComprando.textContent = 'Marcar como comprado';
        btnComprando.onclick = () => {
            item.comprado = true;
            renderizarLista();
        };

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => {
            listaCompras = listaCompras.filter((i) => i.id !== item.id);
            renderizarLista();
        };

        li.appendChild(btnComprando);
        li.appendChild(btnRemover);
        ulLista.appendChild(li);
    });
    const total = listaCompras.length;
    const comprados = listaCompras.filter(i => i.comprado).length;
    contador.textContent = `${total} itens (${comprados} comprados)`;
}

btnAdd.onclick = () => {
    const nome = inputItem.value.trim();
    if (nome) {
        listaCompras.push({ id: Date.now(), nome, comprado: false });
        inputItem.value = '';
        renderizarLista();
    }
};

renderizarLista();


document.getElementById('calc').onclick = calcularEstatisticas;

function calcularEstatisticas() {
    const input = document.getElementById('nums').value;
    const numeros = input.split(',')
        .map(n => parseFloat(n.trim()))
        .filter(n => !isNaN(n));        

    const pares = numeros.filter(n => n % 2 === 0);
    const quadrados = numeros.map(n => n * n);
    const maior = numeros.length ? Math.max(...numeros) : 'N/A';
    const menor = numeros.length ? Math.min(...numeros) : 'N/A';

    const saida = `
Array original: [${numeros.join(', ')}]
Pares: [${pares.join(', ')}]
Quadrados: [${quadrados.join(', ')}]
Maior: ${maior}
Menor: ${menor}
    `.trim();

    document.getElementById('out').textContent = saida;
}

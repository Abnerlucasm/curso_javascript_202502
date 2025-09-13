const lista = [];

document.getElementById('add').onclick = adicionarItem;

function adicionarItem() {
    const input = document.getElementById('item'); 
    const nome = input.value.trim(); 
    if (nome) {
        lista.push({ id: Date.now(), nome, comprado: false }); 
        input.value = '';
        atualizarLista();
    }
}

function atualizarLista() {
    const listaElement = document.getElementById('lista');
    listaElement.innerHTML = '';
    lista.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.nome + (item.comprado ? " (comprado)" : "");
        
        const btnComprar = document.createElement('button');
        btnComprar.textContent = item.comprado ? "Desmarcar" : "Comprar";
        btnComprar.onclick = () => {
            item.comprado = !item.comprado;
            atualizarLista();
        };

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => {
            lista.splice(index, 1);
            atualizarLista();
        };

        li.appendChild(btnComprar);
        li.appendChild(btnRemover);
        listaElement.appendChild(li);
    });

    const total = lista.length;
    const comprados = lista.filter(i => i.comprado).length;
    document.getElementById('contador').innerText = `${total} itens • ${comprados} comprados.`;
}

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

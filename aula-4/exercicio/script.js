let listaDeCompras = [];
let id =1;

const input = document.getElementById('item ');
const btnAdd = document.getElementById('adicionar');
const ul = document.getElementById('lista-de-compras');
const contador = document.getElementById('contador'); 

btnAdd.addEventListener('click', () =>{
    const nome = input.value.trim();
    if(nome){
        lista.push({id: id++, nome, comprado: false});
        input.value = '';
        render();
    } 
})

//renderizar lista
function render(){
    ul.innerHTML = '';
    lista.forEach(item =>{
        const li = document.createElement('li');
        li.style.textDecoration = item.comprado ? 'line-through' : '';
        li.textContent = item.nome + '';

        const btnCheck = document.createElement('button');
        btnCheck.textContent = item.comprado ? 'Desmarcar': 'Comprar';
        btnCheck.onClick = () => {
            item.comprado = !item.comprado;
            render();
        };
        li.appendChild(btnCheck);

        //botão remover
        const btnDel = document.createElement('button');
        btnDel.onClick = () => {
            lista = lista.filter(i => i.id !== item.id);
            render
        };
        li.appendChild(btnDel);

        ul.appendChild(li);

        //Atuliza contador 
        const total = lista.length
        const comprado = lista.filter(i => i.comprado).length
        contador.textContent = `${total} itens • ${comprados} comprados`;

        //Enter adiciona item
        iput.addEventListener('keydown', e =>{
            if(e.key === 'Enter') btnAdd.click();
        });

        //Inicializa
        render();
        
    
    })
}

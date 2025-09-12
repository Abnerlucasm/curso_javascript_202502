/* atividade 1 
let itens = []
let idAtual = 1

const lista = document.getElementById('lista')
const contador = document.getElementById('contador')

function addItem() {
  const input = document.getElementById('item').value

  itens.push({ id: idAtual++, nome: input, comprado: false })

  input.innerHTML = ''

  renderizar()
}

function marcarComprado(id) {
  const item = itens.find(i => i.id === id)
  if (item) {
    item.comprado = !item.comprado
    renderizar()
  }
}

function remover(id) {
  itens = itens.filter(i => i.id !== id)
  renderizar()
}

function renderizar() {
  lista.innerHTML = ''

  itens.forEach(item => {
    const li = document.createElement('li')
    if (item.comprado) li.style.textDecoration = 'line-through'

    const span = document.createElement('span')
    span.textContent = item.nome

    const btnComprado = document.createElement('button')
    btnComprado.textContent = item.comprado ? 'Desmarcar' : 'Comprado'
    btnComprado.onclick = () => marcarComprado(item.id)

    const btnRemover = document.createElement('button')
    btnRemover.textContent = 'Remover'
    btnRemover.onclick = () => remover(item.id)

    li.appendChild(span)
    li.appendChild(btnComprado)
    li.appendChild(btnRemover)
    lista.appendChild(li)
  })

  atualizarContador()
}

function atualizarContador() {
  const total = itens.length
  const comprados = itens.filter(i => i.comprado).length
  contador.textContent = `${total} itens • ${comprados} comprados`
}
  */
 
  const input = document.getElementById('nums');
  const out = document.getElementById('out');
  const calc = document.getElementById('calc')
  calc = calcular

  function calcular(){
    const numbers = input.value.split(',').map(n => +n).filter(n => !isNaN(n));

    const pares = numbers.filter(n => n % 2 === 0)
    const quadrados = numbers.map(n => n * n)
    const maior = Math.max(...numbers)
    const menor = Math.min(...numbers)

    out.innerHTML = `
      Números: ${numbers} 
      Pares: ${pares}
      Quadrados: ${quadrados}
      Maior: ${maior}
      Menor: ${menor}`
   }


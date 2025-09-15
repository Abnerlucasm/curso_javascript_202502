let valor = []


function addItem(){
    const item = document.getElementById('produto').value
    valor.push(item)

    const lista = document.getElementById('lista')
    lista.innerHTML = ''

    valor.forEach((item) => {
        const li = document.createElement('li')
        li.textContent = item
        lista.appendChild(li)
    })
}

function remove(){
    valor.pop()
    
    const lista = document.getElementById('lista')
    lista.innerHTML = valor
}

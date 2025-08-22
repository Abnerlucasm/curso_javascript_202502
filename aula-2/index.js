function mudaCor(){
    const elemento = document.getElementById('title')
    elemento.style.color = 'red'

    const input = document.getElementById('text')
    console.log('meu nome é : ' , input.value)
    elemento.innerText = `meu nome é : ${input.value}`

}


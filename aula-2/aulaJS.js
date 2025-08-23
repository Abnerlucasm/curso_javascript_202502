function MudaCor(){
    const elemento = document.getElementById('titulo')

    elemento.style.color = 'red'
    
    const input = document.getElementById('texto')
    console.log("Meu nome é: ",input.value);
    elemento.innerText = "Meu nome é: "+ input.value
}
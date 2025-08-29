



function Soma(){
    const number1 = document.getElementById('valor1').value;
    const number2 = document.getElementById('valor2').value;
    const soma = parseFloat(number1)+parseFloat(number2);

    console.log(soma);
    
}


function MudaCor(){
    const elemento = document.getElementById('titulo')
    elemento.style.color = 'red'
    const input = document.getElementById('texto')
    console.log("Meu nome é: ", input.value);
    elemento.innerText = `Meu nome é: ${input.value} `;
}


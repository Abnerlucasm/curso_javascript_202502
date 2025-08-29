function soma(numero1 , numero2){
    const soma = (numero1 + numero2)
    return soma
}

function somaHTML(){
    const valor1 = document.getElementById('valor1').value
    const valor2 = document.getElementById('valor2').value

    const numero1 = parseFloat(valor1)
    const numero2 = parseFloat(valor2)

    const numeroSoma = soma(numero1, numero2)
    console.log(numeroSoma)
}
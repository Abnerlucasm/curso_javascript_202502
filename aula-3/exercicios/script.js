function calculadora(){
    const input1 = document.getElementById("valor1")
    const input2 = document.getElementById("valor2")
    const operacao = document.getElementById("operacao")
    const resultado = document.getElementById("resultado1")

    const valor1 = parseFloat(input1.value)
    const valor2 = parseFloat(input2.value)

    switch (operacao.value){
        case "soma":
        resultado.innerText = `Resultado: ${valor1 + valor2}`
        break
        case "substracao":
            resultado.innerText = `Resultado: ${valor1 - valor2}`
            break
        case "multiplicacao":
            resultado.innerText = `Resultado: ${valor1 * valor2}`
            break
        case "divisao":
            resultado.innerText = `Resultado: ${valor1 / valor2}`
            break
    }
}

const verificaPalindromo = () => {
    const input = document.getElementById("palavra").value.trim().toLowerCase();
    const resultado = document.getElementById("resultado2")

    const reverso = input.split("").reverse().join("")

    if (input === reverso){
        resultado.innerText = `Resultado: ${input} é um palíndromo !`
        resultado.style.color = "green"
    }
    else{
        resultado.innerText = `Resultado: ${input} não é um palíndromo !`
        resultado.style.color = "red"
    }
}

function verificaNota(){
    const input1 = document.getElementById("nota1")
    const input2 = document.getElementById("nota2")
    const input3 = document.getElementById("nota3")
    const resultado = document.getElementById("resultado3")

    const nota1 = parseFloat(input1.value)
    const nota2 = parseFloat(input2.value)
    const nota3 = parseFloat(input3.value)

    let media = (nota1 + nota2 + nota3) / 3 

    switch (true){
        case (media >= 9):
            resultado.innerText = `Resultado: Aprovado com Excelência`
            break 
        case (media >= 6):
            resultado.innerText = `Resultado: Aprovado`
            break
        case (media >= 4):
            resultado.innerText = `Resultado: Recuperação`
            break
        case (media < 4):
            resultado.innerText = `Resultado: Reprovado`
            break
        default:
            resultado.innerText = `Resultado: valor invalido`
            break
    }
}
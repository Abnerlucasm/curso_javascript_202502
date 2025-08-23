 let contador = 0
 let corHello = true

// Soma dois números e devolve o resultado
function somar(){
    const num1 = parseFloat(document.getElementById("valor1").value)
    const num2 = parseFloat(document.getElementById("valor2").value)

    const somarNum = num1 + num2

    document.getElementById("resultado1").innerText = "Resultado: " + somarNum
}

// Incrimenta +1 a cada clique no botão
function crescente(){
    contador++
   const aumentaNum = document.getElementById("aumentaNum") 
    aumentaNum.innerText = contador
}

// Verificar se o numero é impar ou par
function parImpar(){
    const numero = parseInt(document.getElementById("valor3").value)

    if(numero % 2 == 0 ){
        document.getElementById("resposta").innerText = numero + " é par"
    } else {
        document.getElementById("resposta").innerText = numero + " é impar"
    }
}

// Mudar cor do Hello World 
function printHello(){
    const print = document.getElementById("HelloWorld")

    if(print.innerText === "") {
        print.innerText = "Hello World"
        print.style.color = "blue"
        corHello = false
    } else {
        if(corHello){
            print.style.color = "blue"
            corHello = false
        } else {
            print.style.color = "red"
            corHello = true
        }
    }
}


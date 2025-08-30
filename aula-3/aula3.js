function operacao(){
    let valor1 = parseFloat(document.getElementById("valor1").value);
    let valor2 = parseFloat(document.getElementById("valor2").value );
    let operacao = document.getElementById("operacao").value;
    let resultado;

    if (operacao === "soma") {
        resultado = valor1 + valor2;
    } else if (operacao === "subtracao") {
        resultado = valor1 - valor2;
    } else if (operacao === "multiplicacao") {
        resultado = valor1 * valor2;
    } else if (operacao === "divisao") {
        if (valor2 !== 0) {
            resultado = valor1 / valor2;
        } else {
            alert("Erro: Divisão por zero não é permitida.");
            return;
        }   
    }
    
    document.getElementById("resultado1").innerText = "Resultado: " + resultado;
   
}


const palavra = () => {
    let palavra = document.getElementById("palavra").value.toLowerCase().replace(/\s/g, "");
    let resultado2 = document.getElementById("resultado2");
    let palavraInvertida = palavra.split('').reverse().join('');
    if (palavra === palavraInvertida) {
        resultado2.innerText = "É um palíndromo";
        resultado2.style.color = "green";
    } else {
        resultado2.innerText = "Não é um palíndromo";
        resultado2.style.color = "red";
    }
    console.log(palavraInvertida);
}

    function media() {
    let nota1 = parseFloat(document.getElementById("nota1").value);
    let nota2 = parseFloat(document.getElementById("nota2").value);
    let nota3 = parseFloat(document.getElementById("nota3").value);
    let resultado3 = document.getElementById("resultado3");
    let media = (nota1 + nota2 + nota3) / 3;
    if (media >= 9) {
        console.log("Aprovado com excelência");

     
    
    }else if (media > 6 && media < 9) {
        console.log("Aprovado");
    }else if (media < 6 && media > 3){
        console.log("Recuperação");
    }else if (media < 4)
        console.log("Reprovado");
        {
    resultado3.innerText = "Média: " + media.toFixed(2);
        }
            
        


}

function OperadorTernario() {
    let valor3 = parseFloat(document.getElementById('valor3').value);
    let resultado = (valor3 % 2 == 0) ? valor3 + (valor3/2) : valor3  * valor3 * valor3;
    console.log("Resultado:", resultado);
    alert("Resultado: " + resultado);
    document.getElementById('resultado4').innerText = "Resultado: " + resultado;
}
        
    



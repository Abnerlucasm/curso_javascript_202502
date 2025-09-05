function exercicio_1() {
    const v1 = parseFloat(document.getElementById("valor1").value);
    const v2 = parseFloat(document.getElementById("valor2").value);
    const op = document.getElementById("operacao").value;
    let resultado;

    if (isNaN(v1) || isNaN(v2)) {
        resultado = "Digite valores válidos!";
    } else {
        switch (op) {
            case "soma":
                resultado = v1 + v2;
                break;
            case "substracao":
                resultado = v1 - v2;
                break;
            case "multiplicacao":
                resultado = v1 * v2;
                break;
            case "divisao":
                resultado = v2 !== 0 ? (v1 / v2) : "Divisão por zero não permitida!";
                break;
        }
    }
    document.getElementById("resultado1").innerText = "Resultado: " + resultado;
}

const exercicio_2 = () => {
    const palavra = document.getElementById("palavra").value.trim();
    const resultado2 = document.getElementById("resultado2");

    if (palavra === "") {
        resultado2.innerText = "Digite uma palavra!";
        resultado2.style.color = "black";
        return;
    }

    const reverso = palavra.split("").reverse().join("");
    if (palavra.toLowerCase() === reverso.toLowerCase()) {
        resultado2.innerText = `"${palavra}" é um palíndromo `;
        resultado2.style.color = "green";
    } else {
        resultado2.innerText = `"${palavra}" não é um palíndromo `;
        resultado2.style.color = "red";
    }
};

function exercicio_3() {
    const n1 = parseFloat(document.getElementById("nota1").value);
    const n2 = parseFloat(document.getElementById("nota2").value);
    const n3 = parseFloat(document.getElementById("nota3").value);
    const resultado3 = document.getElementById("resultado3");

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        resultado3.innerText = "Digite todas as notas!";
        return;
    }

    const media = (n1 + n2 + n3) / 3;
    let status;

    if (media > 9) {
        status = "Aprovado com Excelência";
    } else if (media >= 6) {
        status = "Aprovado";
    } else if (media >= 4) {
        status = "Recuperação";
    } else {
        status = "Reprovado";
    }

    resultado3.innerText = `Média: ${media.toFixed(2)} - ${status}`;
}

function exercicio_4() {
    const v3 = parseInt(document.getElementById("valor3").value);
    const resultado4 = document.getElementById("resultado4");

    if (isNaN(v3)) {
        resultado4.innerText = "Digite um número!";
        return;
    }

    const resultado = (v3 % 2 === 0) 
        ? v3 + (v3 / 2) 
        : Math.pow(v3, 3);

    resultado4.innerText = `Resultado: ${resultado}`;
}
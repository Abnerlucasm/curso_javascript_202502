
    function somaNumeros(){
        const valor1 = document.getElementById("valor1").value;
        const valor2 = document.getElementById("valor2").value;

        const soma = parseFloat(valor1) + parseFloat(valor2)

            const info = `Resultado: ${soma}`;
            document.getElementById('info').innerHTML = info;
    }

    let numero = 0;
    function valorCrescente(){
        const infoCrecente = `Resultado: ${numero}`;
        document.getElementById('infoCrecente').innerHTML = infoCrecente;
        numero = numero +1;
    }

    function parOuImpar(){
        const valor = document.getElementById("valor3").value;
        if(parseFloat(valor)%2 == 0){
            document.getElementById('infoParImpar').innerHTML = "É par!";
        }else{
            document.getElementById('infoParImpar').innerHTML = "É impar!";
        }
    }

    let controle = false;
    function HelloWorld(){
        const h1 = document.getElementById("HelloWorld");
        h1.innerText = "Hello World!" 
        if(controle){
            h1.style.color = "red";
            controle = false;
        }else{
            h1.style.color = "blue";
            controle = true;
        }
    }
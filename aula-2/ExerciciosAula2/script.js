 // Questão 1 - soma
            function somar() {
                const v1 = parseFloat(document.getElementById('valor1').value);
                const v2 = parseFloat(document.getElementById('valor2').value);
                const a = isNaN(v1) ? 0 : v1;
                const b = isNaN(v2) ? 0 : v2;
                const total = a + b;
                document.getElementById('resultadoSoma').textContent = 'Resultado: ' + total;
                alert('Resultado: ' + total);
            }

            // Questão 2 - contador visível e no console
            let contador = 0;
            function incrementar() {
                contador++;
                document.getElementById('contadorDisplay').textContent = contador;
                console.log(contador);
            }

            // Questão 3 - par ou ímpar
        	function parOuImpar() {
                const raw = document.getElementById('valor3').value;
                const v = parseInt(raw, 10);
                if (isNaN(v)) {
                    document.getElementById('resultadoParImpar').textContent = 'Informe um número válido.';
                    alert('Informe um número válido em "Número 3"');
                    return;
                }
                const texto = v % 2 === 0 ? 'Par' : 'Ímpar';
                document.getElementById('resultadoParImpar').textContent = texto;
                console.log(texto);
            }

            // Desafio - Hello World com alternância de cores
            const helloColors = ['blue', 'green']; // ajuste cores aqui
            let currentColorIndex = -1; // -1 indica ainda não clicado
            function toggleHello() {
                const el = document.getElementById('HelloWorld');
                if (!el) return;
                if (currentColorIndex === -1) {
                    // primeira vez: escreve e aplica primeira cor
                    el.textContent = 'Hello World';
                    currentColorIndex = 0;
                } else {
                    // alterna cor a cada clique
                    currentColorIndex = 1 - currentColorIndex;
                }
                el.style.color = helloColors[currentColorIndex];
            }
       
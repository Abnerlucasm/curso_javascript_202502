function pegaNomeJogador() {
    const inputNome = document.getElementById('input-nome');
    const nomeJogador = inputNome.value;

    console.log("Nome do Jogador:", nomeJogador);

    inputNome.value = "";

    buscarPerguntas(5);
}

async function buscarPerguntas(numeroDePerguntas) {

    const url = `https://cors-anywhere.herokuapp.com/http://187.102.36.3:8091/api/perguntas/${numeroDePerguntas}`;

    console.log(`Buscando ${numeroDePerguntas} perguntas da API...`);

    const quizContainer = document.getElementById('quiz-container');

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        const listaDePerguntas = data.perguntas;

        console.log("Perguntas recebidas com sucesso:", listaDePerguntas);
        console.log("Status da API:", data.status);

        if (listaDePerguntas.length > 0) {
            console.log("Exemplo (Primeira Pergunta):", listaDePerguntas[0].pergunta);
            console.log("Opções:", listaDePerguntas[0].opcoes);
        }

        quizContainer.innerHTML = '';

        listaDePerguntas.forEach(pergunta => {

            const blocoPergunta = document.createElement('div');

            const textoPergunta = document.createElement('h3');
            textoPergunta.textContent = pergunta.pergunta;

            const listaOpcoes = document.createElement('ul');

            pergunta.opcoes.forEach(opcao => {
                const itemOpcao = document.createElement('li');
                itemOpcao.textContent = `${opcao.id}) ${opcao.texto}`;

                listaOpcoes.appendChild(itemOpcao);
            });

            blocoPergunta.appendChild(textoPergunta);
            blocoPergunta.appendChild(listaOpcoes);

            quizContainer.appendChild(blocoPergunta);
        });

    } catch (error) {
        console.error("Falha ao buscar perguntas:", error);

        if (quizContainer) {
            quizContainer.innerHTML = `<p style="color: red;"><b>Falha ao carregar perguntas.</b><br>Verifique o console (F12) e lembre-se de ATIVAR sua extensão de CORS no navegador para continuar.</p>`;
        }

        alert("Não foi possível carregar as perguntas. Verifique o console para mais detalhes.");
    }
}
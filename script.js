document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores do DOM ---
    const divNomeJogador = document.getElementById('divNomeJogador');
    const inputNomeJogador = document.getElementById('inputNomeJogador');
    const botaoIniciar = document.getElementById('botaoIniciar');

    const divQuiz = document.getElementById('divQuiz');
    const containerPergunta = document.getElementById('containerPergunta');
    const containerRespostas = document.getElementById('containerRespostas');
    const botaoProxima = document.getElementById('botaoProxima');
    const displayPontuacao = document.getElementById('displayPontuacao');

    const listaLeaderboard = document.getElementById('listaLeaderboard');

    // --- Configurações ---
    const TOTAL_PERGUNTAS = 5;
    let jogador = '';
    let perguntas = [];
    let perguntaAtual = 0;
    let pontuacao = 0;
    let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];

    // --- Eventos ---
    botaoIniciar.addEventListener('click', iniciarQuiz);
    botaoProxima.addEventListener('click', proximaPergunta);

    // --- Funções ---
    async function iniciarQuiz() {
        jogador = inputNomeJogador.value.trim();
        if (!jogador) return alert('Digite seu nome!');

        divNomeJogador.classList.add('oculto');
        divQuiz.classList.remove('oculto');

        perguntaAtual = 0;
        pontuacao = 0;
        displayPontuacao.textContent = '';

        try {
            // Buscar perguntas da API pública do OpenTDB
            const res = await fetch(`https://opentdb.com/api.php?amount=${TOTAL_PERGUNTAS}&type=multiple`);
            const data = await res.json();

            perguntas = data.results.map(q => {
                const opcoes = [...q.incorrect_answers, q.correct_answer];
                return {
                    pergunta: decodeHTML(q.question),
                    alternativas: opcoes.sort(() => Math.random() - 0.5).map(a => decodeHTML(a)),
                    respostaCorreta: decodeHTML(q.correct_answer)
                };
            });

            renderizarPergunta();

        } catch (erro) {
            console.error("Erro ao carregar perguntas:", erro);
            containerPergunta.textContent = "Erro ao carregar perguntas. Tente novamente.";
        }
    }

    function renderizarPergunta() {
        if (perguntaAtual >= perguntas.length) {
            finalizarQuiz();
            return;
        }

        const p = perguntas[perguntaAtual];
        containerPergunta.textContent = p.pergunta;
        containerRespostas.innerHTML = '';

        p.alternativas.forEach((alt) => {
            const botao = document.createElement('button');
            botao.textContent = alt;
            botao.className = 'botaoResposta';
            botao.onclick = () => selecionarResposta(alt);
            containerRespostas.appendChild(botao);
        });

        botaoProxima.classList.add('oculto');
    }

    function selecionarResposta(indiceSelecionado) {
        const p = perguntas[perguntaAtual];
        const botoes = document.querySelectorAll('.botaoResposta');

        botoes.forEach((b) => {
            b.disabled = true;
            if (b.textContent === p.respostaCorreta) b.classList.add('correta');
            if (b.textContent === indiceSelecionado && indiceSelecionado !== p.respostaCorreta) b.classList.add('errada');
        });

        if (indiceSelecionado === p.respostaCorreta) pontuacao++;

        displayPontuacao.textContent = `Pontuação: ${pontuacao} / ${perguntaAtual + 1}`;
        botaoProxima.classList.remove('oculto');
    }

    function proximaPergunta() {
        perguntaAtual++;
        renderizarPergunta();
    }

    function finalizarQuiz() {
        alert(`Quiz finalizado! Pontuação: ${pontuacao} / ${TOTAL_PERGUNTAS}`);
        leaderboard.push({ name: jogador, score: pontuacao });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10); // Top 10
        localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
        renderizarLeaderboard();

        divQuiz.classList.add('oculto');
        divNomeJogador.classList.remove('oculto');
        inputNomeJogador.value = '';
    }

    function renderizarLeaderboard() {
        listaLeaderboard.innerHTML = '';
        if (leaderboard.length === 0) {
            listaLeaderboard.innerHTML = '<li>Nenhuma pontuação registrada ainda.</li>';
            return;
        }

        leaderboard.forEach((entry, idx) => {
            const li = document.createElement('li');
            li.textContent = `${idx + 1}. ${entry.name} - ${entry.score} pts`;
            listaLeaderboard.appendChild(li);
        });
    }

    function decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    renderizarLeaderboard();
});

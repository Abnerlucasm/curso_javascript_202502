let currentPlayer = '';
let score = 0;
let errors = 0;
let leaderboard = [];

async function startQuiz() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://187.102.36.3:8091/api/perguntas';

    currentPlayer = document.getElementById('playerName').value.trim();

    if (!currentPlayer) return alert('Digite seu nome!');

    score = 0;
    errors = 0;

    const response = await fetch(proxy + url);
    const data = await response.json();
    const perguntas = data.perguntas;

    const container = document.getElementById('quizContainer');
    container.innerHTML = '';

    perguntas.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
        <p><strong>${index + 1}. ${q.pergunta}</strong></p>
        ${q.opcoes.map(opt => `
        <button onclick="checkAnswer('${q.id}', '${opt.id}', this)">
            ${opt.texto}
        </button>
        `).join('')}
    `;
    container.appendChild(div);
    });
}


let currentPlayer = '';
let score = 0;
let errors = 0;
let leaderboard = [];

async function startQuiz() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://187.102.36.3:8091/api/perguntas/5';

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

async function checkAnswer(perguntaId, respostaSelecionada, btn) {
  const buttons = btn.parentElement.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);

  try {
    console.log('Verificando resposta para pergunta ID:', perguntaId);
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `http://187.102.36.3:8091/api/respostas/${perguntaId}`;

    const response = await fetch(proxy + url);

    const data = await response.json();
    const respostaCorreta = data.respostas;

    if (respostaSelecionada === respostaCorreta) {
      score++;
      btn.style.backgroundColor = 'green';
    } else {
      errors++;
      btn.style.backgroundColor = 'red';
    }

    updateScore();
  } catch (error) {
    console.error('Erro ao buscar resposta correta:', error);
    btn.style.backgroundColor = 'gray';
  }
}

function updateScore() {
  document.getElementById('scoreBoard').innerHTML = `
    <p>Acertos: ${score} | Erros: ${errors}</p>
  `;

  if (score + errors === 5) {
    leaderboard.push({ name: currentPlayer, score });
    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    renderLeaderboard();
  }
}

function renderLeaderboard() {
  const list = document.getElementById('leaderboard');
  list.innerHTML = '';

  leaderboard.forEach((player, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${player.name}: ${player.score} pts`;

    if (index === 0) li.style.color = 'gold';
    else if (index === 1) li.style.color = 'silver';
    else if (index === 2) li.style.color = 'bronze';

    list.appendChild(li);
  });
}

function clearLeaderboard() {
  localStorage.removeItem('leaderboard');
  leaderboard = [];
  renderLeaderboard();
}

window.onload = () => {
  const saved = localStorage.getItem('leaderboard');
  if (saved) {
    leaderboard = JSON.parse(saved);
    renderLeaderboard();
  }
};

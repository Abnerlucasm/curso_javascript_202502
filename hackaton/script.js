document.addEventListener('DOMContentLoaded', () => {
    let QUESTIONS = [];
    let playerName = '';
    let index = 0;
    let answers = [];
  
    // --- Elementos da DOM
    const screenName = document.getElementById('screen-name');
    const screenQuiz = document.getElementById('screen-quiz');
    const screenResult = document.getElementById('screen-result');
    const btnStart = document.getElementById('btn-start');
    const nameInput = document.getElementById('player-name');
    const showName = document.getElementById('show-name');
    const questionArea = document.getElementById('question-area');
    const currentEl = document.getElementById('current');
    const totalEl = document.getElementById('total');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const btnSkip = document.getElementById('btn-skip');
    const btnRestart = document.getElementById('btn-restart');
    const btnBack = document.getElementById('btn-back');
    const leaderboardList = document.getElementById('leaderboard-list');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');
  
    // URL base (adicione a sua depois)
    const apiUrlPerguntas = ''; 
  
    // --- Trocar telas
    function showScreen(el) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
    }
  
    // --- Buscar perguntas da API
    async function buscarPerguntas(numeroDePerguntas = 5) {
      const url = `${apiUrlPerguntas}/${numeroDePerguntas}`;
      console.log(`🔍 Buscando ${numeroDePerguntas} perguntas da API...`);
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro na API de Perguntas: ${response.status}`);
        }
  
        const data = await response.json();
        const listaDePerguntas = data.perguntas || data;
        console.log("✅ Perguntas recebidas:", listaDePerguntas);
  
        // Converter para formato interno
        QUESTIONS = listaDePerguntas
          .sort(() => 0.5 - Math.random())
          .slice(0, numeroDePerguntas)
          .map(item => ({
            q: item.pergunta,
            choices: [item.opcaoA, item.opcaoB, item.opcaoC, item.opcaoD],
            a: item.respostaCorreta
          }));
  
        answers = new Array(QUESTIONS.length).fill(null);
        totalEl.textContent = QUESTIONS.length;
        renderQuestion(index);
      } catch (error) {
        console.error("❌ Falha ao carregar o quiz:", error);
        alert("Não foi possível carregar as perguntas. Verifique o console (F12).");
      }
    }
  
    // --- Renderizar questão
    function renderQuestion(i) {
      const item = QUESTIONS[i];
      currentEl.textContent = i + 1;
      questionArea.innerHTML = '';
  
      const qEl = document.createElement('div');
      qEl.className = 'question';
      qEl.textContent = item.q;
  
      const answersWrap = document.createElement('div');
      answersWrap.className = 'answers';
  
      item.choices.forEach((c, idx) => {
        const btn = document.createElement('button');
        btn.className = 'answer';
        btn.textContent = c;
        if (answers[i] === idx) btn.classList.add('selected');
        btn.addEventListener('click', () => {
          answers[i] = idx;
          answersWrap.querySelectorAll('.answer').forEach(x => x.classList.remove('selected'));
          btn.classList.add('selected');
        });
        answersWrap.appendChild(btn);
      });
  
      questionArea.appendChild(qEl);
      questionArea.appendChild(answersWrap);
    }
  
    // --- Calcular pontuação
    function calcScore() {
      let acertos = 0;
      let erros = 0;
  
      QUESTIONS.forEach((q, i) => {
        if (answers[i] === q.a) acertos++;
        else erros++;
      });
  
      return { acertos, erros };
    }
  
    // --- Salvar pontuação
    function saveScore(name, score) {
      const key = 'quiz_leaderboard_v1';
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      list.push({ name, score, date: new Date().toISOString() });
      list.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
      localStorage.setItem(key, JSON.stringify(list.slice(0, 10)));
    }
  
    // --- Carregar leaderboard
    function loadLeaderboard() {
      const raw = localStorage.getItem('quiz_leaderboard_v1');
      const list = raw ? JSON.parse(raw) : [];
      leaderboardList.innerHTML = list.length
        ? list.map(i => `<li><span>${i.name}</span><strong>${i.score}</strong></li>`).join('')
        : '<li style="opacity:.6">Sem pontuações ainda.</li>';
    }
  
    // --- Botão iniciar
    btnStart.addEventListener('click', async () => {
      const val = nameInput.value.trim();
      if (!val) return alert('Digite seu nome para continuar.');
      playerName = val;
      showName.textContent = playerName;
      index = 0;
      await buscarPerguntas(5); // busca 5 perguntas
      showScreen(screenQuiz);
    });
  
    // --- Próxima
    btnNext.addEventListener('click', () => {
      if (index === QUESTIONS.length - 1) {
        const { acertos, erros } = calcScore();
        resultTitle.textContent = `Parabéns, ${playerName}!`;
        resultText.textContent = `Acertos: ${acertos} | Erros: ${erros}`;
        saveScore(playerName, acertos);
        loadLeaderboard();
        showScreen(screenResult);
        return;
      }
      index++;
      renderQuestion(index);
    });
  
    // --- Anterior
    btnPrev.addEventListener('click', () => {
      if (index > 0) {
        index--;
        renderQuestion(index);
      }
    });
  
    // --- Pular
    btnSkip.addEventListener('click', () => {
      if (index < QUESTIONS.length - 1) {
        index++;
        renderQuestion(index);
      } else {
        const { acertos, erros } = calcScore();
        resultTitle.textContent = `Fim do quiz, ${playerName}!`;
        resultText.textContent = `Acertos: ${acertos} | Erros: ${erros}`;
        saveScore(playerName, acertos);
        loadLeaderboard();
        showScreen(screenResult);
      }
    });
  
    // --- Reiniciar
    btnRestart.addEventListener('click', async () => {
      index = 0;
      await buscarPerguntas(5);
      showScreen(screenQuiz);
    });
  
    // --- Voltar ao início
    btnBack.addEventListener('click', () => {
      nameInput.value = '';
      playerName = '';
      showScreen(screenName);
    });
  
    // --- Carregar leaderboard inicial
    loadLeaderboard();
  });
  
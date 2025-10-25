
const API_BASE = "http://187.102.36.3:8091/";
let perguntas = [];
let indiceAtual = 0;
let pontuacao = 0;
let jogador = "";
let leaderboard = [];

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const nameInput = document.getElementById("player-name");

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const endScreen = document.getElementById("end-screen");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressText = document.getElementById("progress");
const scoreText = document.getElementById("score");
const leaderboardDiv = document.getElementById("leaderboard");

startBtn.addEventListener("click", async () => {
  jogador = nameInput.value.trim();
  if (!jogador) {
    alert("Digite seu nome antes de começar!");
    return;
  }
  startScreen.style.display = "none";
  questionScreen.style.display = "block";
  indiceAtual = 0;
  pontuacao = 0;

  await carregarPerguntas();
  mostrarPergunta();
});

async function carregarPerguntas() {
  try {
    const res = await fetch(`${API_BASE}api/perguntas/5`);
    const data = await res.json();

    if (!data.perguntas || data.perguntas.length === 0) {
      throw new Error("Nenhuma pergunta recebida da API");
    }

    perguntas = data.perguntas;
    console.log("Perguntas carregadas:", perguntas);
  } catch (err) {
    console.error("Erro ao carregar perguntas:", err);
    alert("Não foi possível carregar as perguntas da API. Verifique o console.");
    perguntas = [];
  }
}

function mostrarPergunta() {
  if (indiceAtual >= perguntas.length) {
    finalizarQuiz();
    return;
  }

  const p = perguntas[indiceAtual];
  questionText.innerText = p.pergunta || "Pergunta sem texto";
  optionsContainer.innerHTML = "";
  progressText.innerText = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

  p.opcoes.forEach((op, idx) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = op.texto || `Opção ${idx + 1}`;
    btn.style.display = "block";
    btn.style.margin = "8px 0";
    btn.onclick = () => handleAnswerClick(idx, btn, p.id);
    optionsContainer.appendChild(btn);
  });
}

async function handleAnswerClick(indexSelecionado, buttonEl, perguntaId) {
  const p = perguntas[indiceAtual];
  const opcoes = p.opcoes || [];

  Array.from(optionsContainer.children).forEach(b => {
    b.disabled = true;
    b.style.cursor = "default";
  });

  try {
    const res = await fetch(`${API_BASE}api/respostas/${perguntaId}`);
    const data = await res.json();

    let corretaRaw = data.resposta ?? data.correta ?? "";
    if (typeof corretaRaw === "object" && corretaRaw !== null) {
      corretaRaw = corretaRaw.id ?? corretaRaw._id ?? corretaRaw.value ?? "";
    }
    const correta = String(corretaRaw).trim().toLowerCase();

    const idxCorreta = opcoes.findIndex(o => o.id.toLowerCase() === correta);
    const acertou = indexSelecionado === idxCorreta;

    if (acertou) {
      pontuacao++;
      buttonEl.style.background = "#c8e6c9";
    } else {
      buttonEl.style.background = "#ffcdd2";
    }

    if (idxCorreta !== -1) {
      const btnCorreta = optionsContainer.children[idxCorreta];
      if (btnCorreta) btnCorreta.style.outline = "3px solid green";
    }

    console.log("Pergunta ID:", perguntaId);
    console.log("Resposta correta da API:", correta);
    console.log("Opção selecionada:", opcoes[indexSelecionado]);
    console.log("Acertou?", acertou);

  } catch (err) {
    console.error("Erro ao buscar /api/respostas:", err);
    alert("Não foi possível verificar a resposta.");
  }

  indiceAtual++;
  setTimeout(() => {
    if (indiceAtual < perguntas.length) mostrarPergunta();
    else finalizarQuiz();
  }, 700);
}

function finalizarQuiz() {
  questionScreen.style.display = "none";
  endScreen.style.display = "block";
  scoreText.innerText = `${jogador}, você acertou ${pontuacao} de ${perguntas.length}!`;

  leaderboard.push({ nome: jogador, pontos: pontuacao });
  leaderboard.sort((a, b) => b.pontos - a.pontos);

  exibirLeaderboard();
}

function exibirLeaderboard() {
  leaderboardDiv.innerHTML = "<h3>Leaderboard</h3>";
  const ul = document.createElement("ul");
  leaderboard.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerText = `${index + 1}. ${p.nome} - ${p.pontos} pontos`;
    ul.appendChild(li);
  });
  leaderboardDiv.appendChild(ul);
}

restartBtn.addEventListener("click", () => {
  indiceAtual = 0;
  pontuacao = 0;
  endScreen.style.display = "none";
  startScreen.style.display = "block";
});

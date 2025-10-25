(() => {
    const API_URL = 'http://localhost:8011/proxy/api/perguntas/5';
    const MAX = 5;

    // elementos
    const playerNameEl = document.getElementById('playerName');
    const startBtn = document.getElementById('startBtn');
    const welcomeEl = document.getElementById('welcome');
    const playerSetup = document.getElementById('player-setup');

    const quizSection = document.getElementById('quiz');
    const questionText = document.getElementById('questionText');
    const choicesEl = document.getElementById('choices');
    const nextBtn = document.getElementById('nextBtn');

    const scoreEl = document.getElementById('score');
    const progressEl = document.getElementById('progress');

    const resultSection = document.getElementById('result');
    const finalScoreEl = document.getElementById('finalScore');
    const playAgainBtn = document.getElementById('playAgainBtn');

    const leaderboardEl = document.getElementById('leaderboard');

    if (!playerNameEl || !startBtn || !questionText || !choicesEl) {
        console.error('IDs esperados não encontrados no HTML: playerName, startBtn, questionText, choices');
        return;
    }

    // estado
    let player = '';
    let questions = [];
    let idx = 0;
    let hits = 0;
    let misses = 0;

    // util: dividir string com separadores comuns
    function splitOptionsFromString(s) {
        if (!s || typeof s !== 'string') return [];
        const parts = s.split(/\r?\n|\||;|\/|--|~~/).map(p => p.trim()).filter(Boolean);
        if (parts.length > 1) return parts;
        const commaParts = s.split(',').map(p => p.trim()).filter(Boolean);
        return commaParts.length > 1 ? commaParts : [];
    }

    // util: normalizar texto para comparação
    function normalizeTextForCompare(s) {
        if (s == null) return '';
        return String(s)
            .toLowerCase()
            .replace(/[\u2018\u2019\u201C\u201D'".,;:!?()\[\]{}–—]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // normalize: extrai texto, opções e resolve índice correto de forma robusta
    function normalize(raw) {
        const text = raw.enunciado || raw.pergunta || raw.question || raw.texto || raw.text || raw.title || '';

        let opts = raw.alternativas || raw.alternativasTexto || raw.options || raw.choices || raw.answers || raw.respostas || raw.items || raw.opcoes || raw.alternativas_texto || [];

        if (typeof opts === 'string') {
            opts = splitOptionsFromString(opts);
        }

        if (opts && typeof opts === 'object' && !Array.isArray(opts)) {
            const vals = Object.values(opts);
            opts = vals.map(v => {
                if (typeof v === 'string') return v;
                if (typeof v === 'object' && v !== null) return v.texto || v.text || v.descricao || v.label || v.value || JSON.stringify(v);
                return String(v);
            }).filter(Boolean);
        }

        if ((!opts || opts.length === 0)) {
            const candidateKeys = ['a','b','c','d','A','B','C','D','alternativaA','alternativaB','alternativaC','alternativaD','opcao1','opcao2','opcao3','opcao4'];
            const found = candidateKeys.map(k => raw[k]).filter(Boolean);
            if (found.length) opts = found;
        }

        if ((!opts || opts.length === 0) && raw && typeof raw === 'object') {
            const candidates = [];
            for (const [k, v] of Object.entries(raw)) {
                if (k.match(/id|status|categoria|tema|nivel|pontuacao|created|updated/i)) continue;
                if (typeof v === 'string' && v.trim().length > 0 && v.trim().length < 200) {
                    candidates.push(v.trim());
                } else if (typeof v === 'object' && v !== null) {
                    const textV = v.texto || v.text || v.descricao || v.label || v.value;
                    if (typeof textV === 'string' && textV.trim().length) candidates.push(textV.trim());
                }
            }
            if (candidates.length) {
                opts = Array.from(new Set(candidates)).slice(0, 10);
            }
        }

        const options = (opts || []).map(o => {
            if (o === null || o === undefined) return '';
            if (typeof o === 'object') {
                return String(o.texto || o.text || o.descricao || o.descricao_alternativa || o.label || o.value || JSON.stringify(o));
            }
            return String(o);
        });

        // resolve índice correto robusto (number 0/1 based, numeric-string, letter, or text match)
        let correct = null;
        const rawVal = raw.resposta ?? raw.answer ?? raw.correct ?? raw.resposta_texto ?? raw.respostaTexto ?? null;

        if (rawVal != null) {
            // numeric (number or numeric string)
            if (typeof rawVal === 'number' || (/^\d+$/.test(String(rawVal).trim()))) {
                const n = Number(rawVal);
                if (Number.isInteger(n)) {
                    if (n >= 0 && n < options.length) correct = n;       // 0-based
                    else if (n >= 1 && n <= options.length) correct = n - 1; // 1-based
                }
            }

            // letter like 'A' or 'b'
            if (correct === null && typeof rawVal === 'string' && /^[A-Za-z]$/.test(rawVal.trim())) {
                const ch = rawVal.trim().toUpperCase();
                const idxLetter = ch.charCodeAt(0) - 65; // 'A' -> 0
                if (idxLetter >= 0 && idxLetter < options.length) correct = idxLetter;
            }

            // textual match
            if (correct === null && typeof rawVal === 'string' && options.length) {
                const target = normalizeTextForCompare(rawVal);
                const found = options.findIndex(o => normalizeTextForCompare(o) === target);
                if (found >= 0) correct = found;
                else {
                    const found2 = options.findIndex(o => normalizeTextForCompare(o).includes(target) || target.includes(normalizeTextForCompare(o)));
                    if (found2 >= 0) correct = found2;
                }
            }
        }

        if (correct === null) {
            correct = 0; // fallback
            if (!options || options.length === 0) {
                console.warn('normalize: não encontrou alternativas. raw:', raw);
            } else {
                console.warn('normalize: não conseguiu resolver índice correto, fallback=0. raw.resposta:', rawVal, 'options:', options);
            }
        }

        console.debug('normalize ->', { text, options, correct, rawSample: raw });

        return { text: String(text), options, correct };
    }

    // busca perguntas: aceita {perguntas: [...]}, array direto, items ou data.perguntas
    async function fetchFive() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                const txt = await res.text().catch(() => '');
                console.error('API fetch erro:', res.status, res.statusText, txt);
                throw new Error('API fetch erro ' + res.status);
            }
            const data = await res.json();
            console.debug('fetchFive: raw API response:', data);

            let arr = null;
            if (data && Array.isArray(data.perguntas)) arr = data.perguntas;
            else if (Array.isArray(data)) arr = data;
            else if (data && Array.isArray(data.items)) arr = data.items;
            else if (data && data.data && Array.isArray(data.data.perguntas)) arr = data.data.perguntas;

            if (!arr) {
                console.error('Formato inesperado da API:', data);
                throw new Error('Formato de resposta inesperado');
            }

            arr.slice(0, MAX).forEach((q, i) => console.debug('fetchFive: pergunta raw[' + i + ']:', q));
            return arr.slice(0, MAX);
        } catch (err) {
            console.error('fetchFive erro:', err);
         
            throw err;
        }
    }

    function renderScore() {
        scoreEl.textContent = `Acertos: ${hits} | Erros: ${misses}`;
        progressEl.textContent = `Pergunta ${Math.min(idx + 1, questions.length)} de ${MAX}`;
    }

    function renderLeaderboard() {
        const raw = localStorage.getItem('quiz_leaderboard');
        const list = raw ? JSON.parse(raw) : [];
        list.sort((a, b) => b.score - a.score);
        leaderboardEl.innerHTML = '';
        list.forEach((p, i) => {
            const li = document.createElement('li');
            if (i < 3) li.classList.add('top3');
            li.innerHTML = `<span class="name">${p.name}</span><span class="score">${p.score}</span>`;
            leaderboardEl.appendChild(li);
        });
    }

    function saveLeaderboard(name, score) {
        const raw = localStorage.getItem('quiz_leaderboard');
        const list = raw ? JSON.parse(raw) : [];
        list.push({ name, score, at: Date.now() });
        localStorage.setItem('quiz_leaderboard', JSON.stringify(list));
    }

    function renderQuestion() {
        const q = questions[idx];
        questionText.textContent = q.text || 'Pergunta inválida';
        choicesEl.innerHTML = '';

        if (!q.options || q.options.length === 0) {
            const notice = document.createElement('div');
            notice.className = 'no-options';
            notice.textContent = 'Sem alternativas disponíveis para esta pergunta.';
            choicesEl.appendChild(notice);
            nextBtn.classList.remove('hidden');
            console.warn('Pergunta sem alternativas:', q);
            return;
        }

        q.options.forEach((opt, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'choice-btn';
            b.textContent = opt || `Opção ${i + 1}`;
            b.dataset.i = i;
            b.addEventListener('click', onChoice);
            choicesEl.appendChild(b);
        });
        nextBtn.classList.add('hidden');
        renderScore();
    }

    function disableChoices() {
        choicesEl.querySelectorAll('button').forEach(b => b.disabled = true);
    }

    function onChoice(e) {
        const chosen = Number(e.currentTarget.dataset.i);
        const q = questions[idx];
        disableChoices();
        if (chosen === q.correct) {
            e.currentTarget.classList.add('choice-correct');
            hits++;
        } else {
            e.currentTarget.classList.add('choice-wrong');
            const correctBtn = choicesEl.querySelector(`button[data-i="${q.correct}"]`);
            if (correctBtn) correctBtn.classList.add('choice-correct');
            misses++;
        }
        nextBtn.classList.remove('hidden');
        renderScore();
    }

    function next() {
        idx++;
        if (idx >= questions.length) {
            finish();
            return;
        }
        renderQuestion();
    }

    function finish() {
        quizSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        finalScoreEl.textContent = `Você acertou ${hits} de ${MAX}`;
        saveLeaderboard(player, hits);
        renderLeaderboard();
    }

    async function start() {
        player = playerNameEl.value.trim();
        if (!player) { playerNameEl.focus(); return; }
        welcomeEl.textContent = `Boa sorte, ${player}!`;
        welcomeEl.classList.remove('hidden');
        playerSetup.classList.add('hidden');

        try {
            const raw = await fetchFive();
            questions = raw.slice(0, MAX).map(normalize);
            if (!questions.length) throw new Error('Sem perguntas retornadas');
            idx = 0; hits = 0; misses = 0;
            renderQuestion();
            quizSection.classList.remove('hidden');
        } catch (err) {
            console.error('Erro ao carregar perguntas:', err);
            alert('Falha ao carregar perguntas. Verifique proxy e console.');
            playerSetup.classList.remove('hidden');
            welcomeEl.classList.add('hidden');
        }
    }

    // eventos
    startBtn.addEventListener('click', start);
    nextBtn.addEventListener('click', () => { nextBtn.classList.add('hidden'); next(); });
    playAgainBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        playerSetup.classList.remove('hidden');
        playerNameEl.value = '';
        welcomeEl.classList.add('hidden');
        renderScore();
    });

    // init
    renderLeaderboard();
    renderScore();
})();
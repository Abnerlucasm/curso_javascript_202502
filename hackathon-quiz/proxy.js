// proxy.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors()); // permite chamadas do navegador para este proxy

const API_BASE = 'http://187.102.36.3:8091';

// repassa /perguntas/:qtd -> /api/perguntas/:qtd
app.get('/perguntas/:qtd', async (req, res) => {
  const { qtd } = req.params;
  try {
    const r = await fetch(`${API_BASE}/api/perguntas/${encodeURIComponent(qtd)}`);
    const txt = await r.text();
    const ct = r.headers.get('content-type') || 'application/json';
    res.status(r.status).set('content-type', ct).send(txt);
  } catch (err) {
    console.error('proxy /perguntas error:', err);
    res.status(502).json({ message: 'Erro no proxy ao buscar perguntas', detail: String(err) });
  }
});

// repassa /respostas/:id -> /api/respostas/:id
app.get('/respostas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const r = await fetch(`${API_BASE}/api/respostas/${encodeURIComponent(id)}`);
    const txt = await r.text();
    const ct = r.headers.get('content-type') || 'application/json';
    res.status(r.status).set('content-type', ct).send(txt);
  } catch (err) {
    console.error('proxy /respostas error for id', id, err);
    res.status(502).json({ message: 'Erro no proxy ao buscar resposta', detail: String(err) });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy rodando em http://localhost:${PORT}`));
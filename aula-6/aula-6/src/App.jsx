import { useState } from 'react';
import './App.css';

function App() {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  // Adiciona uma nova tarefa com status "não concluída"
  function adicionarTarefa() {
    if (novaTarefa.trim() === '') return;

    const nova = {
      texto: novaTarefa,
      concluida: false,
    };

    setTarefas([...tarefas, nova]);
    setNovaTarefa('');
  }

  // Alterna o status concluída/não concluída
  function toggleConclusao(index) {
    const novaLista = [...tarefas];
    novaLista[index].concluida = !novaLista[index].concluida;
    setTarefas(novaLista);
  }

  return (
    <div className="card">
      <h1>Lista de Tarefas 📝</h1>

      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
      />

      <button onClick={adicionarTarefa} style={{ marginTop: '10px' }}>
        Adicionar
      </button>

      <ul style={{ textAlign: 'left', marginTop: '20px' }}>
        {tarefas.map((tarefa, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() => toggleConclusao(index)}
            />
            <span
              style={{
                marginLeft: '8px',
                textDecoration: tarefa.concluida ? 'line-through' : 'none',
                color: tarefa.concluida ? 'gray' : 'black',
              }}
            >
              {tarefa.texto}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
		let db;
        let editandoId = null;

        
        function inicializarDB() {
            const request = indexedDB.open('EscolaDB', 1); // Inicializar o IndexedDB com o banco de dados EscolaDB

            request.onerror = () => {
                mostrarAlerta('Erro ao abrir o banco de dados', 'info');
            };

            request.onsuccess = (e) => {
                db = e.target.result;
                mostrarAlerta('Banco de dados conectado com sucesso!', 'success');
                carregarAlunos();
            };

            request.onupgradeneeded = (e) => {
                db = e.target.result;
                
                // Criar object store, alg sememlhante a uma tabela em sql, se não existir
                if (!db.objectStoreNames.contains('alunos')) {
                    const objectStore = db.createObjectStore('alunos', { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                    
                    // Criar índices para facilitar buscas
                    objectStore.createIndex('nome', 'nome', { unique: false });
                    objectStore.createIndex('email', 'email', { unique: true });
                    objectStore.createIndex('curso', 'curso', { unique: false });
                }
            };
        }

        // Adicionar ou atualizar aluno
        function salvarAluno(aluno) {
            const transaction = db.transaction(['alunos'], 'readwrite');
            const objectStore = transaction.objectStore('alunos');
            
            let request;
            if (editandoId) {
                aluno.id = editandoId;
                request = objectStore.put(aluno);
            } else {
                request = objectStore.add(aluno);
            }

            request.onsuccess = () => {
                const mensagem = editandoId ? 'Aluno atualizado!' : 'Aluno adicionado!';
                mostrarAlerta(mensagem, 'success');
                limparFormulario();
                carregarAlunos();
            };

            request.onerror = () => {
                mostrarAlerta('Erro ao salvar aluno', 'info');
            };
        }

        // Carregar todos os alunos
        function carregarAlunos() {
            const transaction = db.transaction(['alunos'], 'readonly');
            const objectStore = transaction.objectStore('alunos');
            const request = objectStore.getAll();

            request.onsuccess = (e) => {
                const alunos = e.target.result;
                exibirAlunos(alunos);
            };
        }

        // Exibir alunos na tela
        function exibirAlunos(alunos) {
            const lista = document.getElementById('listaAlunos');
            
            if (alunos.length === 0) {
                lista.innerHTML = `
                    <div class="empty-state">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3>Nenhum aluno cadastrado</h3>
                        <p>Adicione o primeiro aluno usando o formulário acima</p>
                    </div>
                `;
                return;
            }

            lista.innerHTML = alunos.map(aluno => `
                <div class="student-card">
                    <div class="student-info">
                        <h3>
                            ${aluno.nome}
                            <span class="status-badge status-${aluno.status}">
                                ${aluno.status.toUpperCase()}
                            </span>
                        </h3>
                        <p><strong>Email:</strong> ${aluno.email}</p>
                        <p><strong>Curso:</strong> ${aluno.curso}</p>
                    </div>
                    <div class="student-actions">
                        <button class="btn-primary btn-small" onclick="editarAluno(${aluno.id})">
                            Editar
                        </button>
                        <button class="btn-danger btn-small" onclick="excluirAluno(${aluno.id})">
                            Excluir
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Editar aluno
        function editarAluno(id) {
            const transaction = db.transaction(['alunos'], 'readonly');
            const objectStore = transaction.objectStore('alunos');
            const request = objectStore.get(id);

            request.onsuccess = (e) => {
                const aluno = e.target.result;
                document.getElementById('nome').value = aluno.nome;
                document.getElementById('email').value = aluno.email;
                document.getElementById('curso').value = aluno.curso;
                document.getElementById('status').value = aluno.status;
                
                editandoId = id;
                document.getElementById('btnText').textContent = 'Atualizar Aluno';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }

        // Excluir aluno
        function excluirAluno(id) {
            if (!confirm('Tem certeza que deseja excluir este aluno?')) return;

            const transaction = db.transaction(['alunos'], 'readwrite');
            const objectStore = transaction.objectStore('alunos');
            const request = objectStore.delete(id);

            request.onsuccess = () => {
                mostrarAlerta('Aluno excluído com sucesso!', 'success');
                carregarAlunos();
            };
        }

        // Limpar todos os alunos
        function limparTodos() {
            if (!confirm('Tem certeza que deseja excluir TODOS os alunos?')) return;

            const transaction = db.transaction(['alunos'], 'readwrite');
            const objectStore = transaction.objectStore('alunos');
            const request = objectStore.clear();

            request.onsuccess = () => {
                mostrarAlerta('Todos os alunos foram excluídos!', 'success');
                carregarAlunos();
            };
        }

        // Limpar formulário
        function limparFormulario() {
            document.getElementById('studentForm').reset();
            editandoId = null;
            document.getElementById('btnText').textContent = 'Adicionar Aluno';
        }

        // Mostrar alertas
        function mostrarAlerta(mensagem, tipo) {
            const container = document.getElementById('alertContainer');
            const alerta = document.createElement('div');
            alerta.className = `alert-${tipo}`;
            alerta.textContent = mensagem;
            
            container.appendChild(alerta);
            
            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }

        // Event listener do formulário
        document.getElementById('studentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const aluno = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                curso: document.getElementById('curso').value,
                status: document.getElementById('status').value,
                dataCadastro: new Date().toISOString()
            };

            salvarAluno(aluno);
        });

        // Inicializar quando a página carregar
        window.onload = inicializarDB;
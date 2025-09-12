let alunos = [];

function renderizarLista() {
    const listaHtml = document.getElementById("lista");
    listaHtml.innerHTML = "";

    alunos.forEach((aluno, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. Nome: ${aluno.nome}, Idade: ${aluno.idade}`;
        listaHtml.appendChild(li);
    });
}

function adicionaAluno() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;

    if (nome && idade) {
        const aluno = {
            nome: nome,
            idade: parseInt(idade)
        };
        alunos.push(aluno);
        renderizarLista();
        document.getElementById("nome").value = "";
        document.getElementById("idade").value = "";
    } else {
        alert("Preencha os dois campos!");
    }
}

function removerAluno() {
    alunos.pop();
    renderizarLista();
}

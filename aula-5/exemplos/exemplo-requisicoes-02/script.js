function listarTodos() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "dados.json", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const dados = JSON.parse(xhr.responseText);
      const lista = document.getElementById("lista");
      lista.innerHTML = "";  // limpa antes de listar

      dados.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `ID: ${item.id} | Nome: ${item.nome} | Idade: ${item.idade}`;
        lista.appendChild(li);
      });
    }
  };
  xhr.send();
}
function carregarDados() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "dados.json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const dados = JSON.parse(xhr.responseText);
      document.getElementById("conteudo").innerText =
        `Nome: ${dados.nome}, Idade: ${dados.idade}, Cidade: ${dados.cidade}`;
    }
  };
  xhr.send();
}
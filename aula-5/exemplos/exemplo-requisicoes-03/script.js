function buscarPorId() {
    const idTexto = document.getElementById("busca").value;
    const id = parseFloat(idTexto);

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "dados.json", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const dados = JSON.parse(xhr.responseText);
      const item = dados.find(obj => obj.id === id);
      if (item) {
        document.getElementById("umItem").innerText =
          `ID: ${item.id} | Nome: ${item.nome} | Idade: ${item.idade}`;
      } else {
        document.getElementById("umItem").innerText = "ID não encontrado.";
      }
    }
  };
  xhr.send();
}
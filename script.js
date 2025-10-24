function pegaNomeJogador() {

    const inputNome = document.getElementById('input-nome');
    const nomeJogador = inputNome.value;

    console.log("Nome do Jogador:", nomeJogador);

    inputNome.value = "";
}
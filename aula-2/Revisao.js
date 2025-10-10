
let nome = "João"
let idade = 25
let cidade = "Joinville"

function exibirInformacoes() {
    let info = `Nome: ${nome}</p>
                Idade: ${idade}</p>
                Cidade: ${cidade}</p>`;
    document.getElementById('info').innerHTML = info;
}
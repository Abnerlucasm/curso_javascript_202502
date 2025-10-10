async function buscarTodosOsProdutos() {
  const url = 'https://fakestoreapi.com/products';

  try {
    // 1. Faz a requisição HTTP (GET por padrão)
    const resposta = await fetch(url);

    // 2. Verifica se a requisição foi bem-sucedida
    if (!resposta.ok) {
      throw new Error(`Erro na requisição: Status ${resposta.status}`);
    }

    // 3. Converte a resposta para JSON
    const dados = await resposta.json();

    // 4. Exibe os dados no console
    console.log("Produtos:", dados);

    // Exemplo de como acessar o primeiro produto:
    // console.log("Primeiro Produto:", dados[0].title);

  } catch (erro) {
    console.error("Ocorreu um erro ao buscar os dados:", erro);
  }
}

buscarTodosOsProdutos();
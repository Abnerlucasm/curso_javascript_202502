# Simulação Hackathon
## Informações Relevantes

- [Link para a documentação da API](https://fakestoreapi.com/docs)
- **Tempo Limite:** 2 horas
- O uso de frameworks é permitido, mas não obrigatório.

---

- Apenas deverá ser feito um único push ao final do desenvolvimento
- Uma "correção" do que foi realizado será adicionado ao README da sua branch após visualizado pelos professores.

## Implementações base

### Listagem de produtos
- Buscar **todos os produtos** da API e listá-los na tela.  
- Cada produto deve exibir:
  - **Nome**
  - **Descrição**
  - **Preço**
  - **Quantidade**
  - **Imagem**
  - **Botão “Adicionar ao Carrinho”**

---

### Implementação do carrinho
- O carrinho **não deve possuir persistência de dados**, ou seja, ao recarregar a página ele deve voltar ao estado inicial.
- O carrinho deve permitir a **compra dos itens listados**:
  - Ao comprar, a **quantidade dos itens é reduzida**.
  - A **quantidade dos produtos** deve ser **persistente**, ou seja, **mesmo recarregando a página**, ela **não deve ser alterada**.

## Implementações Extras (do mais simples ao mais complexo)

### Total Dinâmico no Carrinho
- Exibir o **valor total da compra**, calculado com base nos itens e suas quantidades.  
- Atualizar o total automaticamente sempre que o carrinho for alterado.

---

### Confirmação de Compra
- Antes de finalizar, pedir ao usuário uma **confirmação** (“Tem certeza que deseja finalizar a compra?”).  
- Apenas após a confirmação a compra deve ser concluída.

---

### UX Melhorado
- Exibir os produtos em **cards visuais**, com layout mais organizado.  
- Separar visualmente os **produtos disponíveis** dos **indisponíveis**.

---

### Filtro e Busca
- Permitir **filtrar itens pela categoria** ou **faixa de preço**.  
- Adicionar uma **busca por nome** para localizar produtos rapidamente.

---

### Destaque de Produtos
- Permitir marcar um produto como **favorito**.  
- Produtos favoritados devem ser **exibidos primeiro** na listagem.  
- A informação de favorito deve possuir **persistência de dados**.

## Critérios de avaliação

### Implementações Base
- Cumprimento correto de todos os requisitos obrigatórios.

---

### Organização do Código
- Código limpo, identado e bem estruturado.  
- Uso adequado de funções (quando aplicável).  
- Ausência de código duplicado ou comentários desnecessários.

---

### Lógica e Funcionamento
- Funcionalidade correta do carrinho e produtos.  
- Cálculos, atualizações e reduções de estoque funcionando conforme esperado.  
- Nenhum erro grave no console.

---

### Boas Práticas de Git
- **Commits consistentes**, claros e com mensagens descritivas.  
- Histórico de commits limpo e progressivo (sem pushes aleatórios ou commits vazios).
- Apenas um push ao final do projeto.

---

### Criatividade e Implementações Extras
- Recursos adicionais implementados além do mínimo exigido.  
- Soluções criativas ou otimizações simples que melhoram a experiência geral.        ☺ ☺ ♂                   
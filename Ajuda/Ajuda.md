## 🛠️ Tópico de Apoio: Dicas e Comandos Úteis

Este material reúne links e orientações para auxiliar em tarefas comuns do dia a dia, especialmente em ambientes de desenvolvimento e suporte técnico.

---

### IDE VS Code Online

Link: https://vscode.dev/?vscode-lang=pt-br

---

### 🔧 Comandos Git

Git é uma ferramenta essencial para controle de versão. Abaixo, um repositório com os principais comandos para consulta rápida:

👉 [Comandos Git (Gist no GitHub)](https://gist.github.com/leocomelli/2545add34e4fec21ec16#file-git-md)

> - **Atualizar branch pessoal com base na master:** 
>
> **OBS**: Use o caminho/path completo. Ex: `C:\Users\usuario\Área de Trabalho\curso_javascript_202502\aula-1`
> 
Jeito compatível (Git mais antigo, com checkout):
> ``` git
> git fetch origin
> git checkout origin/master -- caminho/da/pasta/
> git add caminho/da/pasta/
> git commit -m "Merge da pasta caminho/da/pasta do origin/master"
> ``` 
Jeito recomendado (Git mais novo, com restore):
> ```git
> git fetch origin
> git restore --source origin/master -- caminho/da/pasta/
> git add caminho/da/pasta/
> git commit -m "Merge da pasta caminho/da/pasta do origin/master"
> ```
>

<img src="https://raw.githubusercontent.com/Abnerlucasm/curso_javascript_202502/master/Ajuda/assets/copiar-path-completo.gif" width="400">
</img>

---

### 💻 Comandos de Terminal

- `cd` – Navegar entre pastas
- `ls` ou `dir` – Listar arquivos da pasta atual
- `mkdir` – Criar nova pasta
- `rm` – Remover arquivos
- `cls` ou `clear` – Limpar o terminal
- `touch` - Criar novos arquivos

---

### 🔗 Links Úteis

- [Documentação Oficial do Git](https://git-scm.com/doc)
- [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)
- [DevDocs.io - Documentação de várias tecnologias](https://devdocs.io/)
- [W3schools - Aprenda Código online](https://www.w3schools.com/)
- [HTML Básico](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content)
- [Introdução HTML](https://www.devmedia.com.br/html-basico-codigos-html/16596)
- [Documentação JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Roadmap Javascript em Inglês](https://roadmap.sh/pdfs/roadmaps/javascript.pdf)
- [Roadmap javascript em Português](https://jeffbruchado.com.br/blog/roadmap-javascript-tudo-o-que-voce-precisa-aprender)
- [Noções Básicas JS](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity)
- [Guia JS](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide)
- [HTTP Status Codes (Códigos de Status Requisições e Respostas HTTP)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status)
- [Artigo Design Patterns JS](https://medium.com/@pedrofullstack/um-guia-para-design-patterns-em-javascript-171ca3c24dd6)
- [Praticar Escrita de Código de Forma Gamificada - Codewars](https://www.codewars.com/)
- [1 - Exemplo de Design Patterns](https://refactoring.guru/design-patterns/creational-patterns)
- [2 - Exemplo de Design Patterns](https://www.patterns.dev/)

#### APIs Públicas / Gratuitas
- [GitHub Public Apis](https://github.com/public-apis/public-apis)
- [Any API](https://any-api.com/)
- [rapidApi](https://rapidapi.com/collection/list-of-free-apis)
- [Mixed Analytics](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/)
- [Brasil API](https://brasilapi.com.br/)
- [API de Moedas](https://docs.awesomeapi.com.br/api-de-moedas)
- [APIs de Texto - InverterTexto](https://api.invertexto.com/)
---


Este guia está em constante atualização. Contribuições são bem-vindas!
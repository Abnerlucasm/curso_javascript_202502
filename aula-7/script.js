function salvarCor() {
      //Pega o valor definido no input, nesse caso em hexadecimal
      let cor = document.getElementById("cor").value;
      //Com setItem coloca a cor na sessionStorage (mostrar o inspecionar)
      sessionStorage.setItem("corEscolhida", cor);
      //Altera a cor do texto na página depois que clicar em salvar
      document.getElementById("texto").style.color = cor;
    }

    //Seta o valor da variável no session com a cor escolhida no input
    let cor = sessionStorage.getItem("corEscolhida");
    //Caso tenha algum valor salvo na variável acima, ele vai setar a cor do texto com a variável
    if (cor) document.getElementById("texto").style.color = cor;
function salvarCor() {
      let cor = document.getElementById("cor").value;
      sessionStorage.setItem("corEscolhida", cor);
      document.getElementById("texto").style.color = cor;
    }

    let cor = sessionStorage.getItem("corEscolhida");
    if (cor) document.getElementById("texto").style.color = cor;
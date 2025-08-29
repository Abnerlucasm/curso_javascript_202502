let cor;

function MudaCor() {
  const elemento = document.getElementById("titulo");

  if (cor == 0) {
    elemento.style.color = "red";
    cor = 1;
  } else {
    elemento.style.color = "black";
    cor = 0;
  }

  const input = document.getElementById("texto");
  console.log("Meu nome é: ", input.value);
  console.log(cor);
  elemento.innerText = `Meu nome é: ${input.value}`;
}

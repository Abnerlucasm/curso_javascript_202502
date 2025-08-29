function SomaValor() {
  const valor1 = document.getElementById("valor1").value;
  const valor2 = document.getElementById("valor2").value;

  let soma = parseFloat(valor1) + parseFloat(valor2);

  console.log(soma);
}

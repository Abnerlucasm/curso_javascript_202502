

function MudaCor(){
    const elemento = document.getElementById("titulo")
    elemento.style.color = "white";

    const input = document.getElementById("input1")
    console.log("meu nome é: " ,input.value)

    elemento.innerText = `meu nome é: ${input.value}`;
}
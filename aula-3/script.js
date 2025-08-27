//Funções anônimas

const somar = function(a,b) {
    return parseFloat(a) + parseFloat(b);
}

console.log('A soma dos números é: '+somar(1.2,3.3));




const dobrar = function(x) {
    return x * 2;
}

console.log('O resultado dobrado é: ' + dobrar(15));


const mensagem = function() {
    console.log('CursoJS 202502');
}

mensagem();


//-----------------------------------------------------

//Arrow Functions

const criarUsuario1 = (nome,idade) => ({nome,idade});
console.log(criarUsuario1('Guilherme',30));


function criarUsuario2(nome,idade) {
    return {nome,idade};
}

console.log(criarUsuario2('Eder',40));

//-----------------------------------------------------

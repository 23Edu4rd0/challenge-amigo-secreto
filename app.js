// O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

// Array para armazenar os nomes dos amigos
let amigos = [];

// Array para armazenar os nomes já sorteados
let sorteados = [];

// Variável para armazenar o estado anterior ao sorteio
let estadoAnterior = {
    sorteados: [],
    resultado: ''
};

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    let nome = input.value.trim();

    if (nome === '' || !isNaN(nome)) {
        alert('Por favor, insira um nome válido.');
        return;
    }

    nome = capitalizarPrimeiraLetra(nome);
    amigos.push(nome);
    atualizarLista();
    input.value = '';
    input.focus();
}

// Função para capitalizar a primeira letra do nome
function capitalizarPrimeiraLetra(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}

// Função para atualizar a lista de amigos na página
function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo + (index < amigos.length - 1 ? ', ' : '');
        lista.appendChild(li);
    });
}

// Função para sortear um amigo secreto
function sortearAmigo() {
    if (amigos.length === 0) {
        alert('A lista de amigos está vazia.');
        return;
    }

    if (sorteados.length === amigos.length) {
        alert('Todos os amigos já foram sorteados.');
        return;
    }

    // Salva o estado anterior ao sorteio
    estadoAnterior.sorteados = [...sorteados];
    estadoAnterior.resultado = document.getElementById('resultado').innerHTML;

    let indiceSorteado;
    let amigoSorteado;

    do {
        indiceSorteado = Math.floor(Math.random() * amigos.length);
        amigoSorteado = amigos[indiceSorteado];
    } while (sorteados.includes(amigoSorteado));

    sorteados.push(amigoSorteado);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `O amigo secreto sorteado é: ${amigoSorteado}`;
}

// Função para desfazer o último sorteio
function desfazerSorteio() {
    if (sorteados.length === 0) {
        alert('Não há sorteio para desfazer.');
        return;
    }

    if (sorteados.length === 1) {
        // Limpa o resultado do sorteio e reinicia o sorteio
        document.getElementById('resultado').innerHTML = '';
        sorteados = [];
        estadoAnterior.sorteados = [];
        estadoAnterior.resultado = '';
        alert('O sorteio foi reiniciado. Por favor, realize um novo sorteio.');
    } else {
        // Volta ao estado anterior
        sorteados.pop();
        document.getElementById('resultado').innerHTML = estadoAnterior.resultado;
        alert('O sorteio foi desfeito. Voltando ao estado anterior.');
    }
}

// Adiciona um ouvinte de eventos para o campo de entrada para detectar a tecla Enter
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});
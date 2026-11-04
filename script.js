
console.log("FinanceFlow iniciado com sucesso!");


const formulario = document.getElementById("formMovimentacao");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const tipo = document.getElementById("tipo");


const saldo = document.getElementById("saldo");
const receitas = document.getElementById("receitas");
const despesas = document.getElementById("despesas");


const listaMovimentacoes = document.getElementById("listaMovimentacoes");


let movimentacoes = [];

movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];


function formatarMoeda(numero) {
    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function atualizarResumo() {
    let totalReceitas = 0;
    let totalDespesas = 0;

    movimentacoes.forEach(function(item) {
        if (item.tipo === "receita") {
            totalReceitas += item.valor;
        } else {
            totalDespesas += item.valor;
        }
    });

    const saldoAtual = totalReceitas - totalDespesas;

    saldo.textContent = formatarMoeda(saldoAtual);
    receitas.textContent = formatarMoeda(totalReceitas);
    despesas.textContent = formatarMoeda(totalDespesas);
}




function mostrarMovimentacoes() {
    listaMovimentacoes.innerHTML = "";

    movimentacoes.forEach(function(item, indice) {
        const li = document.createElement("li");
        li.className = "item-movimentacao";

        const texto = document.createElement("span");
        texto.className = "texto-movimentacao";

        texto.textContent = `${item.descricao} - ${formatarMoeda(item.valor)}`;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirMovimentacao(indice);
        });

        li.appendChild(texto);
        li.appendChild(botaoExcluir);

        listaMovimentacoes.appendChild(li);
    });
}



function excluirMovimentacao(indice) {
    if (!confirm("Deseja realmente excluir esta movimentação?")) {
        return;
    }

    movimentacoes.splice(indice, 1);

    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );

    atualizarResumo();
    mostrarMovimentacoes();
}




formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = descricao.value.trim();
    const valorDigitado = Number(valor.value);
    const categoria = tipo.value;


    if (nome === "" || valorDigitado <= 0 || !Number.isFinite(valorDigitado)) {
        alert("Preencha a descrição e informe um valor válido.");
        return;
    }

 
    const movimentacao = {
        descricao: nome,
        valor: valorDigitado,
        tipo: categoria
    };


    movimentacoes.push(movimentacao);
    
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));


    atualizarResumo();
    mostrarMovimentacoes();


function excluirMovimentacao(indice) {
    const confirmar = confirm("Deseja realmente excluir esta movimentação?");

    if (!confirmar) {
        return;
    }

    movimentacoes.splice(indice, 1);

    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );

    atualizarResumo();
    mostrarMovimentacoes();

    console.log("Movimentação excluída com sucesso!");
}


    formulario.reset();

    console.log("Movimentação cadastrada:", movimentacao);

});
atualizarResumo();
mostrarMovimentacoes();
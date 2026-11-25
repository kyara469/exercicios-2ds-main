
const fs = require("fs/promises")

function caminhoArquivo() {
    return process.env.ARQUIVO_ENTREGAS || "entregas.json"
}

async function listar() {
    try {
        const conteudo = await fs.readFile(caminhoArquivo(), "utf-8")
        return JSON.parse(conteudo)
    } catch (erro) {
        if (erro.code === "ENOENT") {
            return []
        }

        throw erro
    }
}

async function salvar(entrega) {
    const entregas = await listar()

    entregas.push(entrega)

    await fs.writeFile(
        caminhoArquivo(),
        JSON.stringify(entregas, null, 2)
    );

    return entrega
}

async function atualizar(id, dados) {
    const entregas = await listar()

    const indice = entregas.findIndex(entrega => entrega.id === id)

    if (indice === -1) {
        return null;
    }

    entregas[indice] = {
        ...entregas[indice],
        ...dados
    };

    await fs.writeFile(
        caminhoArquivo(),
        JSON.stringify(entregas, null, 2)
    );

    return entregas[indice]
}

async function remover(id) {
    const entregas = await listar()

    const indice = entregas.findIndex(entrega => entrega.id === id)

    if (indice === -1) {
        return false
    }

    entregas.splice(indice, 1)

    await fs.writeFile(
        caminhoArquivo(),
        JSON.stringify(entregas, null, 2)
    );

    return true
}

module.exports = { listar, salvar, atualizar, remover }

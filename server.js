const crypto = require("crypto")

const express = require("express")
const app = express()

app.use(express.json())

const alunos = []

app.listen(3333, () => { // pede para ficar esciutando
    console.log("Servidor iniciado!")
})

app.get("/alunos", (request, response) => {
    // const data = request.query

    return response.json(alunos) // Devolve o json com o array alunos
})

app.post("/alunos", (request, response) => {
    const { nome, email } = request.body
    const uuid = crypto.randomUUID()

    const aluno = {
        uuid,
        nome,
        email
    };

    alunos.push(aluno)

    return response.status(201).json(aluno)
})

app.delete("/alunos/:uuid", (request, response) => {
    const { uuid } = request.params

    // Encontra o índice do aluno com o UUID correspondente
    const pos = alunos.findIndex(aluno => aluno.uuid == uuid)

    if (pos < 0) {
        // Se o aluno não for encontrado, retorna um erro 404
        return response.status(404).json({ message: "O Aluno não foi encontrado" })
    } else {
        const aluno = alunos[pos]
        alunos.splice(pos, 1)

        return response.status(201).json(aluno)
    
    }
})

app.put("/alunos/:uuid", (request, response) => {
    const { uuid } = request.params
    const { nome, email } = request.body

    const pos = alunos.findIndex(aluno => aluno.uuid == uuid)

    if (pos < 0) {
        return response.status(404).json({ message: "O Aluno não foi encontrado" })
    } else {

        alunos[pos] = {
            uuid,
            nome,
            email
        }
        return response.status(201).json(alunos[pos])
    }
})



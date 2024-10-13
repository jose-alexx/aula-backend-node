const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function sqlConection() {

    const banco = await sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database
      });

    return banco;
}

async function criarTabela() {
    const banco = await sqlConection();
     
    const tabela = `
        CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  
            uuid VARCHAR(100),
            nome VARCHAR(100),
            email VARCHAR(100)
        );
    `;   

    await banco.exec(tabela);
}

async function incerir(aluno) {
    const banco = await sqlConection();
    
    await banco.run('INSERT INTO alunos (uuid, nome, email) VALUES (?, ?, ?);', aluno.uuid, aluno.nome, aluno.email);
}

criarTabela();

const aluno = {
    uuid: '123',
    nome: 'João',
    email: 'joao@gmail.com'
}

incerir(aluno);
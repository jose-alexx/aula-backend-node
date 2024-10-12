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

async function incerir() {
    const banco = await sqlConection();
    
    const aluno = `
        INSERT INTO alunos (uuid, nome, email) VALUES ('123', 'joao', 'joao@gmail.com');
    `;
    
    await banco.exec(aluno);
}

incerir();
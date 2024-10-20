
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
    const {uuid, nome, email} = aluno;
    
    await banco.run('INSERT INTO alunos (uuid, nome, email) VALUES (?, ?, ?);', uuid, nome, email);
}

async function remover(id) {
    const banco = await sqlConection();

    await banco.run('DELETE FROM alunos WHERE id = ?', id);
}

async function atualizar(aluno) {
    const banco = await sqlConection();
    const {id, uuid, nome, email} = aluno;

    await banco.run('UPDATE alunos SET nome = ?, email = ? WHERE id = ?', nome, email, id);
}

async function  listar() {
    const banco = await sqlConection();
    const result = await banco.all('SELECT * FROM alunos');

    console.log(result);
    return result;
}

const aluno = {
    id: 2,
    uuid: '123',
    nome: 'naldo',
    email: 'naldo@gmail.com'
}

// criarTabela();
// remover(4);
// incerir(aluno);
// atualizar(aluno);
listar()
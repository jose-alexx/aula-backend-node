const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

class Banco {

    constructor() {
        this.criarTabela();
    }

    async sqlConection() {

        const banco = await sqlite.open({
            filename: 'database.db',
            driver: sqlite3.Database
          });
    
        return banco;
    }
    
    async criarTabela() {
        const banco = await this.sqlConection();
         
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
    
    async incerir(aluno) {
        const banco = await this.sqlConection();
        const {uuid, nome, email} = aluno;
        
        await banco.run('INSERT INTO alunos (uuid, nome, email) VALUES (?, ?, ?);', uuid, nome, email);
    }
    
    async remover(id) {
        const banco = await this.sqlConection();
    
        await banco.run('DELETE FROM alunos WHERE id = ?', id);
    }
    
    async atualizar(aluno) {
        const banco = await this.sqlConection();
        const {id, uuid, nome, email} = aluno;
    
        await banco.run('UPDATE alunos SET nome = ?, email = ? WHERE id = ?', nome, email, id);
    }
    
    async listar() {
        const banco = await this.sqlConection();
        const result = await banco.all('SELECT * FROM alunos');
    
        // console.log(result);
        return result;
    }

    async buscar(id) {
        const banco = await this.sqlConection();
        const result = await banco.get('SELECT * FROM alunos WHERE id = ?', id);
    
        // console.log(result);
        return result;
    }
}
// criarTabela();
// remover(4);
// incerir(aluno);
// atualizar(aluno);
// listar()


module.exports = Banco;
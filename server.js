/**
 * configura o servidor
 * importa o express
 */
const express = require("express")
/**
 * constante que recebe as
 * funcionalidade do express
 */
const server = express()

/**
 * configurar o servidor para apresentar arquivos estáticos
 */
server.use(express.static('public'))

//habilitar body do formulário
server.use(express.urlencoded({extended: true}))

/**
 * configurar conexão com BD
 */
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

/**
 * Configurando a template engine
 */
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true
})

/**
 * configura a apresentação da página
 * retorna uma resposta ao servidor
 */
server.get("/", function(req, res){
    db.query(`select * from donors`, function(err, result){
        if(err){
            return res.send("Erro de banco de dados")
        } else {
            const donors = result.rows;
            return res.render("index.html", {donors})
        }
    })
})

server.post("/", function(req, res){
    //pegar dados do formulário
    const name  = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios.")
    }

    //colocando valores dentro do Banco de Dados
    const query = `
        insert into donors ("name", "email", "blood")
        values ($1, $2, $3)
    `
    const values = [name, email, blood]

    db.query(query, values, function(err){
        if(err){
            return res.send("erro no banco de dados")
        } else {
            return res.redirect("/")
        }
    })
})

/**
 * ligar e rodar o servidor na porta 3000
 */
server.listen(3000, function(){
    console.log("Servidor rodando na porta 3000")
})
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

/**
 * Configurando a template engine
 */
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true
})

/**
 * lista de doadores
 * Vetor ou Array
 */
const donors = [
    {
        name: "Iohann Herber",
        blood: "AB+"
    },
    {
        name: "Christian Herber",
        blood: "B+"
    },
    {
        name: "Mara Jackeline",
        blood: "A+"
    },
    {
        name: "Kali Almeida",
        blood: "O"
    }
]


/**
 * configura a apresentação da página
 * retorna uma resposta ao servidor
 */
server.get("/", function(req, res){
    return res.render("index.html", {donors});
})

/**
 * ligar e rodar o servidor na porta 3000
 */
server.listen(3000, function(){
    console.log("Servidor rodando na porta 3000")
})
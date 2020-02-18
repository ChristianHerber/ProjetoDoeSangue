/**
 * importa o express
 */
const express = require("express")

/**
 * constante que recebe as
 * funcionalidade do express
 */
const server = express()

/**
 * retorna uma resposta
 * ao servidor
 */
server.get("/", function(req, res){
    return res.send("Ok, cheguei aqui!");
})

/**
 * servidor rodando na porta 3000
 */
server.listen(3000, function(){
    console.log("Servidor rodando na porta 3000")
})
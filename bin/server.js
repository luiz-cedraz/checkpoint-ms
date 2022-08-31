'use strict'

const http = require('http')
const app = require('../src/app')
const port = searchPort(process.env.PORT || '3000')
const server = http.createServer(app)
const mongoose = require('mongoose');

mongoose
    .connect("mongodb+srv://luiz:Manobom%4078@cluster0.isdk2a7.mongodb.net/checkpoint?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conexão efetuada com o MongoDB")
        server.listen(port)
        console.log(`Api executada na porta: ${port}`)
    })
    .catch(err => console.log(err));

function searchPort(val)
{
    const parsedPort = parseInt(val);

    if(isNaN(parsedPort))
        return val; 

    if(parsedPort >= 0)
        return parsedPort;
}






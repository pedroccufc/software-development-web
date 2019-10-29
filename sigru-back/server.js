// Importando a dependencia express
const express = require("express");

// Permite o acesso de outros domínios
const cors = require("cors");

// Para usar o Banco de Dados
const mongoose = require("mongoose");

// Para fazer todos os require necessários
const requireDir = require("require-dir");

// Iniciando o app
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando o Banco de Dados
mongoose.connect("mongodb://localhost:27017/sigru", 
	{ useNewUrlParser: true, useUnifiedTopology: true }
);
requireDir("./src/models");

// Rotas
app.use("/", require("./src/routes"));

app.listen(3001);

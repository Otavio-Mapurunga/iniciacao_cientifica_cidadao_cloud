require("dotenv").config();
const express = require("express");
const cors = require("cors");

const reclamacaoRoutes = require("./src/routes/reclamacao.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", reclamacaoRoutes);

// Rota de teste pra confirmar que o servidor tá vivo
app.get("/", (req, res) => {
  res.json({ mensagem: "CidadãoCloud API rodando!" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
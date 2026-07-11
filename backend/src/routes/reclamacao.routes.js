const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const reclamacaoController = require("../controller/reclamacao.controller");

router.post("/reclamacao", upload.single("foto"), reclamacaoController.enviarReclamacao);

module.exports = router;
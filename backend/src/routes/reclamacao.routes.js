const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload');
const reclamacaoController = require("../controller/reclamacao.controller");

router.post(
  "/reclamacao",
  upload.single("foto"),
  reclamacaoController.enviarReclamacao,
  (err, req, res, next) => {
    if (err) {
      return res.status(400).json({ erro: err.message });
    }
    next();
  }
);
module.exports = router;
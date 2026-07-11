const orgaos = require("../config/orgao.config");
const { enviarEmail } = require("../services/email.services");

const enviarReclamacao = async (req, res) => {
  try {
    const { categoria, endereco, latitude, longitude } = req.body;
    const foto = req.file;

    // Validações básicas
    if (!categoria) {
      return res.status(400).json({ erro: "Categoria é obrigatória." });
    }
    if (!endereco) {
      return res.status(400).json({ erro: "Endereço é obrigatório." });
    }
    if (!foto) {
      return res.status(400).json({ erro: "Foto é obrigatória." });
    }

    // Verifica se a categoria existe no mapeamento
    const orgao = orgaos[categoria];
    if (!orgao) {
      return res.status(400).json({ erro: "Categoria inválida." });
    }

    // Envia o e-mail
    await enviarEmail({
      destinatario: orgao.email,
      nomeOrgao: orgao.nome,
      categoria,
      endereco,
      latitude,
      longitude,
      fotoPath: foto.path,
    });

    return res.status(200).json({
      mensagem: `Denúncia enviada com sucesso para ${orgao.nome}!`,
    });

  } catch (error) {
    console.error("Erro ao enviar reclamação:", error);
    return res.status(500).json({ erro: "Erro interno ao processar a denúncia." });
  }
};

module.exports = { enviarReclamacao };
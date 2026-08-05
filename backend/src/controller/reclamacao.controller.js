const orgaos = require("../config/orgao.config");
const { enviarEmail } = require("../services/email.services");
const { classificarImagem } = require("../services/classificacao.service");

const enviarReclamacao = async (req, res) => {
  try {
    const { endereco, latitude, longitude } = req.body;
    const foto = req.file;

    if (!endereco) {
      return res.status(400).json({ erro: "Endereço é obrigatório." });
    }
    if (!foto) {
      return res.status(400).json({ erro: "Foto é obrigatória." });
    }

    // IA classifica a imagem automaticamente
    const resultado = await classificarImagem(foto.path);
    const categoria = resultado.categoria;

    console.log(`Categoria detectada: ${categoria} (${resultado.confianca}% de confiança)`);

    // Verifica se a categoria existe no mapeamento
    const orgao = orgaos[categoria];
    if (!orgao) {
      return res.status(400).json({
        erro: `Não foi possível identificar o tipo de problema na imagem.`,
        classificacao: resultado.todas,
      });
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
      categoria,
      confianca: `${resultado.confianca}%`,
    });

  } catch (error) {
    console.error("Erro ao enviar reclamação:", error);
    return res.status(500).json({ erro: "Erro interno ao processar a denúncia." });
  }
};

module.exports = { enviarReclamacao };
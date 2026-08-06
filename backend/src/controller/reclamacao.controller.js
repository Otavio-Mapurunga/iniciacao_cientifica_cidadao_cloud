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

    // IA classifica a imagem pelo buffer (memória)
    const resultado = await classificarImagem(foto.buffer);
    const categoria = resultado.categoria;

    console.log(`Categoria detectada: ${categoria} (${resultado.confianca}% de confiança)`);

    const orgao = orgaos[categoria];
    if (!orgao) {
      return res.status(400).json({
        erro: "Não foi possível identificar o tipo de problema na imagem.",
        classificacao: resultado.todas,
      });
    }

    // Envia e-mail com o buffer da foto
    await enviarEmail({
      destinatario: orgao.email,
      nomeOrgao: orgao.nome,
      categoria,
      endereco,
      latitude,
      longitude,
      fotoBuffer: foto.buffer,
      fotoNome: foto.originalname,
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

module.exports = { enviarReclamacao };orts = { enviarReclamacao };
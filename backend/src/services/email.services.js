const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const enviarEmail = async ({ destinatario, nomeOrgao, categoria, endereco, latitude, longitude, fotoBuffer, fotoNome }) => {
  const localizacao =
    latitude && longitude
      ? `${endereco} (Coordenadas: ${latitude}, ${longitude})`
      : endereco;

  await resend.emails.send({
    from: "CidadãoCloud <onboarding@resend.dev>",
    to: destinatario,
    subject: `Nova denúncia: ${categoria}`,
    html: `
      <h2>Nova denúncia recebida pelo CidadãoCloud</h2>
      <p><strong>Categoria:</strong> ${categoria}</p>
      <p><strong>Órgão responsável:</strong> ${nomeOrgao}</p>
      <p><strong>Localização:</strong> ${localizacao}</p>
      <p>Segue em anexo a foto do problema registrado pelo cidadão.</p>
      <br/>
      <small>Mensagem enviada automaticamente pelo sistema CidadãoCloud Fortaleza.</small>
    `,
    attachments: [
      {
        filename: fotoNome || "foto_denuncia.jpg",
        content: fotoBuffer,
      },
    ],
  });
};

module.exports = { enviarEmail };
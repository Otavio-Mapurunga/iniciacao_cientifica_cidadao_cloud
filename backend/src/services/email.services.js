const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const enviarEmail = async ({ destinatario, nomeOrgao, categoria, endereco, latitude, longitude, fotoPath }) => {
  const localizacao =
    latitude && longitude
      ? `${endereco} (Coordenadas: ${latitude}, ${longitude})`
      : endereco;

  const mailOptions = {
    from: `"CidadãoCloud Fortaleza" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: `Nova denúncia: ${categoria}`,
    html: `
      <h2>Nova denúncia recebida pelo CidadãoCloud</h2>
      <p><strong>Categoria:</strong> ${categoria}</p>
      <p><strong>Localização:</strong> ${localizacao}</p>
      <p>Segue em anexo a foto do problema registrado pelo cidadão.</p>
      <br/>
      <small>Mensagem enviada automaticamente pelo sistema CidadãoCloud Fortaleza.</small>
    `,
    attachments: [
      {
        filename: "foto_denuncia.jpg",
        path: fotoPath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { enviarEmail };
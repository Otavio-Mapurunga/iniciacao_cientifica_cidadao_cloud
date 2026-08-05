const tf = require("@tensorflow/tfjs");
const { Jimp } = require("jimp");
const path = require("path");
const https = require("https");

const MODEL_URL = "https://storage.googleapis.com/tm-model/9xU1ESbyW/";

let modelo = null;
let metadata = null;

const fetchJSON = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
      res.on("error", reject);
    });
  });
};

const carregarModelo = async () => {
  if (!modelo) {
    console.log("Carregando modelo do Teachable Machine...");
    metadata = await fetchJSON(MODEL_URL + "metadata.json");
    modelo = await tf.loadLayersModel(MODEL_URL + "model.json");
    console.log("Modelo carregado! Classes:", metadata.labels);
  }
  return { modelo, metadata };
};

const classificarImagem = async (fotoPath) => {
  const { modelo, metadata } = await carregarModelo();

  // Lê e processa a imagem com Jimp
  const img = await Jimp.read(path.resolve(fotoPath));
  img.resize({w:224, h:224});

  const imageData = [];
  img.scan(0, 0, 224, 224, (x, y, idx) => {
    imageData.push(img.bitmap.data[idx] / 255);     // R
    imageData.push(img.bitmap.data[idx + 1] / 255); // G
    imageData.push(img.bitmap.data[idx + 2] / 255); // B
  });

  // Converte pra tensor e faz a predição
  const tensor = tf.tensor4d(imageData, [1, 224, 224, 3]);
  const predictions = await modelo.predict(tensor).data();
  tensor.dispose();

  // Monta o resultado com as classes
  const resultado = metadata.labels.map((label, i) => ({
    className: label,
    probability: predictions[i],
  }));

  // Pega a classe com maior probabilidade
  const melhorResultado = resultado.reduce((a, b) =>
    a.probability > b.probability ? a : b
  );

  console.log("Resultado da classificação:", resultado);

  return {
    categoria: melhorResultado.className,
    confianca: (melhorResultado.probability * 100).toFixed(2),
    todas: resultado,
  };
};

module.exports = { classificarImagem };
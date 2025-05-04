const express = require('express');
const bodyParser = require('body-parser');
const verifyDocument = require('./api/idanalyzer');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/api/idanalyzer', async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    const verificationResult = await verifyDocument(imageBase64);
    res.json(verificationResult);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
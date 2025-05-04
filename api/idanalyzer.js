const axios = require('axios');

async function verifyDocument(imageBase64) {
  const apiKey = 'SEHTlBvcH1k7KIv4dDAnePucKs0gOteU';
  
  const data = {
    imageBase64: imageBase64,
    apiKey: apiKey
  };

  try {
    const response = await axios.post('https://api.idanalyzer.com/v1/verify', data);
    return response.data;
  } catch (error) {
    throw new Error('Erro na verificação do documento: ' + error.message);
  }
}

module.exports = verifyDocument;
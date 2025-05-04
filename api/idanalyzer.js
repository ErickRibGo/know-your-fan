import FormData from 'form-data';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: 'Image not provided' });
  }

  try {
    const form = new FormData();
    form.append('apikey', process.env.IDANALYZER_API_KEY);
    form.append('image', imageBase64.replace(/^data:image\/\w+;base64,/, '')); // remove cabeçalho
    form.append('outputface', 'true');

    const response = await fetch('https://api.idanalyzer.com/coreapi', {
      method: 'POST',
      body: form,
    });

    const data = await response.json();

    if (data.error) {
      console.error('Erro IDAnalyzer:', data.error);
      return res.status(400).json({ error: data.error.message || 'Erro ao verificar documento.' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro no backend:', error);
    return res.status(500).json({ error: 'Erro interno ao verificar documento.' });
  }
}
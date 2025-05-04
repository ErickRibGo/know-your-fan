import formidable from 'formidable'; 
import fs from 'fs'; 
import FormData from 'form-data'; 
import fetch from 'node-fetch';

export const config = { api: { bodyParser: false, }, };

export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ error: 'Only POST allowed' }); }

const form = new formidable.IncomingForm();

form.parse(req, async (err, fields, files) => { if (err) { console.error('Erro ao processar form:', err); return res.status(500).json({ error: 'Erro ao processar o upload.' }); }

const file = files.documento;
if (!file) {
  return res.status(400).json({ error: 'Arquivo do documento não encontrado.' });
}

try {
  const formData = new FormData();
  formData.append('apikey', process.env.IDANALYZER_API_KEY);
  formData.append('file', fs.createReadStream(file.filepath));
  formData.append('outputface', 'true');

  const response = await fetch('https://api.idanalyzer.com/coreapi', {
    method: 'POST',
    body: formData,
    headers: formData.getHeaders(),
  });

  const data = await response.json();

  if (data.error) {
    console.error('Erro IDAnalyzer:', data.error);
    return res.status(400).json({ error: data.error.message || 'Erro na verificação.' });
  }

  return res.status(200).json(data);
} catch (error) {
  console.error('Erro no backend:', error);
  return res.status(500).json({ error: 'Erro interno ao verificar documento.' });
}

}); }
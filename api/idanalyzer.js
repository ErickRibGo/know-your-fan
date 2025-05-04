export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST allowed' });
    }
  
    const { imageBase64 } = req.body;
  
    try {
      const response = await fetch('https://api.idanalyzer.com/coreapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apikey: process.env.IDANALYZER_API_KEY,
          image: imageBase64,
          outputface: true,
        }),
      });
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Erro no backend:', error);
      return res.status(500).json({ error: 'Erro ao verificar documento' });
    }
  }
  
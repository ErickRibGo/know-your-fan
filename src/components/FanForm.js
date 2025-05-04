import { useState } from 'react';
import './FanForm.css';

function FanForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    endereco: '',
    interesse: '',
    plataforma: '',
    linkPerfil: '',
    eventos: '',
    atividadesEsports: '',
    comprasRecentes: ''
  });

  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'cpf') {
      newValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .substring(0, 14);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const validateField = (name, value) => {
    if (!value) return false;
    switch (name) {
      case 'nome':
        return value.length >= 3;
      case 'cpf':
        return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
      case 'linkPerfil':
        return value.startsWith('http://') || value.startsWith('https://');
      default:
        return true;
    }
  };

  const allFieldsValid = Object.entries(formData).every(([key, value]) =>
    validateField(key, value)
  ) && file;

  const getInputClass = (fieldName) => {
    return touched[fieldName] && !validateField(fieldName, formData[fieldName]) ? 'invalid' : '';
  };

  const handleDocumentUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(',')[1];

        try {
          const response = await fetch('/api/idanalyzer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64 }),
          });

          const data = await response.json();
          resolve(data);
        } catch (err) {
          console.error('Erro ao enviar documento:', err);
          reject(err);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    if (!formData.linkPerfil.startsWith('http://') && !formData.linkPerfil.startsWith('https://')) {
      setError('Por favor, insira um link de perfil válido que comece com http:// ou https://');
      setIsSubmitting(false);
      return;
    }

    if (!file) {
      setError('Por favor, envie uma imagem ou PDF do seu documento.');
      setIsSubmitting(false);
      return;
    }

    try {
      const verifyData = await handleDocumentUpload(file);
      console.log('Resultado IDAnalyzer:', verifyData);

      if (!verifyData.success) {
        throw new Error('Falha na verificação do documento.');
      }

      const nomeNoDoc = verifyData.result.name?.fullName || '';
      if (!nomeNoDoc.toLowerCase().includes(formData.nome.toLowerCase().split(' ')[0])) {
        throw new Error('Nome no documento não confere com o nome informado.');
      }

    } catch (error) {
      console.error(error);
      setError('Falha na verificação do documento: ' + error.message);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://erickgonce.app.n8n.cloud/webhook/df02e7ff-1ae2-4c9e-b428-54baef949c50", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para o n8n");
      }

      setSuccessMessage('✅ Dados enviados com sucesso!');
      onSubmit(formData);
    } catch (err) {
      console.error('Erro ao enviar:', err);
      setError('Erro ao enviar os dados. Verifique sua conexão ou o endereço do webhook.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fan-form">
      <input type="text" name="nome" placeholder="Seu nome completo" value={formData.nome} onChange={handleChange} onBlur={handleBlur} className={getInputClass('nome')} required />
      <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} onBlur={handleBlur} className={getInputClass('cpf')} required />
      <input type="text" name="endereco" placeholder="Endereço completo" value={formData.endereco} onChange={handleChange} onBlur={handleBlur} className={getInputClass('endereco')} required />

      <select name="interesse" value={formData.interesse} onChange={handleChange} onBlur={handleBlur} className={getInputClass('interesse')} required>
        <option value="" disabled hidden>Selecione seu time favorito</option>
        <option value="CS:GO / CS2">CS:GO / CS2</option>
        <option value="Valorant">Valorant</option>
        <option value="League of Legends">League of Legends</option>
        <option value="Rocket League">Rocket League</option>
        <option value="Apex Legends">Apex Legends</option>
        <option value="PUBG">PUBG</option>
        <option value="Dota 2">Dota 2</option>
        <option value="FURIA Academy">FURIA Academy</option>
        <option value="Outro">Outro</option>
      </select>

      <select name="plataforma" value={formData.plataforma} onChange={handleChange} onBlur={handleBlur} className={getInputClass('plataforma')} required>
        <option value="" disabled hidden>Selecione onde acompanha a FURIA</option>
        <option value="Instagram">Instagram</option>
        <option value="Twitter / X">Twitter / X</option>
        <option value="TikTok">TikTok</option>
        <option value="Twitch">Twitch</option>
        <option value="YouTube">YouTube</option>
        <option value="Facebook">Facebook</option>
        <option value="Site Oficial">Site Oficial</option>
        <option value="HLTV / Liquipedia">HLTV / Liquipedia</option>
        <option value="Outro">Outro</option>
      </select>

      <input type="url" name="linkPerfil" placeholder="Link de perfil (Faceit, HLTV, Insta...)" value={formData.linkPerfil} onChange={handleChange} onBlur={handleBlur} className={getInputClass('linkPerfil')} required />
      <input type="text" name="eventos" placeholder="Eventos que participou em 2024" value={formData.eventos} onChange={handleChange} onBlur={handleBlur} className={getInputClass('eventos')} />
      <input type="text" name="atividadesEsports" placeholder="Atividades com esports no último ano" value={formData.atividadesEsports} onChange={handleChange} onBlur={handleBlur} className={getInputClass('atividadesEsports')} />

      <select name="comprasRecentes" value={formData.comprasRecentes} onChange={handleChange} onBlur={handleBlur} className={getInputClass('comprasRecentes')}>
        <option value="" disabled hidden>Selecione sua compra recente</option>
        <option value="Camisa oficial">Camisa oficial</option>
        <option value="Boné ou acessório">Boné ou acessório</option>
        <option value="Produtos da loja física">Produtos da loja física</option>
        <option value="Skin personalizada">Skin personalizada</option>
        <option value="Assinatura ou serviço digital">Assinatura ou serviço digital</option>
        <option value="Ainda não comprei nada">Ainda não comprei nada</option>
      </select>

      <div className="file-upload">
        <label htmlFor="documento" className="file-label">
          Envie uma imagem do seu <strong>RG</strong> ou <strong>CNH (frente)</strong>:
        </label>
        <input
          type="file"
          id="documento"
          name="documento"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        {!file && <p className="file-hint">Formatos aceitos: imagem ou PDF.</p>}
      </div>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button type="submit" disabled={!allFieldsValid || isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}

export default FanForm;
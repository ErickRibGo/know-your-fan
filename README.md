<h1 align="center">🔥 KNOW YOUR FAN — FURIA TECH 2025</h1>
<p align="center">
  Uma aplicação React completa com verificação documental e envio automatizado de dados. <br />
  <strong>Desenvolvido com dedicação para o desafio técnico da FURIA Tech 2025.</strong>
</p>

---

## 🧠 Sobre o Projeto

**Know Your Fan** é uma plataforma web criada para o desafio de estágio em Engenharia de Software da FURIA Tech 2025. O objetivo é simular um processo de identificação e registro de fãs reais da organização, com foco em segurança, automação e identidade visual.

A aplicação utiliza React no front-end, verificação documental automatizada via API da **IdAnalyzer**, integração com **n8n** para automação do backend, e hospedagem via **Vercel**. Tudo foi pensado para refletir inovação, praticidade e escalabilidade.

---

## 🎯 Funcionalidades

- ✅ **Formulário completo para identificação do fã**
  - Dados pessoais, redes sociais, histórico de participação e preferências.

- 🪪 **Validação automática de documento (RG ou CNH)**
  - Upload de imagem/pdf, envio em base64 para API da IdAnalyzer.
  - Verificação do nome informado vs. nome no documento.

- 🧠 **Envio de dados automatizado via Webhook (n8n)**
  - Após a verificação, os dados são enviados para um cenário n8n que pode registrar, notificar ou armazenar as informações.

- 🛡️ **Proteção contra CORS usando funções serverless (Vercel API)**
  - Intermediador backend seguro entre o front-end e a API do IdAnalyzer.

- 🌐 **Hospedagem e deploy automático com Vercel**
  - Projeto pronto para ser acessado online com CI/CD automático.

---

## 💻 Tecnologias Utilizadas

| Tecnologia       | Finalidade                              |
|------------------|------------------------------------------|
| React + Vite     | Interface web moderna e rápida           |
| JavaScript (ES6) | Lógica da aplicação                      |
| CSS Puro         | Estilização responsiva e clara           |
| Vercel           | Backend (Serverless Functions) + Deploy  |
| IdAnalyzer API   | OCR e verificação de documentos           |
| n8n.cloud        | Automatização via Webhook                |
| Git + GitHub     | Versionamento do código                  |

---

## 📹 Demonstração

> 🛠️ O vídeo com a aplicação em funcionamento será enviado até o prazo final.
> 
> Link (em breve): [📺 Apresentação — Know Your Fan](#)

---

## 🧪 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seuusuario/know-your-fan.git

# Acesse o projeto
cd know-your-fan

# Instale as dependências
npm install

# Crie o arquivo de ambiente .env com sua chave de API
echo "IDANALYZER_API_KEY=sua-chave-aqui" > .env

# Rode o projeto em modo de desenvolvimento
npm run dev

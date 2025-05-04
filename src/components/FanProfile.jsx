function FanProfile({ data }) {
    return (
      <div className="fan-profile">
        <h2>🔥 Perfil FURIOSO</h2>
        <p>🎮 <strong>{data.nome}</strong>, você é fã da FURIA no {data.interesse}!</p>
        <p>📍 Mora em: {data.endereco}</p>
        <p>🕹️ Acompanha pela: {data.plataforma}</p>
        <p>🔗 Perfil: <a href={data.linkPerfil} target="_blank">{data.linkPerfil}</a></p>
        <p>💾 Seus dados foram salvos com sucesso no nosso sistema FURIOSO! 🖤</p>
      </div>
    );
  }
  
  export default FanProfile;
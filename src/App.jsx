import { useState } from 'react';
import FanForm from './components/FanForm';
import FanProfile from './components/FanProfile';
import './App.css';

function App() {
  const [fanData, setFanData] = useState(null);

  return (
    <>
      {/* VÍDEO DE FUNDO */}
      <video autoPlay muted loop className="background-video">
        <source src="/videos/furia-gameplay.mp4" type="video/mp4" />
      </video>

      {/* CONTEÚDO */}
      <div className="app-container">
        <img src="/logo-furia.png" alt="Logo FURIA" className="logo" />
        <h1 className="title">Pesquisa Furiosa</h1>
        {!fanData ? <FanForm onSubmit={setFanData} /> : <FanProfile data={fanData} />}
      </div>
    </>
  );
}

export default App;
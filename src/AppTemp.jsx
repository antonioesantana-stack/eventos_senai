import React, { useState, useEffect } from 'react';
import './App.css';

import Home from './components/Home';
import CadastrarPalestrante from './components/CadastrarPalestrante';
import ListarPalestrantes from './components/ListarPalestrantes';
import CadastrarEvento from './components/CadastrarEvento';
import ListarEventos from './components/ListarEventos';
import Rodape from './components/rodape';


export default function App() {
  const [tela, setTela] = useState('home');
  const [palestrantes, setPalestrantes] = useState([]);
  const [eventos, setEventos] = useState([]);

  // Estados dos Formulários
  const [formPalestrante, setFormPalestrante] = useState({ nome: '', email: '', especialidade: '' });
  const [formEvento, setFormEvento] = useState({ titulo: '', data_evento: '', palestrantes_id: '' });

  const carregarPalestrantes = () => {
    fetch('http://localhost:3000/api/palestrantes')
      .then(res => res.json())
      .then(data => setPalestrantes(data))
      .catch(err => console.error("Erro ao buscar palestrantes:", err));
  };

  const carregarEventos = () => {
    fetch('http://localhost:3000/api/eventos')
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error("Erro ao buscar eventos:", err));
  };

  useEffect(() => {
    carregarPalestrantes();
    carregarEventos();
  }, []);

  // 👇 Função Corrigida com captura de erros reais!
  const cadastrarPalestrante = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/api/palestrantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPalestrante)
      });
      
      const dados = await resposta.json();
      
      if (!resposta.ok) {
        throw new Error(dados.erro || dados.error || "Erro misterioso no servidor");
      }
      
      alert(" Palestrante cadastrado com sucesso!");
      setFormPalestrante({ nome: '', email: '', especialidade: '' });
      carregarPalestrantes();
      setTela('listarPalestrantes');
    } catch (err) {
      console.error(" Erro capturado:", err);
      alert("Falha ao cadastrar: " + err.message);
    }
  };

  // 👇 BÔNUS: Função de Eventos também protegida!
  const cadastrarEvento = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEvento)
      });
      
      const dados = await resposta.json();
      
      if (!resposta.ok) {
        throw new Error(dados.erro || dados.error || "Erro misterioso no servidor");
      }
      
      alert(" Evento cadastrado com sucesso!");
      setFormEvento({ titulo: '', data_evento: '', palestrantes_id: '' });
      carregarEventos();
      setTela('listarEventos');
    } catch (err) {
      console.error(" Erro capturado:", err);
      alert("Falha ao cadastrar evento: " + err.message);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 onClick={() => setTela('home')} style={{ cursor: 'pointer' }}>SENAI Eventos </h1>
      </header>

      <main className="app-conteudo">
        {tela === 'home' && <Home setTela={setTela} />}
        
        {tela === 'cadastrarPalestrante' && (
          <CadastrarPalestrante 
            setTela={setTela} 
            formPalestrante={formPalestrante} 
            setFormPalestrante={setFormPalestrante} 
            cadastrarPalestrante={cadastrarPalestrante} 
          />
        )}
        
        {tela === 'listarPalestrantes' && <ListarPalestrantes setTela={setTela} palestrantes={palestrantes} />}
        
        {tela === 'cadastrarEvento' && (
          <CadastrarEvento 
            setTela={setTela} 
            formEvento={formEvento} 
            setFormEvento={setFormEvento} 
            palestrantes={palestrantes} 
            cadastrarEvento={cadastrarEvento} 
          />
        )}
        
        {tela === 'listarEventos' && <ListarEventos setTela={setTela} eventos={eventos} />}
      </main>
      <Rodape />
    </div>
  );
}
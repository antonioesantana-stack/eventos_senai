import React from 'react';
import logoSenai from '../assets/senai.png'; // Caminho correto para pegar sua imagem

export default function Rodape() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Lado Esquerdo: Logo do SENAI */}
        <div className="footer-logo-area">
          <img src={logoSenai} alt="Logo SENAI" className="footer-logo" />
        </div>

        {/* Lado Centro/Direito: Créditos e Ano */}
        <div className="footer-info">
          <p className="footer-text">© 2026 SenaiEventos. Todos os direitos reservados.</p>
          <p className="footer-dev">Desenvolvido por Antonio e Lara</p>
        </div>
      </div>
    </footer>
  );
}
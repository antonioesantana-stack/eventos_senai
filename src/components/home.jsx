import React from 'react';

export default function Home() {
  return (
    <div> {/* Sem a tag <Rodape /> aqui dentro! */}
      <div className="grid-menu">
        <div className="card-menu">
          <h3>🎤 Novo Palestrante</h3>
          <p>Cadastre palestrantes e suas áreas de atuação.</p>
        </div>

        <div className="card-menu">
          <h3>📋 Listar Palestrantes</h3>
          <p>Gerencie todos os palestrantes ativos.</p>
        </div>

        <div className="card-menu">
          <h3>📅 Criar Novo Evento</h3>
          <p>Monte uma agenda vinculando a um palestrante.</p>
        </div>

        <div className="card-menu">
          <h3>👁️ Visualizar Eventos</h3>
          <p>Confira a listagem de eventos agendados.</p>
        </div>
      </div>
    </div>
  );
}
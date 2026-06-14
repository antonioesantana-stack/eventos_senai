import React from 'react';

export default function Home({ setTela }) {
  return (
    <div>
      <div className="grid-menu">
        
        {/* CARD 1 - CADASTRAR PALESTRANTE */}
        <div className="card-menu" onClick={() => setTela('cadastrarPalestrante')}>
          <h3>Novo Palestrante</h3>
          <p>Cadastre palestrantes e suas áreas de atuação.</p>
        </div>

        {/* CARD 2 - LISTAR PALESTRANTES */}
        <div className="card-menu" onClick={() => setTela('listarPalestrantes')}>
          <h3>Listar Palestrantes</h3>
          <p>Gerencie todos os palestrantes ativos.</p>
        </div>

        {/* CARD 3 - CADASTRAR EVENTO */}
        <div className="card-menu" onClick={() => setTela('cadastrarEvento')}>
          <h3>Criar Novo Evento</h3>
          <p>Monte uma agenda vinculando a um palestrante.</p>
        </div>

        {/* CARD 4 - LISTAR EVENTOS */}
        <div className="card-menu" onClick={() => setTela('listarEventos')}>
          <h3>Visualizar Eventos</h3>
          <p>Confira a listagem de eventos agendados.</p>
        </div>

      </div>
    </div>
  );
}
import React from 'react';

export default function ListarPalestrantes({ setTela, palestrantes }) {
  return (
    <div>
      <div className="topo-lista">
        <h2> Palestrantes Cadastrados</h2>
        <button onClick={() => setTela('home')} className="btn-voltar-pequeno">Voltar</button>
      </div>
      <table className="tabela-dados">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Especialidade</th>
          </tr>
        </thead>
        <tbody>
          {palestrantes.map(p => (
            <tr key={p.id_palestrantes} className="linha-tabela">
              <td>{p.id_palestrantes}</td>
              <td>{p.nome}</td>
              <td>{p.email}</td>
              <td>{p.especialidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
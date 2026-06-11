import React from 'react';

export default function CadastrarEvento({ setTela, formEvento, setFormEvento, palestrantes, cadastrarEvento }) {
  return (
    <div className="box-form">
      <h2> Criar Novo Evento</h2>
      <form onSubmit={cadastrarEvento} className="form-grupo">
        <label>Título do Evento:</label>
        <input type="text" className="input-field" required value={formEvento.titulo} onChange={e => setFormEvento({...formEvento, titulo: e.target.value})}/>
        
        <label>Data e Horário:</label>
        <input type="datetime-local" className="input-field" required value={formEvento.data_evento} onChange={e => setFormEvento({...formEvento, data_evento: e.target.value})}/>
        
        <label>Selecione o Palestrante Responsável:</label>
        <select className="input-field" required value={formEvento.palestrantes_id} onChange={e => setFormEvento({...formEvento, palestrantes_id: e.target.value})}>
          <option value="">-- Escolha um Palestrante --</option>
          {palestrantes.map(p => (
            <option key={p.id_palestrantes} value={p.id_palestrantes}>{p.nome}</option>
          ))}
        </select>
        
        <button type="submit" className="btn-salvar">Salvar Evento</button>
        <button type="button" onClick={() => setTela('home')} className="btn-voltar">Voltar ao Menu</button>
      </form>
    </div>
  );
}
import React from 'react';

export default function CadastrarPalestrante({ setTela, formPalestrante, setFormPalestrante, cadastrarPalestrante }) {
  return (
    <div className="box-form">
      <h2>Cadastrar Novo Palestrante</h2>
      <form onSubmit={cadastrarPalestrante} className="form-grupo">
        <label>Nome Completo:</label>
        <input type="text" className="input-field" required value={formPalestrante.nome} onChange={e => setFormPalestrante({...formPalestrante, nome: e.target.value})}/>
        
        <label>E-mail de Contato:</label>
        <input type="email" className="input-field" required value={formPalestrante.email} onChange={e => setFormPalestrante({...formPalestrante, email: e.target.value})}/>
        
        <label>Especialidade / Área:</label>
        <input type="text" className="input-field" required value={formPalestrante.especialidade} onChange={e => setFormPalestrante({...formPalestrante, especialidade: e.target.value})}/>
        
        <button type="submit" className="btn-salvar">Salvar Palestrante</button>
        <button type="button" onClick={() => setTela('home')} className="btn-voltar">Voltar ao Menu</button>
      </form>
    </div>
  );
}
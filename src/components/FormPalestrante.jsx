import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserPlus, FaUserTie, FaTrash, FaPen } from 'react-icons/fa';

function FormPalestrante() {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [palestrantes, setPalestrantes] = useState([]);

  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const buscarPalestrantes = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/api/palestrantes');
      setPalestrantes(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar palestrantes:", erro);
    }
  };

  useEffect(() => {
    buscarPalestrantes();
  }, []);

  const salvarFormulario = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`http://localhost:3000/api/palestrantes/${idEditando}`, {
          nome,
          especialidade,
          email,
          telefone
        });
        alert('Palestrante atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/api/palestrantes', {
          nome,
          especialidade,
          email,
          telefone
        });
        alert(' Palestrante cadastrado com sucesso!');
      }
      resetarFormulario();
      buscarPalestrantes();
    } catch (erro) {
      console.error(erro);
      alert(' Erro ao salvar dados.');
    }
  };

  const iniciarEdicao = (p) => {
    setEditando(true);
    setIdEditando(p.id_palestrantes);
    setNome(p.nome);
    setEspecialidade(p.especialidade);
    setEmail(p.email);
    setTelefone(p.telefone || '');
  };

  const resetarFormulario = () => {
    setEditando(false);
    setIdEditando(null);
    setNome('');
    setEspecialidade('');
    setEmail('');
    setTelefone('');
  };

  const deletar = async (id, nomePalestrante) => {
    const confirmar = window.confirm(`Tem certeza que deseja excluir o palestrante "${nomePalestrante}"?`);
    if (confirmar) {
      try {
        await axios.delete(`http://localhost:3000/api/palestrantes/${id}`);
        alert('❌ Palestrante excluído com sucesso!');
        if (idEditando === id) resetarFormulario();
        buscarPalestrantes();
      } catch (erro) {
        console.error(erro);
        alert('⚠️ Não foi possível deletar.');
      }
    }
  };

  return (
    <div className="main-container">
      {/* SEÇÃO DO FORMULÁRIO COM DESATIVAÇÃO DE AUTOFILL DO CHROME */}
      <div className="form-section">
        <h2>{editando ? '📝 Editar Palestrante' : 'Novo Palestrante'}</h2>
        
        <form onSubmit={salvarFormulario} className="palestrante-form" autoComplete="off">
          <input 
            type="text" placeholder="Nome completo" required autoComplete="new-password"
            value={nome} onChange={(e) => setNome(e.target.value)} 
          />
          <input 
            type="text" placeholder="Especialidade (ex: IA, Robótica)" required autoComplete="new-password"
            value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} 
          />
          <input 
            type="email" placeholder="E-mail" required autoComplete="new-password"
            value={email} onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="text" placeholder="Telefone" autoComplete="new-password"
            value={telefone} onChange={(e) => setTelefone(e.target.value)} 
          />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* ESTRUTURAS TOTALMENTE FIXAS E EM BLOCOS SEPARADOS PARA O DOM */}
            {!editando && (
              <button type="submit" className="btn-cadastrar" style={{ flex: 1 }}>
                <FaUserPlus /> Cadastrar
              </button>
            )}

            {editando && (
              <>
                <button type="submit" className="btn-cadastrar" style={{ flex: 1 }}>
                   Salvar Alterações
                </button>
                <button type="button" className="btn-cancelar" onClick={resetarFormulario}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* SEÇÃO DA TABELA */}
      <div className="lista-section">
        <h2>Palestrantes Confirmados</h2>
        {palestrantes.length === 0 ? (
          <p className="sem-dados">Nenhum palestrante cadastrado ainda.</p>
        ) : (
          <table className="tabela-palestrantes">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Especialidade</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {palestrantes.map((p) => (
                <tr key={p.id_palestrantes}>
                  <td className="nome-celula">
                    <FaUserTie style={{ color: '#0056b3' }} /> {p.nome}
                  </td>
                  <td>{p.especialidade}</td>
                  <td>{p.email}</td>
                  <td>
                    <div className="acoes-celula">
                      <button 
                        type="button"
                        className="btn-editar" 
                        title="Editar"
                        onClick={() => iniciarEdicao(p)}
                      >
                        <FaPen />
                      </button>

                      <button 
                        type="button"
                        className="btn-deletar" 
                        title="Excluir"
                        onClick={() => deletar(p.id_palestrantes, p.nome)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FormPalestrante;
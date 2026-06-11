import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarPlus, FaCalendarAlt, FaTrash, FaPen } from 'react-icons/fa';

function FormEvento() {
  const [titulo, setTitulo] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [palestranteId, setPalestranteId] = useState('');
  
  const [eventos, setEventos] = useState([]);
  const [listaPalestrantes, setListaPalestrantes] = useState([]);

  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // Busca os Eventos cadastrados
  const buscarEventos = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/api/eventos');
      setEventos(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar eventos:", erro);
    }
  };

  // Busca os Palestrantes para o campo de seleção (Select)
  const buscarPalestrantes = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/api/palestrantes');
      setListaPalestrantes(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar palestrantes:", erro);
    }
  };

  // Carrega tudo ao abrir a tela
  useEffect(() => {
    buscarEventos();
    buscarPalestrantes();
  }, []);

  // Salvar ou Atualizar
  const salvarFormulario = async (e) => {
    e.preventDefault();
    try {
      const dadosEvento = {
        titulo,
        data_evento: dataEvento,
        palestrantes_id: palestranteId ? parseInt(palestranteId) : null
      };

      if (editando) {
        await axios.put(`http://localhost:3000/api/eventos/${idEditando}`, dadosEvento);
        alert('🔄 Evento atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/api/eventos', dadosEvento);
        alert('🎉 Evento cadastrado com sucesso!');
      }
      resetarFormulario();
      buscarEventos();
    } catch (erro) {
      console.error(erro);
      alert('❌ Erro ao salvar o evento.');
    }
  };

  // Prepara edição
  const iniciarEdicao = (ev) => {
    setEditando(true);
    setIdEditando(ev.id_eventos);
    setTitulo(ev.titulo);
    
    // Formata a data e hora para o input datetime-local
    if (ev.data_evento) {
      const dataInjetada = new Date(ev.data_evento);
      const tzOffset = dataInjetada.getTimezoneOffset() * 60000;
      const dataLocalISO = new Date(dataInjetada.getTime() - tzOffset).toISOString().slice(0, 16);
      setDataEvento(dataLocalISO);
    } else {
      setDataEvento('');
    }
    
    setPalestranteId(ev.palestrantes_id || '');
  };

  const resetarFormulario = () => {
    setEditando(false);
    setIdEditando(null);
    setTitulo('');
    setDataEvento('');
    setPalestranteId('');
  };

  // Excluir evento
  const deletar = async (id, tituloEvento) => {
    const confirmar = window.confirm(`Deseja realmente excluir o evento "${tituloEvento}"?`);
    if (confirmar) {
      try {
        await axios.delete(`http://localhost:3000/api/eventos/${id}`);
        alert('❌ Evento excluído com sucesso!');
        if (idEditando === id) resetarFormulario();
        buscarEventos();
      } catch (erro) {
        console.error(erro);
        alert('⚠️ Não foi possível deletar o evento.');
      }
    }
  };

  return (
    <div className="main-container">
      {/* SEÇÃO DO FORMULÁRIO */}
      <div className="form-section">
        <h2>{editando ? '📝 Editar Evento' : 'Novo Evento'}</h2>
        
        <form onSubmit={salvarFormulario} className="palestrante-form" autoComplete="off">
          <input 
            type="text" placeholder="Título do Evento" required autoComplete="new-password"
            value={titulo} onChange={(e) => setTitulo(e.target.value)} 
          />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '12px', color: '#666', paddingLeft: '5px' }}>Data e Horário do Evento:</label>
            <input 
              type="datetime-local" required
              value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} 
            />
          </div>

          <select 
            required
            value={palestranteId} 
            onChange={(e) => setPalestranteId(e.target.value)}
          >
            <option value="">Selecione o Palestrante Responsável</option>
            {listaPalestrantes.map((p) => (
              <option key={p.id_palestrantes} value={p.id_palestrantes}>
                {p.nome} ({p.especialidade})
              </option>
            ))}
          </select>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {/* BOTÕES SEPARADOS PARA EVITAR ERRO NO CHROME */}
            {!editando && (
              <button type="submit" className="btn-cadastrar" style={{ flex: 1 }}>
                <FaCalendarPlus /> Cadastrar Evento
              </button>
            )}

            {editando && (
              <>
                <button type="submit" className="btn-cadastrar" style={{ flex: 1 }}>
                  💾 Salvar Alterações
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
        <h2>Eventos Agendados</h2>
        {eventos.length === 0 ? (
          <p className="sem-dados">Nenhum evento agendado ainda.</p>
        ) : (
          <table className="tabela-palestrantes">
            <thead>
              <tr>
                <th>Título</th>
                <th>Data e Hora</th>
                <th>Palestrante</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((ev) => (
                <tr key={ev.id_eventos}>
                  <td className="nome-celula">
                    <FaCalendarAlt style={{ color: '#28a745' }} /> {ev.titulo}
                  </td>
                  <td>
                    {new Date(ev.data_evento).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short'
                    })}
                  </td>
                  <td>{ev.nome_palestrante || `ID: ${ev.palestrantes_id}`}</td>
                  <td>
                    <div className="acoes-celula">
                      <button 
                        type="button" className="btn-editar" title="Editar"
                        onClick={() => iniciarEdicao(ev)}
                      >
                        <FaPen />
                      </button>

                      <button 
                        type="button" className="btn-deletar" title="Excluir"
                        onClick={() => deletar(ev.id_eventos, ev.titulo)}
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

export default FormEvento;
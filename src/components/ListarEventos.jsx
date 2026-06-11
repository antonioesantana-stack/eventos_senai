import React, { useEffect, useState } from "react";

export default function ListarEventos({ setTela }) {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Como é web, o localhost funciona perfeitamente!
        fetch("http://localhost:3000/api/eventos")
            .then(res => res.json())
            .then(data => {
                setEventos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar eventos na web:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.titulo}>Eventos Agendados </h2>
                {setTela && (
                    <button style={styles.btnVoltar} onClick={() => setTela('home')}>
                        Voltar
                    </button>
                )}
            </div>

            {loading ? (
                <p style={styles.loading}>Carregando os eventos...</p>
            ) : (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Título do Evento</th>
                                <th style={styles.th}>Data e Hora</th>
                                <th style={styles.th}>Palestrante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.length > 0 ? (
                                eventos.map(evento => (
                                    <tr key={evento.id || evento.id_eventos} style={styles.tableRow}>
                                        <td style={styles.td}>{evento.id || evento.id_eventos}</td>
                                        <td style={styles.td}>{evento.titulo}</td>
                                        <td style={styles.td}>
                                            {new Date(evento.data_evento).toLocaleString('pt-BR', {
                                                day: '2-digit', month: '2-digit', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}h
                                        </td>
                                        <td style={styles.td}>{evento.palestrante_nome || evento.palestrante || "Não informado"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={styles.empty}>Nenhum evento cadastrado ainda.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// Estilos direto no arquivo para facilitar a sua vida e não precisar criar outro arquivo CSS
const styles = {
    container: {
        padding: '30px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '1000px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    titulo: {
        color: '#002776',
        margin: 0
    },
    btnVoltar: {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    loading: {
        textAlign: 'center',
        color: '#666',
        fontSize: '18px',
        marginTop: '50px'
    },
    tableContainer: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    tableHeader: {
        backgroundColor: '#002776',
        color: 'white',
        textAlign: 'left'
    },
    th: {
        padding: '15px',
        fontWeight: 'bold'
    },
    tableRow: {
        borderBottom: '1px solid #eee'
    },
    td: {
        padding: '15px',
        color: '#333'
    },
    empty: {
        padding: '20px',
        textAlign: 'center',
        color: '#888'
    }
};
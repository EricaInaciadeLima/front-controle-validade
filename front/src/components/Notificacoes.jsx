import React from "react";

function Notificacoes({ produtos = [] }) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

const parseISODate = (isoString) => {
  if (!isoString) return null;
  const data = new Date(isoString);
  if (isNaN(data)) return null;
  data.setHours(0, 0, 0, 0);
  return data;
};

  const produtosComAlerta = produtos.filter((produto) => {
  const dataAlerta = parseISODate(produto.dataAlerta);
  if (!dataAlerta || isNaN(dataAlerta)) return false;

  const diff = (dataAlerta - hoje) / (1000 * 60 * 60 * 24);

  // vencidos (diff < 0) ou próximos (até 30 dias)
  return diff < 0 || diff <= 30;
});

  return (
    <div className="notificacoes-card">
      <h3>🔔 Notificações</h3>
     {produtosComAlerta.length === 0 ? (
  <p>Nenhum produto em alerta no momento.</p>
) : (
  <ul>
    {produtosComAlerta.map((produto) => {
      const dataAlerta = parseISODate(produto.dataAlerta);
      if (!dataAlerta) return null;

      const diff = (dataAlerta - hoje) / (1000 * 60 * 60 * 24);

      let status;
      if (diff < 0) {
        status = `⚠️ Vencido em ${dataAlerta.toLocaleDateString("pt-BR")}`;
      } else if (diff <= 7) {
        status = `⏳ Próximo de vencer em ${dataAlerta.toLocaleDateString("pt-BR")}`;
      } else {
        status = `✅ Fora do período de alerta (${dataAlerta.toLocaleDateString("pt-BR")})`;
      }

      return (
        <li key={produto.id}>
          <strong>{produto.nome}</strong> - {status}
        </li>
      );
    })}
  </ul>
)}
    </div>
  );
}

export default Notificacoes;
import { useEffect, useState } from "react";
import Produtos from "../components/Produtos";
import CadastroProduto from "../components/CadastroProduto";
import Notificacoes from "../components/Notificacoes";
import api from "../services/api";
import "../styles/Home.css";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const [showNotificacoes, setShowNotificacoes] = useState(false);

  // Buscar produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await api.get("/produto");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para salvar/atualizar produto
  const handleSaveProduto = async (produto) => {
    try {
      if (produto.id) {
        // Atualizar
        await api.put(`/produto/atualizar/${produto.id}`, produto);
      } else {
        // Cadastrar
        await api.post("/produto/cadastro", produto);
      }
      await fetchProdutos(); // atualiza lista
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <div className="home-wrapper">
      <header className="produtos-header">
        <h2>Produtos Cadastrados</h2>
        <div>
          <button onClick={() => setShowCadastro(true)}>Novo Produto</button>
          <button onClick={() => setShowNotificacoes(true)}>🔔 Notificações</button>
        </div>
      </header>

      <section className="home-content">
        <Produtos produtos={produtos} />
      </section>

      {/* Modal de Cadastro */}
      {showCadastro && (
        <div className="overlay">
          <CadastroProduto 
            onClose={() => setShowCadastro(false)} 
            onSave={handleSaveProduto} 
          />
        </div>
      )}

      {/* Modal de Notificações */}
      {showNotificacoes && (
        <div className="overlay">
          <div className="create-card">
            <Notificacoes produtos={produtos} />
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowNotificacoes(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
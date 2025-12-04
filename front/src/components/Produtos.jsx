import React, { useEffect, useState } from "react";
import api from "../services/api";
import CadastroProduto from "./CadastroProduto"; // importa o formulário
import "../styles/Produtos.css";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/produto");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/produto/deletar/${id}`);
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const handleUpdate = async (produtoAtualizado) => {
    await api.put(`/produto/atualizar/${produtoAtualizado.id}`, produtoAtualizado);
    setProdutos(produtos.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p));
    setProdutoEditando(null); // fecha modal
  };

  return (
    <div className="cards-container">
      {produtos.map((produto) => (
        <div key={produto.id} className="card-produto">
          <h3>{produto.nome}</h3>
          <p>Marca: {produto.marca}</p>
          <p>Categoria: {produto.categoria?.categoria}</p>
          <p>Validade: {produto.dataValidade}</p>

          <div className="card-actions">
            <button 
              className="btn-update"
              onClick={() => setProdutoEditando(produto)}
            >
              Atualizar
            </button>
            <button 
              className="btn-delete"
              onClick={() => handleDelete(produto.id)}
            >
              Deletar
            </button>
          </div>
        </div>
      ))}

      {produtoEditando && (
        <div className="overlay">
          <CadastroProduto 
            produtoInicial={produtoEditando} 
            onClose={() => setProdutoEditando(null)} 
            onSave={handleUpdate}
          />
        </div>
      )}
    </div>
  );
}

export default Produtos;
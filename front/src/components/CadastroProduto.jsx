import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/Produtos.css";

function CadastroProduto({ onClose, produtoInicial, onSave }) {
  const [produto, setProduto] = useState(
    produtoInicial || {
      nome: "",
      marca: "",
      categoria: "",
      dataFabricacao: "",
      dataValidade: "",
      dataAlerta: "",
      lote: ""
    }
  );

  const [categorias, setCategorias] = useState([]);
  const isEditing = !!produtoInicial;

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categoria");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await onSave(produto); // chama handleUpdate do pai
        alert("Produto atualizado com sucesso!");
      } else {
        await api.post("/produto/cadastro", {
          ...produto,
          categoria: { categoria: produto.categoria }
        });
        alert("Produto cadastrado com sucesso!");
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error.response?.data || error.message);
      alert("Erro ao salvar produto");
    }
  };

  return (
    <div className="create-card">
      <h3>{isEditing ? "Atualizar Produto" : "Cadastrar Produto"}</h3>
      <div className="form-create">
        <input
          type="text"
          placeholder="Nome"
          value={produto.nome}
          onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Marca"
          value={produto.marca}
          onChange={(e) => setProduto({ ...produto, marca: e.target.value })}
        />

        <select
          value={produto.categoria}
          onChange={(e) => setProduto({ ...produto, categoria: e.target.value })}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.categoria}>
              {cat.categoria}
            </option>
          ))}
        </select>

        <label htmlFor="dataFabricacao">Data de Fabricação</label>
        <input
          id="dataFabricacao"
          name="dataFabricacao"
          type="date"
          value={produto.dataFabricacao}
          onChange={(e) => setProduto({ ...produto, dataFabricacao: e.target.value })}
        />

        <label htmlFor="dataValidade">Data de Validade</label>
        <input
          id="dataValidade"
          name="dataValidade"
          type="date"
          value={produto.dataValidade}
          onChange={(e) => setProduto({ ...produto, dataValidade: e.target.value })}
        />

        <label htmlFor="dataAlerta">Data de Alerta</label>
        <input
          id="dataAlerta"
          name="dataAlerta"
          type="date"
          value={produto.dataAlerta}
          onChange={(e) => setProduto({ ...produto, dataAlerta: e.target.value })}
        />

        <input
          type="text"
          placeholder="Lote (opcional)"
          value={produto.lote}
          onChange={(e) => setProduto({ ...produto, lote: e.target.value })}
        />

        <div className="form-actions">
          <button className="btn-save" onClick={handleSubmit}>
            {isEditing ? "Atualizar Produto" : "Salvar Produto"}
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CadastroProduto;
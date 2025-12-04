import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; 
import api from "../services/api";

function Login() {
  const [nomePerfil, setNomePerfil] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/perfil/login", {
      nomePerfil,
      senha,
    });
    console.log("response", response.data.token);

    // Salva token e empresa
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("empresa", JSON.stringify(response.data.empresa));

    navigate("/home");
  } catch (err) {
    alert("Usuário ou senha inválidos");
  }
};
  return (
    <div className="login-container">
      <h2>Bem-vindo 👋</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={nomePerfil}
          onChange={(e) => setNomePerfil(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;

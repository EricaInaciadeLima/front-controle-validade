import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Não adiciona token no login
  if (token && !config.url.includes("/perfil/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const method = config.method?.toLowerCase();

  // Corrigido: só faz JSON.parse se existir empresa válida
  const empresaRaw = localStorage.getItem("empresa");
  let empresa = null;
  if (empresaRaw && empresaRaw !== "undefined") {
    try {
      empresa = JSON.parse(empresaRaw);
    } catch (e) {
      console.error("Erro ao parsear empresa:", e);
    }
  }

  const empresaId = empresa?.id;

if (empresaId && (method === "post" || method === "put")) {
    if (config.data && !config.data.empresa) {
      config.data.empresa = { id: empresaId };
      console.log("Interceptor adicionou empresa:", config.data);
    }
  }

  return config;
});

export default api;
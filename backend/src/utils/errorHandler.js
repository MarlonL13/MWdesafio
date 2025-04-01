const axios = require("axios");

function handleError(error) {
  // Verificar se o erro do axios
  if (axios.isAxiosError(error)) {
    // Verificar o status da resposta
    if (error.response) {
      // Resposta recebida do servidor (erro HTTP)
      const status = error.response.status;
      const message =
        error.response.data?.message ||
        error.message ||
        "Erro desconhecido no servidor";
      // Resposta personalizada baseada no codigo HTTP
      switch (status) {
        case 400:
          console.error(`[400 - Bad Request] ${message}`);
          throw new Error(
            "Requisição inválida. Verifique os parâmetros enviados."
          );
        case 401:
          console.error(`[401 - Unauthorized] ${message}`);
          throw new Error("Você não tem autorização para realizar esta ação.");
        case 404:
          console.error(`[404 - Not Found] ${message}`);
          throw new Error("Recurso não encontrado.");
        case 500:
          console.error(`[500 - Internal Server Error] ${message}`);
          throw new Error("Erro no servidor. Tente novamente mais tarde.");
        default:
          console.error(`[${status}] ${message}`);
          throw new Error("Erro desconhecido. Por favor, tente novamente.");
      }
    } else if (error.request) {
      // Nenhuma resposta recebida
      console.error("[Erro de rede] Sem resposta do servidor:", error.message);
      throw new Error(
        "Falha de rede. Verifique sua conexão ou tente novamente."
      );
    } else {
      // Erro ao configurar a requisição
      console.error("[Erro de configuração da requisição]", error.message);
      throw new Error("Erro ao configurar a requisição.");
    }
  } else {
    // Para erros não relacionados ao axios
    console.error("[Erro não tratado]", error.message);
    throw new Error("Ocorreu um erro desconhecido.");
  }
}

function handleZabbixError(error) {
  if (error.response) {
    // Erro do API Zabbix
    console.error("Erro na API Zabbix:", error.response.data);
    throw new Error(`Erro do Zabbix: ${JSON.stringify(error.response.data)}`);
  } else if (error.request) {
    // Error de resposta do servidor Zabbix
    console.error("Falha na comunicação com o Zabbix:", error.request);
    throw new Error("Não foi possível conectar ao servidor Zabbix.");
  } else {
    // Erro desconhecido
    console.error("Erro inesperado no Zabbix:", error.message);
    throw new Error(
      `Erro inesperado no Zabbix: ${JSON.stringify(error.message)}`
    );
  }
}

module.exports = { handleError, handleZabbixError };

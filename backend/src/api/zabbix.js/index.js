const axios = require("axios");
const { handleZabbixError } = require("../../utils/errorHandler.js");
const logger = require("../../custom/logger.js");

class ZabbixAPI {
  constructor(url, username, password) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.authToken = null;
  }

  async login() {
    const data = {
      jsonrpc: "2.0",
      method: "user.login",
      params: {
        user: this.username,
        password: this.password,
      },
      id: 1,
      auth: null,
    };

    try {
      const response = await axios.post(this.url + "/api_jsonrpc.php", data);
      this.authToken = response.data.result; // Armazena o token de autenticação
      if (response.data.error) {
        throw new Error(`${response.data.error.data}`);
      }
      return response.data;
    } catch (error) {
      handleZabbixError(error);
    }
  }

  async logout() {
    const data = {
      jsonrpc: "2.0",
      method: "user.logout",
      params: [],
      id: 1,
      auth: this.authToken,
    };

    try {
      const response = await axios.post(this.url + "/api_jsonrpc.php", data);
      return response.data;
    } catch (error) {
      handleZabbixError(error);
    }
  }
  // Método para obter os detalhes de um item específico
  async getItems(itemId) {
    const data = {
      jsonrpc: "2.0",
      method: "item.get",
      params: {
        filter: {
          itemid: itemId,
        },
        output: "extend",
        selectHosts: ["host"], // Isso inclui o nome do host na resposta
      },
      id: 1,
      auth: this.authToken,
    };

    try {
      const response = await axios.post(this.url + "/api_jsonrpc.php", data);
      if (response.data.error) {
        throw new Error(`${response.data.error.data}`);
      }
      return response.data.result.map((item) => {
        return {
          itemId: item.itemid,
          nome: item.name,
          key: item.key_,
          hostId: item.hostid,
          hostName: item.hosts?.[0]?.host || "Desconhecido",
          date: new Date(item.lastclock * 1000).toISOString()
        };
      });
    } catch (error) {
      handleZabbixError(error);
    }
  }
  // Método para obter o histórico de um item específico
  async getHistory(itemId) {
    const now = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    const timeFrom = now - 65; // Janela de busca (1 min e 5 seg atrás)
    const timeTill = now; // Até o momento atual

    const data = {
      jsonrpc: "2.0",
      method: "history.get",
      params: {
        output: "extend",
        history: 0,
        itemids: itemId,
        sortfield: "clock",
        sortorder: "DESC",
        time_from: timeFrom,
        time_till: timeTill,
      },
      id: 1,
      auth: this.authToken,
    };
    try {
      const response = await axios.post(this.url + "/api_jsonrpc.php", data);
      if (response.data.error) {
        throw new Error(`${response.data.error.data}`);
      }
      if (response.data.result.length === 0) {
        logger.warn(`Api Zabbix retornou valors nulos ou indefinidos para o item: ${itemId}`); 
      }
      return response.data.result;
    } catch (error) {
      handleZabbixError(error);
    }
  }
}
module.exports = ZabbixAPI;

const axios = require("axios");
const { handleZabbixError } = require("../../utils/errorHandler.js");

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
      if (error.message.includes("Incorrect user name or password")) {
        throw error;
      }
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

  async getItems(hostId, itemId) {
    const data = {
      jsonrpc: "2.0",
      method: "item.get",
      params: {
        filter: {
          itemid: itemId
        },
        output: ["name", "key_", "hostid"],
        hostids: hostId,
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
      return response.data.result.map((item) => ({
        nome: item.name,
        key: item.key_,
        hostId: item.hostid,
        hostName: item.hosts?.[0]?.host || "Desconhecido", // Garante que não quebra caso `hosts` seja vazio ou undefined
        date: new Date().toISOString(),
      }));
    } catch (error) {
      handleZabbixError(error);
    }
  }

  async getHistory(itemId) {
    const now = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    const timeFrom = now - 70; // Janela de busca (1 min e 10 seg atrás)
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
        limit: 10,
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
      return response.data.result;
    } catch (error) {
      if (error.message.includes("Not authorised")) {
        throw error;
      }
      handleZabbixError(error);
    }
  }
}
module.exports = ZabbixAPI;

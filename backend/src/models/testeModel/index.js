
module.exports = {
  async execute(params) {
    const { test } = params;
    
    try {
      // Conexões com o banco de dados e APIs externas
      return test;
    } catch (error) {
      console.error("Erro: ", error.message);
      throw new Error("Falha ao conectar com o banco!");
    }
  },
};

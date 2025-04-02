const { checkForErrors } = require("./errorCheckService.js");

// Latência do Usuário POP Ponta Negra 49798
// Latência do Usuário POP Praia do Meio 49801
// Latência do Usuário POP Tirol 49799
// Latência do Usuário POP Zona Norte 49800
// PacketLoss do Usuário POP Ponta Negra 49802
// PacketLoss do Usuário POP Praia do Meio 49805
// PacketLoss do Usuário POP Tirol 49803
// PacketLoss do Usuário POP Zona Norte 49804
// Ping do Usuário POP Ponta Negra 49806
// Ping do Usuário POP Praia do Meio 49809
// Ping do Usuário POP Tirol 49807
// Ping do Usuário POP Zona Norte 49808
// Potência RX do Usuário POP Ponta Negra 49810
// Potência RX do Usuário POP Praia do Meio 49813
// Potência RX do Usuário POP Tirol 49811
// Potência RX do Usuário POP Zona Norte 49812
// Tráfego de Entrada do Usuário POP Ponta Negra 49814
// Tráfego de Entrada do Usuário POP Praia do Meio 49817
// Tráfego de Entrada do Usuário POP Tirol 49815
// Tráfego de Entrada do Usuário POP Zona Norte 49816
// Tráfego de Saida do Usuário POP Ponta Negra 49818
// Tráfego de Saida do Usuário POP Praia do Meio 49821
// Tráfego de Saida do Usuário POP Tirol 49819
// Tráfego de Saida do Usuário POP Zona Norte 49820
// Potência TX do Usuário POP Ponta Negra 49822
// Potência TX do Usuário POP Praia do Meio 49825
// Potência TX do Usuário POP Tirol 49823
// Potência TX do Usuário POP Zona Norte 49824

checkForErrors(["49798", "49801", "49799", "49800"])
  .then(() => console.log("Teste concluído."))
  .catch((error) => console.error("Erro no teste:", error.message));

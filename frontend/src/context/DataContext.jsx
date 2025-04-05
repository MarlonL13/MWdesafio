import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [historyData, setHistoryData] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyResponse, alertResponse] = await Promise.all([
          axios.get("http://localhost:3335/history"),
          axios.get("http://localhost:3335/alert"),
        ]);

        setHistoryData(historyResponse.data);
        setAlertData(alertResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // WebSocket connection
    const socket = new WebSocket("ws://localhost:3335");

    socket.onopen = () => {
      // WebSocket connection opened
    };

    socket.onclose = () => {
      // WebSocket connection closed
    };

    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.message === "new_alert") {
          try {
            const alertResponse = await axios.get("http://localhost:3335/alert");
            setAlertData(alertResponse.data);
          } catch (error) {
            console.error("[ERRO DE ATUALIZAÇÃO DE ALERTA]", error.message);
            }
          }
          } catch (error) {
          console.error("[ERRO DE MENSAGEM WEBSOCKET]", error.message);
      }
    };

    // Clean up function
    return () => {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    };
  }, []);

  return (
    <DataContext.Provider value={{ historyData, alertData, loading }}>
      {children}
    </DataContext.Provider>
  );
};

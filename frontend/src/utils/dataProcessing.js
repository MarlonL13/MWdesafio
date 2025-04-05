import dayjs from "dayjs";

const LineChartData = (data, type) => {
    if (!data || !Array.isArray(data)) return [];
  
    // Filtra por tipo e agrupa pela key
    const groupedData = data
      .filter((item) => item.nome.toLowerCase().includes(type.toLowerCase()))
      .reduce((acc, item) => {
        const key = item.key;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item.date);
        return acc;
      }, {});
  
    return Object.entries(groupedData).map(([label, dates]) => ({
      label,
      values: dates.reduce((acc, date) => {
        const day = dayjs(date).format("YYYY-MM-DD"); // Formata para YYYY-MM-DD
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {}),
    }));
  };

  const prepareChartData = (data) => {
    // Extrai todos os dias únicos das séries e ordena
    const allDays = Array.from(
      new Set(data.flatMap((item) => Object.keys(item.values)))
    ).sort();
  
   // Extrai o nome da localizaçao
    const extractLocation = (key) => {
      return key.split("[POP ")[1]?.replace("]", "") || key;
    };
  
    // Configura o eixo y
    const chartSeries = data.map((item) => ({
      data: allDays.map((day) => item.values[day] || 0),
      label: extractLocation(item.label),
    }));
  
    return { allDays, chartSeries };
  };

  export { LineChartData, prepareChartData };
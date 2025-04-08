// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper function to generate UUID v4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Possible item IDs
const itemIds = [
  "49821", "49814", "49810", "49813", "49808", 
  "49819", "49807", "49818", "49817", "49825", 
  "49824", "49809", "49816", "49822", "49812", 
  "49820", "49811", "49815", "49806", "49823"
];

// Mapping of names to keys
const metrics = [
  { nome: "Ping do Usuário POP Ponta Negra", key: "ping[POP Ponta Negra]" },
  { nome: "Ping do Usuário POP Praia do Meio", key: "ping[POP Praia do Meio]" },
  { nome: "Ping do Usuário POP Tirol", key: "ping[POP Tirol]" },
  { nome: "Ping do Usuário POP Zona Norte", key: "ping[POP Zona Norte]" },
  { nome: "Potência RX do Usuário POP Ponta Negra", key: "rx_power[POP Ponta Negra]" },
  { nome: "Potência RX do Usuário POP Praia do Meio", key: "rx_power[POP Praia do Meio]" },
  { nome: "Potência RX do Usuário POP Tirol", key: "rx_power[POP Tirol]" },
  { nome: "Potência RX do Usuário POP Zona Norte", key: "rx_power[POP Zona Norte]" },
  { nome: "Potência TX do Usuário POP Ponta Negra", key: "tx_power[POP Ponta Negra]" },
  { nome: "Potência TX do Usuário POP Praia do Meio", key: "tx_power[POP Praia do Meio]" },
  { nome: "Potência TX do Usuário POP Tirol", key: "tx_power[POP Tirol]" },
  { nome: "Potência TX do Usuário POP Zona Norte", key: "tx_power[POP Zona Norte]" },
  { nome: "Tráfego de Entrada do Usuário POP Ponta Negra", key: "trafficIN[POP Ponta Negra]" },
  { nome: "Tráfego de Entrada do Usuário POP Praia do Meio", key: "trafficIN[POP Praia do Meio]" },
  { nome: "Tráfego de Entrada do Usuário POP Tirol", key: "trafficIN[POP Tirol]" },
  { nome: "Tráfego de Entrada do Usuário POP Zona Norte", key: "trafficIN[POP Zona Norte]" },
  { nome: "Tráfego de Saida do Usuário POP Ponta Negra", key: "trafficOUT[POP Ponta Negra]" },
  { nome: "Tráfego de Saida do Usuário POP Praia do Meio", key: "trafficOUT[POP Praia do Meio]" },
  { nome: "Tráfego de Saida do Usuário POP Tirol", key: "trafficOUT[POP Tirol]" },
  { nome: "Tráfego de Saida do Usuário POP Zona Norte", key: "trafficOUT[POP Zona Norte]" }
];

// Constants
const HOST_NAME = "SW3-PE-IEI-CEN-01 - Seletiva";
const HOST_ID = "11077";

// Generate random date within last 30 days in ISO-8601 format
function randomDate() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
  return new Date(randomTime);
}

async function main() {
  console.log(`Start seeding...`);
  
  // Create all down history records first (50-100)
  const downHistoryRecords = [];
  const recordCount = Math.floor(Math.random() * 50) + 50;
  
  for (let i = 0; i < recordCount; i++) {
    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    const date = randomDate();
    
    downHistoryRecords.push({
      id: uuidv4(),
      nome: metric.nome,
      key: metric.key,
      hostId: HOST_ID,
      hostName: HOST_NAME,
      date: date,
      rawDate: date.getTime() // Store timestamp for sorting
    });
  }
  
  // Sort by date (newest first)
  downHistoryRecords.sort((a, b) => b.rawDate - a.rawDate);
  
  // Create notifications only for most recent records
  const notificationsToCreate = downHistoryRecords.map(record => ({
    id: uuidv4(),
    downHistoryId: record.id,
    read: Math.random() > 0.7 // 30% chance of being read
  }));
  
  // Create all records in transaction
  try {
    await prisma.$transaction([
      // Create down history records
      ...downHistoryRecords.map(record => 
        prisma.downHistory.create({
          data: {
            id: record.id,
            nome: record.nome,
            key: record.key,
            hostId: record.hostId,
            hostName: record.hostName,
            date: record.date
          }
        })
      ),
      // Create notifications
      ...notificationsToCreate.map(notification =>
        prisma.immediatefailureNotification.create({
          data: notification
        })
      )
    ]);
    
    console.log(`Successfully created:
      - ${downHistoryRecords.length} downHistory records
      - ${notificationsToCreate.length} notifications`);
  } catch (error) {
    console.error(`Error in transaction: ${error.message}`);
  }
  
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
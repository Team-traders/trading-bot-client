// ✅ Définition de l'interface Order
export interface Order {
  id: number;
  date: string;
  market: string;
  side: "Buy" | "Sell";
  price: string;
  amount: string;
  value: string;
  filled: string;
  status: "Open" | "Filled" | "Canceled" | "Pending" | "Failed";
}

// ✅ Listes des valeurs possibles
const statuses: Order["status"][] = ["Open", "Filled", "Canceled", "Pending", "Failed"];
const sides: Order["side"][] = ["Buy", "Sell"];
const markets: string[] = ["BTC/USDT", "ETH/USDT", "LTC/USDT", "XRP/USDT", "ADA/USDT"];

// ✅ Génération dynamique de 50 commandes
export const orders: Order[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  date: `2024-07-${String((i % 30) + 1).padStart(2, "0")} ${String((i % 24)).padStart(2, "0")}:${String((i * 2) % 60).padStart(2, "0")}:00`,
  market: markets[i % markets.length],
  side: sides[i % sides.length],
  price: (Math.random() * 50000 + 1000).toFixed(2),
  amount: (Math.random() * 10 + 1).toFixed(2),
  value: (Math.random() * 10000 + 100).toFixed(2),
  filled: [`0%`, `50%`, `100%`][i % 3],
  status: statuses[i % statuses.length],
}));

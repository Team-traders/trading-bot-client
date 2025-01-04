import { mockData } from "./mockData";

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

// ✅ Génération dynamique de 50 commandes
export const orders: Order[] = mockData.orders.map((order, i) => ({
  id: i + 1,
  date: `2024-07-${String((i % 30) + 1).padStart(2, "0")} ${String((i % 24)).padStart(2, "0")}:${String((i * 2) % 60).padStart(2, "0")}:00`,
  market: order.symbol,
  side: sides[i % sides.length],
  price: order.entryPrice.toFixed(2),
  amount: (Math.random() * 10 + 1).toFixed(2),
  value: (Math.random() * 10000 + 100).toFixed(2),
  filled: [`0%`, `50%`, `100%`][i % 3],
  status: statuses[i % statuses.length],
}));
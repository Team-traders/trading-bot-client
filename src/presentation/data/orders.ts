import api from "../../infrastructure/api/apiService";

export interface Order {
  orderId: string;
  id: number;
  date: string;
  market: string;
  side: "Buy" | "Sell";
  price: string;
  amount: string;
  value: string;
  filled: string;
  status: "EXECUTED" | "PENDING" | "CANCELED";
}

export const fetchAndTransformOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get('http://localhost:3000/orders');
    const data = response.data;

    const transformedData = data.map((order: {
      id: number; symbol: string; status: string; entryPrice: number; side: string }, i: number) => ({
      id: i + 1,
      orderId: order.id,
      date: `2024-07-${String((i % 30) + 1).padStart(2, "0")} ${String((i % 24)).padStart(2, "0")}:${String((i * 2) % 60).padStart(2, "0")}:00`,
      market: order.symbol,
      side: order.side, 
      price: order.entryPrice.toFixed(2),
      amount: (Math.random() * 10 + 1).toFixed(2),
      value: (Math.random() * 10000 + 100).toFixed(2),
      filled: [`0%`, `50%`, `100%`][i % 3],
      status: order.status,
    }));

    console.log("Données transformées :", transformedData); 
    return transformedData;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return [];
  }
};

export const orders = await fetchAndTransformOrders();
import api from "../../infrastructure/api/apiService";

export interface Transaction {
  date: string;
  id: string;
  amount: string;
  asset: string;
  txid: string;
  status: "Pending" | "Expired" | "Succeeded" | "Failed";
}

const statuses: Transaction["status"][] = ["Pending", "Expired", "Succeeded", "Failed"];

export const fetchDeposits = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get('http://localhost:3000/orders');
    const orders = response.data;

    return orders.map((order: { entryPrice: number; symbol: string }, i: number) => ({
      date: `2024-07-${String((i % 30) + 1).padStart(2, "0")} ${String((i % 24)).padStart(2, "0")}:${String((i % 60)).padStart(2, "0")}:00`,
      id: `D${String(100 + i).padStart(3, "0")}`,
      amount: order.entryPrice.toFixed(2),
      asset: order.symbol.split('/')[0],
      txid: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 10)}`,
      status: statuses[i % statuses.length],
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des dépôts :", error);
    return [];
  }
};

export const fetchWithdrawals = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get('http://localhost:3000/orders');
    const orders = response.data;

    return orders.map((order: { entryPrice: number; symbol: string }, i: number) => ({
      date: `2024-07-${String((i % 30) + 1).padStart(2, "0")} ${String((i % 24)).padStart(2, "0")}:${String((i % 60)).padStart(2, "0")}:00`,
      id: `W${String(200 + i).padStart(3, "0")}`,
      amount: order.entryPrice.toFixed(2),
      asset: order.symbol.split('/')[0],
      txid: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 10)}`,
      status: statuses[i % statuses.length],
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des retraits :", error);
    return [];
  }
};

export const withdrawals = await fetchWithdrawals();
export const deposits = await fetchDeposits();
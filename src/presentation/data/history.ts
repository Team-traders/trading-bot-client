export interface Transaction {
    date: string;
    id: string;
    amount: string;
    asset: string;
    txid: string;
    status: "Pending" | "Expired" | "Succeeded" | "Failed";
  }
  
  // Liste des statuts valides
  const statuses: Transaction["status"][] = ["Pending", "Expired", "Succeeded", "Failed"];
  
  // 🟢 Dépôts
  export const deposits: Transaction[] = Array.from({ length: 50 }, (_, i) => ({
    date: `2024-07-${String((i % 30) + 1).padStart(2, "0")} ${String((i % 24)).padStart(2, "0")}:${String((i % 60)).padStart(2, "0")}:00`,
    id: `D${String(100 + i).padStart(3, "0")}`,
    amount: (Math.random() * 10000 + 500).toFixed(2),
    asset: i % 2 === 0 ? "ETH" : "BTC",
    txid: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 10)}`,
    status: statuses[i % statuses.length], // Sélectionne un statut valide
  }));
  
  // 🔴 Retraits
  export const withdrawals: Transaction[] = Array.from({ length: 50 }, (_, i) => ({
    date: `2024-07-${String((i % 30) + 1).padStart(2, "0")} ${String((i % 24)).padStart(2, "0")}:${String((i % 60)).padStart(2, "0")}:00`,
    id: `W${String(200 + i).padStart(3, "0")}`,
    amount: (Math.random() * 10000 + 500).toFixed(2),
    asset: i % 2 === 0 ? "ETH" : "BTC",
    txid: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 10)}`,
    status: statuses[i % statuses.length], // Sélectionne un statut valide
  }));
  
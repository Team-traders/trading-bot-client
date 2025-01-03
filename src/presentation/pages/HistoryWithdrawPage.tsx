import React, { useEffect, useState } from "react";
import { withdrawals } from "../data/history";
import Pagination from "../pages/pagination";
import Header from "../components/common/Header";

const HistoryWithdrawPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof typeof withdrawals[number]>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTxid, setSearchTxid] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 🔄 Adapter le nombre d'éléments affichés selon la hauteur de l'écran
  useEffect(() => {
    const updateItemsPerPage = () => {
      const rowHeight = 60;
      const headerHeight = 200;
      const paginationHeight = 70;
      const screenHeight = window.innerHeight;

      const availableHeight = screenHeight - headerHeight - paginationHeight;
      const calculatedRows = Math.floor(availableHeight / rowHeight);

      setItemsPerPage(calculatedRows > 0 ? calculatedRows : 1);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // 🔍 Filtrage par TXID
  const filteredWithdrawals = withdrawals.filter((withdrawal) =>
    withdrawal.txid.toLowerCase().includes(searchTxid.toLowerCase())
  );

  // 🔄 Tri des données
  const sortedWithdrawals = [...filteredWithdrawals].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedWithdrawals.length / itemsPerPage);
  const paginatedWithdrawals = sortedWithdrawals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: keyof typeof withdrawals[number]) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: keyof typeof withdrawals[number]) => {
    if (column === sortColumn) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Succeeded":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Header title="Withdraw History" />

      {/* 🔍 Barre de recherche TXID */}
      <div className="mt-4 mb-2">
        <input
          type="text"
          placeholder="Search by TXID"
          value={searchTxid}
          onChange={(e) => {
            setSearchTxid(e.target.value);
            setCurrentPage(1); // Réinitialise la page actuelle à 1
          }}
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* 🖥️ Conteneur principal */}
      <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900 rounded-md shadow-md">
        {filteredWithdrawals.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">⚠️ No withdrawals found for this TXID.</p>
        ) : (
          <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-300px)] border rounded-md">
            <table className="w-full min-w-[900px] text-left border-collapse">
              <thead>
                <tr>
                  {[
                    { key: "date", label: "DATE", width: "w-32" },
                    { key: "id", label: "ID", width: "w-16" },
                    { key: "amount", label: "AMOUNT", width: "w-24" },
                    { key: "asset", label: "ASSET", width: "w-24" },
                    { key: "txid", label: "TXID", width: "w-48" },
                    { key: "status", label: "STATUS", width: "w-24" }
                  ].map((header) => (
                    <th
                      key={header.key}
                      onClick={() =>
                        handleSort(header.key as keyof typeof withdrawals[number])
                      }
                      className={`p-4 text-left border-b border-gray-200 dark:border-gray-700 cursor-pointer ${header.width}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{header.label}</span>
                        <span className="ml-2 text-sm">{getSortIcon(header.key as keyof typeof withdrawals[number])}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedWithdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="p-4 w-32">{withdrawal.date}</td>
                    <td className="p-4 w-16">{withdrawal.id}</td>
                    <td className="p-4 w-24">{withdrawal.amount}</td>
                    <td className="p-4 w-24">{withdrawal.asset}</td>
                    <td className="p-4 w-48 text-blue-600 hover:underline cursor-pointer">{withdrawal.txid}</td>
                    <td className={`p-4 w-24 ${getStatusColor(withdrawal.status)}`}>{withdrawal.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-2">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default HistoryWithdrawPage;

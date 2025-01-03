import React, { useEffect, useState } from "react";
import { orders } from "../data/orders";
import Pagination from "../pages/pagination";
import Header from "../components/common/Header";

const AllOrdersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof typeof orders[number]>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 🔄 Adapter le nombre d'éléments affichés pour occuper tout l'espace disponible
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

  // 🔄 Tri des données
  const sortedOrders = [...orders].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: keyof typeof orders[number]) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: keyof typeof orders[number]) => {
    if (column === sortColumn) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "text-green-600";
      case "Filled":
        return "text-yellow-600";
      case "Canceled":
        return "text-gray-600";
      case "Pending":
        return "text-blue-600";
      default:
        return "text-gray-600"; // Couleur par défaut si le statut ne correspond à aucun cas
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Header title="All Orders" />

      {/* 🖥️ Conteneur principal */}
      <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900 rounded-md shadow-md">
        <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-300px)] border rounded-md">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr>
                {[
                  { key: "id", label: "ID", width: "w-16" },
                  { key: "date", label: "DATE", width: "w-32" },
                  { key: "market", label: "MARKET", width: "w-24" },
                  { key: "side", label: "SIDE", width: "w-16" },
                  { key: "price", label: "PRICE", width: "w-20" },
                  { key: "amount", label: "AMOUNT", width: "w-20" },
                  { key: "value", label: "VALUE", width: "w-20" },
                  { key: "filled", label: "FILLED", width: "w-16" },
                  { key: "status", label: "STATUS", width: "w-20" },
                  { key: "cancel", label: "CANCEL", width: "w-16" },
                ].map((header) => (
                  <th
                    key={header.key}
                    onClick={() =>
                      header.key !== "cancel" &&
                      handleSort(header.key as keyof typeof orders[number])
                    }
                    className={`p-4 text-left border-b border-gray-200 dark:border-gray-700 ${header.width}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{header.label}</span>
                      {header.key !== "cancel" && (
                        <span className="ml-2 text-sm">
                          {getSortIcon(header.key as keyof typeof orders[number])}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="p-4 w-16">{order.id}</td>
                  <td className="p-4 w-32">{order.date}</td>
                  <td className="p-4 w-24">{order.market}</td>
                  <td
                    className={`p-4 w-16 ${
                      order.side === "Buy" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.side}
                  </td>
                  <td className="p-4 w-20">{order.price}</td>
                  <td className="p-4 w-20">{order.amount}</td>
                  <td className="p-4 w-20">{order.value}</td>
                  <td className="p-4 w-16">{order.filled}</td>
                  <td className={`p-4 w-20 ${getStatusColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="p-4 w-16">
                    {order.status === "Open" && (
                      <button className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-700">
                        Cancel ✖️
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-2">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default AllOrdersPage;

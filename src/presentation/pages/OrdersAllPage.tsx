import React, { useEffect, useState } from "react";
import { orders } from "../data/orders";
import Pagination from "../pages/pagination";
import Header from "../components/common/Header";
import { useLanguage } from "../context/LanguageContext";

const AllOrdersPage: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof typeof orders[number]>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
        return "text-gray-600";
    }
  };

  // Fonction pour formater le statut en minuscules
  const formatStatus = (status: string) => {
    return status.toLowerCase();
  };

  return (
    <div className="h-full flex flex-col">
      <Header title={t('sidebar.orders')} />

      <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900 rounded-md shadow-md">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-300px)] border rounded-md">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr>
                {[{ key: "id", label: t('history.id'), width: "w-16" },
                  { key: "date", label: t('history.date'), width: "w-32" },
                  { key: "market", label: t('history.market'), width: "w-24" },
                  { key: "side", label: t('history.side'), width: "w-16" },
                  { key: "price", label: t('history.price'), width: "w-20" },
                  { key: "amount", label: t('history.amount'), width: "w-20" },
                  { key: "value", label: t('history.value'), width: "w-20" },
                  { key: "filled", label: t('history.filled'), width: "w-16" },
                  { key: "status", label: t('history.status'), width: "w-20" },
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
                  <td className={`p-4 w-16 ${order.side === "Buy" ? "text-green-600" : "text-red-600"}`}>
                    {order.side}
                  </td>
                  <td className="p-4 w-20">{order.price}</td>
                  <td className="p-4 w-20">{order.amount}</td>
                  <td className="p-4 w-20">{order.value}</td>
                  <td className="p-4 w-16">{order.filled}</td>
                  <td className={`p-4 w-20 ${getStatusColor(order.status)}`}>
                    {order.status ? formatStatus(order.status) : "unknown"} {/* Vérification de sécurité */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-2">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default AllOrdersPage;
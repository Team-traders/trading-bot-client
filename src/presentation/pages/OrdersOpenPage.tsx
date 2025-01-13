import React, { useEffect, useState } from "react";
import Pagination from "../pages/pagination";
import Header from "../components/common/Header";
import { useLanguage } from "../context/LanguageContext";
import { fetchAndTransformOrders, Order } from "../data/orders";
import api from "../../infrastructure/api/apiService";

const OpenOrdersPage: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Order>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [orders, setOrders] = useState<Order[]>([]);

  // Met à jour le nombre d'éléments par page en fonction de la taille de l'écran
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

  // Récupère les ordres et les transforme
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const transformedOrders = await fetchAndTransformOrders();
        console.log("Données transformées :", transformedOrders);
        setOrders(transformedOrders);
      } catch (error) {
        console.error("Erreur lors de la récupération des ordres :", error);
      }
    };

    fetchOrders();
  }, []);

  // Gère la suppression d'un ordre
  const handleDeleteOrder = async (id: number) => {
    try {
      const matchingOrder = orders.find((order) => order.id === id);
      await api.delete(`http://localhost:3000/orders/${matchingOrder?.orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      alert("L'ordre a été supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'ordre :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  const openOrders = orders.filter((order) => order.status === "EXECUTED");

  // Trie les ordres en fonction de la colonne et de l'ordre de tri
  const sortedOrders = [...openOrders].sort((a, b) => {
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

  // Gère le tri des colonnes
  const handleSort = (column: keyof Order) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Obtient l'icône de tri pour une colonne
  const getSortIcon = (column: keyof Order) => {
    if (column === sortColumn) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  // Formate le statut d'un ordre
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };  

  return (
    <div className="h-full flex flex-col">
      <Header title={t('sidebar.orders_submenu.open')} />

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
                  { key: "cancel", label: t('history.cancel'), width: "w-16" },
                ].map((header) => (
                  <th
                    key={header.key}
                    onClick={() =>
                      header.key !== "cancel" &&
                      handleSort(header.key as keyof Order)
                    }
                    className={`p-4 text-left border-b border-gray-200 dark:border-gray-700 ${header.width}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{header.label}</span>
                      {header.key !== "cancel" && (
                        <span className="ml-2 text-sm">
                          {getSortIcon(header.key as keyof Order)}
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
                  <td className="p-4 w-20 text-green-600">{formatStatus(order.status)}</td>
                  <td className="p-4 w-16">
                    <button className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() => handleDeleteOrder(order.id)}
                    >
                      Cancel ✖️
                    </button>
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

export default OpenOrdersPage;
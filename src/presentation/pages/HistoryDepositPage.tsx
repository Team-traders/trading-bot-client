import React, { useEffect, useState } from "react";
import { deposits } from "../data/history";
import Pagination from "../pages/pagination";
import Header from "../components/common/Header";
import { useLanguage } from "../context/LanguageContext";

const HistoryDepositPage: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof typeof deposits[number]>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTxid, setSearchTxid] = useState("");
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

  const filteredDeposits = deposits.filter((deposit) =>
    deposit.txid.toLowerCase().includes(searchTxid.toLowerCase())
  );

  const sortedDeposits = [...filteredDeposits].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedDeposits.length / itemsPerPage);
  const paginatedDeposits = sortedDeposits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: keyof typeof deposits[number]) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: keyof typeof deposits[number]) => {
    if (column === sortColumn) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

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
      <Header title={t('history.deposit_title')} />

      <div className="mt-4 mb-2">
        <input
          type="text"
          placeholder={t('history.search_txid')}
          value={searchTxid}
          onChange={(e) => {
            setSearchTxid(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900 rounded-md shadow-md">
        {filteredDeposits.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">{t('history.no_deposits')}</p>
        ) : (
          <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-300px)] border rounded-md">
            <table className="w-full min-w-[900px] text-left border-collapse">
              <thead>
                <tr>
                  {[{ key: "date", label: t('history.date'), width: "w-32" },
                    { key: "id", label: t('history.id'), width: "w-16" },
                    { key: "amount", label: t('history.amount'), width: "w-24" },
                    { key: "asset", label: t('history.asset'), width: "w-24" },
                    { key: "txid", label: t('history.txid'), width: "w-48" },
                    { key: "status", label: t('history.status'), width: "w-24" }
                  ].map((header) => (
                    <th
                      key={header.key}
                      onClick={() =>
                        handleSort(header.key as keyof typeof deposits[number])
                      }
                      className={`p-4 text-left border-b border-gray-200 dark:border-gray-700 cursor-pointer ${header.width}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{header.label}</span>
                        <span className="ml-2 text-sm">{getSortIcon(header.key as keyof typeof deposits[number])}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedDeposits.map((deposit) => (
                  <tr key={deposit.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="p-4 w-32">{deposit.date}</td>
                    <td className="p-4 w-16">{deposit.id}</td>
                    <td className="p-4 w-24">{deposit.amount}</td>
                    <td className="p-4 w-24">{deposit.asset}</td>
                    <td className="p-4 w-48 text-blue-600 hover:underline cursor-pointer">{deposit.txid}</td>
                    <td className={`p-4 w-24 ${getStatusColor(deposit.status)}`}>{deposit.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-2">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default HistoryDepositPage;

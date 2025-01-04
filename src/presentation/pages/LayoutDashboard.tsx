import { useState } from "react";
import Header from "../components/common/Header";
import { useLanguage } from "../context/LanguageContext";
import { mockData } from "../data/mockData";


type AlertStatus = "ACTIVE" | "TRIGGERED" | "CANCELED" | "OPEN" | "FAILED";

const LayoutDashboard = () => {
  const { t } = useLanguage();
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");

  const handleTrade = (action: string) => {
    console.log(`Action: ${action}, Crypto: ${crypto}, Amount: ${amount}`);
  };

  const statusColors: Record<AlertStatus, string> = {
    ACTIVE: "bg-green-100 text-green-800",
    TRIGGERED: "bg-yellow-100 text-yellow-800",
    CANCELED: "bg-red-100 text-red-800",
    OPEN: "bg-blue-100 text-blue-800",
    FAILED: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <Header title={t('sidebar.trade')} />
      <div className="mt-6">
        <div className="flex space-x-8">
          {/* Alerts Section */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-lightText dark:text-gray-200 mb-4">
              {t('alerts.title')}
            </h2>
            <div className="bg-lightBackground dark:bg-gray-700 rounded-lg shadow-md p-6 border border-white">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Target Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {mockData.alerts.map((alert) => (
                    <tr key={alert.alertId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {alert.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {alert.targetPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${statusColors[alert.status as AlertStatus]}`}>
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trade Section */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-lightText dark:text-gray-200 mb-4">
              {t('trade.title')}
            </h2>
            <div className="bg-lightBackground dark:bg-gray-700 rounded-lg shadow-md p-6 border border-white">
              <form>
                <div className="mb-4">
                  <label className="block text-lightText dark:text-gray-200 mb-2" htmlFor="crypto">
                    {t('trade.crypto')}
                  </label>
                  <select
                    id="crypto"
                    value={crypto}
                    onChange={(e) => setCrypto(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
                    required
                  >
                    <option value="">{t('trade.select_crypto')}</option>
                    {mockData.markets.map((market) => (
                      <option key={market} value={market}>
                        {market}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-lightText dark:text-gray-200 mb-2" htmlFor="amount">
                    {t('trade.amount')}
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleTrade("buy")}
                    className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {t('trade.buy')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTrade("sell")}
                    className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {t('trade.sell')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
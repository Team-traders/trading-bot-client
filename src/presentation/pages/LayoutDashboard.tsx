import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const LayoutDashboard = () => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<
    {
      alertId: string;
      symbol: string;
      targetPrice: number;
      status: keyof typeof statusColors;
    }[]
  >([]);
  const [, setOrders] = useState<{ symbol: string }[]>([]);
  const [cryptoPrices, setCryptoPrices] = useState<{
    [key: string]: { usd: number };
  }>({});
  const [crypto, setCrypto] = useState("");
  const [entryPrice, setEntryPrice] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alertsResponse = await axios.get("http://localhost:3000/alerts");
        setAlerts(alertsResponse.data);

        const ordersResponse = await axios.get("http://localhost:3000/orders");
        setOrders(ordersResponse.data);

        // API Coinlore
        await fetchPopularCryptoPrices();
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, []);

  //Fonction pour récupérer les prix des cryptomonnaies populaires.
  const fetchPopularCryptoPrices = async () => {
    try {
      const response = await axios.get("https://api.coinlore.net/api/tickers/");
      const topCryptos = response.data.data.slice(0, 10);

      const formattedPrices = topCryptos.reduce(
        (
          acc: { [x: string]: { usd: number } },
          crypto: { symbol: string; price_usd: string }
        ) => {
          acc[crypto.symbol.toLowerCase()] = {
            usd: parseFloat(crypto.price_usd),
          };
          return acc;
        },
        {}
      );

      setCryptoPrices(formattedPrices);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des cryptos populaires:",
        error
      );
    }
  };

const handleCreateOrder = async (action: "Buy" | "Sell") => {
  try {
    if (!crypto || entryPrice <= 0 || stopLoss <= 0 || takeProfit <= 0) {
      alert(t("trade.invalidInput"));
      return;
    }

    // Confirmation message for Buy action
    if (action === "Buy") {
      alert("You have initiated a Buy order.");
    } else {
      alert("You have initiated a Sell order.");
    }

    // Generate unique IDs for `orderId` and `id`
    const generatedOrderId = uuidv4();
    const generatedId = Math.random().toString(36).substring(2, 10);

    const newOrder = {
      orderId: generatedOrderId,
      id: generatedId,
      symbol: crypto,
      entryPrice,
      stopLoss,
      takeProfit,
      side: action,
      status: "EXECUTED",
    };

    const response = await axios.post("http://localhost:3000/orders", newOrder);

    if (response.status === 201) {
      setOrders((prevOrders) => [...prevOrders, { ...newOrder }]);
    } else {
      console.error("Erreur lors de la création de l'ordre");
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'ordre :", error);
    alert(t("trade.orderError"));
  }
};

  const statusColors = {
    TRIGGERED: "bg-yellow-100 text-yellow-800",
    CANCELED: "bg-red-100 text-red-800",
    ACTIVE: "bg-green-100 text-green-800",
  };

  return (
    <div>
      <Header title={t("sidebar.trade")} />

      {/* Ticker défilant pour les prix en direct */}
      <div className="bg-lightBackground dark:bg-gray-700 text-lightText dark:text-gray-200 py-2 overflow-hidden">
        {" "}
        <div className="flex animate-marquee whitespace-nowrap">
          {Object.entries(cryptoPrices).map(([key, value]) => (
            <div key={key} className="mx-4">
              <span className="font-bold">{key.toUpperCase()}</span>: $
              {value.usd.toFixed(2)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex space-x-8">
          {/* Section des Alertes */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-lightText dark:text-gray-200 mb-4">
              {t("alerts.title")}
            </h2>
            <div className="bg-lightBackground dark:bg-gray-700 rounded-lg shadow-md p-6 border border-white">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t("alerts.symbol")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t("alerts.targetPrice")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t("history.status")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {alerts.map((alert) => (
                    <tr key={alert.alertId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {alert.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {alert.targetPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                            statusColors[alert.status]
                          }`}
                        >
                          {t(`alerts.status.${alert.status}`)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section de Trading */}
            <div className="static w-96">
            <h2 className="text-xl font-bold text-lightText dark:text-gray-200 mb-4">
              {t('trade.title')}
            </h2>
            <div className="bg-lightBackground dark:bg-gray-700 rounded-lg shadow-md p-6 border border-white">
              <form>
                {/* Sélection de la cryptomonnaie */}
                <div className="mb-4">
                  <label className="block text-lightText dark:text-gray-200 mb-2" htmlFor="crypto">
                    {t("trade.crypto")}
                  </label>
                  <select
                    id="crypto"
                    value={crypto}
                    onChange={(e) => setCrypto(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
                    required
                  >
                    <option value="">{t("trade.select_crypto")}</option>
                    {alerts.map((alert) => (
                      <option key={alert.symbol} value={alert.symbol}>
                        {alert.symbol}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prix d'entrée */}
                <div className="mb-4">
                  <label className="block text-lightText dark:text-gray-200 mb-2" htmlFor="entryPrice">
                    {t("trade.entryPrice")}
                  </label>
                  <input
                    type="number"
                    id="entryPrice"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                {/* Stop Loss */}
                <div className="mb-4">
                  <label className="block text-lightText dark:text-gray-200 mb-2" htmlFor="stopLoss">
                    {t("trade.stopLoss")}
                  </label>
                  <input
                    type="number"
                    id="stopLoss"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(Number(e.target.value))}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                {/* Take Profit */}
                <div className="mb-4">
                  <label className="block text-lightText dark:text-gray-200 mb-2" htmlFor="takeProfit">
                    {t("trade.takeProfit")}
                  </label>
                  <input
                    type="number"
                    id="takeProfit"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(Number(e.target.value))}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                {/* Boutons Acheter/Vendre */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleCreateOrder("Buy")}
                    className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {t("trade.buy")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCreateOrder("Sell")}
                    className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {t("trade.sell")}
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

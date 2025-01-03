import { RouteObject, Navigate } from "react-router-dom";
import LayoutDashboard from "../pages/LayoutDashboard";
import HistoryWithdrawPage from "../pages/HistoryWithdrawPage";
import HistoryDepositPage from "../pages/HistoryDepositPage";
import OrdersAllPage from "../pages/OrdersAllPage";
import OrdersOpenPage from "../pages/OrdersOpenPage";
import SettingsPage from "../pages/SettingsPage";
import LoginPage from "../pages/LoginPage";

const Routes: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/dashboard", element: <LayoutDashboard /> },
  
 // 📦 Routes Directes pour Orders
 { path: "/orders/all", element: <OrdersAllPage /> },
 { path: "/orders/open", element: <OrdersOpenPage /> },

  // 📜 Routes pour History
  { path: "/history/withdraw", element: <HistoryWithdrawPage /> },
  { path: "/history/deposit", element: <HistoryDepositPage /> },

  // ⚙️ Settings
  { path: "/settings", element: <SettingsPage /> },

  // 🔑 Login
  { path: "/login", element: <LoginPage /> },
];

export default Routes;

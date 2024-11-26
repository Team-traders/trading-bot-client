import { RouteObject } from "react-router-dom";
import LayoutDashboard from "../pages/LayoutDashboard";
import HistoryPage from "../pages/HistoryPage";
import OrdersPage from "../pages/OrdersPage";
import SettingsPage from "../pages/SettingsPage";
import LoginPage from "../pages/LoginPage";

const Routes: RouteObject[] = [
  { path: "/", element: <LayoutDashboard /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "/history", element: <HistoryPage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/login", element: <LoginPage /> },
];

export default Routes;
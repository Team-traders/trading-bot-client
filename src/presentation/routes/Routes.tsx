import { RouteObject } from "react-router-dom";
import LayoutDashboard from "../pages/LayoutDashboard";
import HistoryPage from "../pages/HistoryPage";
import OrdersPage from "../pages/OrdersPage";
import SettingsPage from "../pages/SettingsPage";
import LogoutPage from "../pages/LogoutPage";


const Routes: RouteObject[] = [
  { path: "/", element: <LayoutDashboard /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "/history", element: <HistoryPage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/logout", element: <LogoutPage /> },
];

export default Routes;
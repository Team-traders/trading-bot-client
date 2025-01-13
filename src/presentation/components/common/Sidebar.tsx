import React, { createContext, useContext, useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ChevronFirst,
  ChevronLast,
  ChartCandlestick,
  Book,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import logo from "@assets/logo.png";

// Contexte pour gérer l'état de la sidebar
const SidebarContext = createContext({ expanded: true });

interface SidebarItemProps {
  icon?: ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
  link: string;
  children?: { text: string; link: string; active: boolean }[];
}

// Composant SidebarItem
const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, link, children }) => {
  const { expanded } = useContext(SidebarContext);
  const { logout } = useAuth();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (text === t("sidebar.logout")) {
      e.preventDefault();
      logout();
    }
    if (children) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li
      className={`relative group flex flex-col ${
        expanded ? "w-full" : "items-center"
      } transition-all`}
    >
      {/* Menu Principal */}
      <div
        onClick={handleClick}
        className={`flex items-center py-3 px-4 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900 ${
          isOpen ? "bg-indigo-100 dark:bg-indigo-800" : ""
        }`}
      >
        <Link
          to={link}
          className="flex items-center w-full"
          onClick={(e) => {
            if (text === t("sidebar.logout")) {
              e.preventDefault();
              logout();
            }
          }}
        >
          <span className="flex-shrink-0 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600">
            {icon}
          </span>
          {expanded && (
            <span className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
              {text}
            </span>
          )}
        </Link>
        {children && expanded && (
          <span className="ml-auto text-gray-500 dark:text-gray-400 group-hover:text-indigo-600">
            {isOpen ? "▲" : "▼"}
          </span>
        )}
      </div>

      {/* Sous-menu */}
      {children && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <ul className="space-y-1">
            {children.map((child, index) => (
              <li key={index}>
                <Link
                  to={child.link}
                  className="flex items-center py-3 px-4 ml-4 rounded-lg text-gray-600 dark:text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900"
                >
                  <span className="ml-6 text-sm">{t(child.text)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};


// Composant principal Sidebar
const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const { t } = useLanguage();
  const { user } = useAuth();

  const sidebarItems: SidebarItemProps[] = [
    {
      icon: <ChartCandlestick size={24} />,
      text: t("sidebar.trade"),
      alert: true,
      active: false,
      link: "/dashboard",
    },
    {
      icon: <Book size={24} />,
      text: t("sidebar.orders"),
      active: true,
      link: "#",
      children: [
        { text: "sidebar.orders_submenu.all", link: "/orders/all", active: false },
        { text: "sidebar.orders_submenu.open", link: "/orders/open", active: false },
      ],
    },
    {
      icon: <History size={24} />,
      text: t("sidebar.history"),
      alert: true,
      active: false,
      link: "#",
      children: [
        { text: "sidebar.history_submenu.withdraw", link: "/history/withdraw", active: false },
        { text: "sidebar.history_submenu.deposit", link: "/history/deposit", active: false },
      ],
    },
    {
      icon: <Settings size={24} />,
      text: t("sidebar.settings"),
      active: false,
      link: "/settings",
    },
    {
      icon: <LogOut size={24} />,
      text: t("sidebar.logout"),
      active: false,
      link: "#",
    },
  ];

  return (
    <aside
      className={`h-screen bg-white dark:bg-darkBackground border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="h-full flex flex-col">
        {/* Header avec Logo */}
        <div className="p-4 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
            alt="logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300"
          >
            {expanded ? <ChevronFirst size={24} /> : <ChevronLast size={24} />}
          </button>
        </div>

        {/* Menu Principal */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 space-y-2 px-2">
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </ul>
        </SidebarContext.Provider>

        {/* User Info Section */}
        {expanded && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <span role="img" aria-label="user" className="text-3xl">
                👤
              </span>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                  {user?.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;

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

const SidebarContext = createContext({ expanded: true });

interface SidebarItemProps {
  icon?: ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
  link: string;
  children?: { text: string; link: string; active: boolean }[]; // Sous-menu
}

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
      setIsOpen(!isOpen); // Toggle sous-menu
    }
  };

  return (
    <>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 dark:hover:bg-indigo-900 text-gray-600 dark:text-gray-300`}
      >
        <Link to={link} className="w-full flex items-center" onClick={handleClick}>
          {icon}
          <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
        </Link>
        {children && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto text-gray-400"
          >
            {isOpen ? "▲" : "▼"} {/* Icone pour déplier/replier */}
          </button>
        )}
      </li>
      {/* Sous-menu */}
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? "max-h-40" : "max-h-0"}`}
      >
        {children && (
          <ul className="pl-8">
            {children.map((child, index) => (
              <li
                key={index}
                className="py-2 px-3 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-md font-medium transition-colors"
              >
                <Link to={child.link} className="block">
                  {t(child.text)} {/* Traduction pour les sous-menus */}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const { t } = useLanguage();
  const { user } = useAuth();

  const sidebarItems: SidebarItemProps[] = [
    {
      icon: <ChartCandlestick size={20} />,
      text: t("sidebar.trade"),
      alert: true,
      active: false,
      link: "/dashboard",
    },
    {
      icon: <Book size={20} />,
      text: t("sidebar.orders"),
      active: true,
      link: "#",
      children: [
        { text: "sidebar.orders_submenu.all", link: "/orders/all", active: false },
        { text: "sidebar.orders_submenu.open", link: "/orders/open", active: false },
      ],
    },
    {
      icon: <History size={20} />,
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
      icon: <Settings size={20} />,
      text: t("sidebar.settings"),
      active: false,
      link: "/settings",
    },
    {
      icon: <LogOut size={20} />,
      text: t("sidebar.logout"),
      active: false,
      link: "#",
    },
  ];

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white dark:bg-darkBackground border-r border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Header avec Logo */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt="logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Menu Principal */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </ul>
        </SidebarContext.Provider>

        {/* User Info Section */}
        <hr className="my-3 border-gray-300 dark:border-gray-700" />
        <div className="flex items-center space-x-2 p-3">
            {user && <span role="img" aria-label="user" className="text-3xl">👤</span>}
            <div className="leading-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{user?.name}</h4>
            <span className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

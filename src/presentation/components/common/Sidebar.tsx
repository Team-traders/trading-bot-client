import {
  ChevronFirst,
  ChevronLast,
  ChartCandlestick,
  Book,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import logo from "@assets/logo.png";

const SidebarContext = createContext({ expanded: true });

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
  link: string;
}

function SidebarItem({ icon, text, link }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  const { logout } = useAuth();
  const { t } = useLanguage();

  const handleClick = (e: React.MouseEvent) => {
    if (text === t('sidebar.logout')) {
      e.preventDefault();
      logout();
    }
  };

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer 
                   transition-colors group hover:bg-indigo-50 dark:hover:bg-indigo-900 
                   text-gray-600 dark:text-gray-300">
      <Link to={link} className="w-full flex items-center" onClick={handleClick}>
        {icon}
        <span className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}>
          {text}
        </span>
      </Link>
    </li>
  );
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const { t } = useLanguage();

  const sidebarItems: SidebarItemProps[] = [
    {
      icon: <ChartCandlestick size={20} />,
      text: t('sidebar.trade'),
      alert: true,
      active: false,
      link: "/dashboard",
    },
    { 
      icon: <Book size={20} />, 
      text: t('sidebar.orders'), 
      active: true, 
      link: "/orders" 
    },
    {
      icon: <History size={20} />,
      text: t('sidebar.history'),
      alert: true,
      active: false,
      link: "/history",
    },
    {
      icon: <Settings size={20} />,
      text: t('sidebar.settings'),
      active: false,
      link: "/settings",
    },
    {
      icon: <LogOut size={20} />,
      text: t('sidebar.logout'),
      active: false,
      link: "#",
    },
  ];

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white dark:bg-darkBackground border-r border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {sidebarItems.slice(0, 3).map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
            <hr className="my-3 border-gray-300 dark:border-gray-700" />
            {sidebarItems.slice(3).map((item, index) => (
              <SidebarItem key={index + 3} {...item} />
            ))}
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}
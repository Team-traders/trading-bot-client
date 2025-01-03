import {
  ChevronFirst,
  ChevronLast,
  ChartCandlestick,
  Book,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { createContext, useContext, useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import logo from "@assets/logo.png";

const SidebarContext = createContext({ expanded: true });

interface SidebarItemProps {
  icon?: ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
  link: string;
  children?: { text: string; link: string; active: boolean }[];
}

const sidebarItems: SidebarItemProps[] = [
  {
    icon: <ChartCandlestick size={20} />,
    text: "Trade",
    alert: true,
    active: false,
    link: "/",
  },
  {
    icon: <Book size={20} />,
    text: "Orders",
    active: true,
    link: "#",
    children: [
      { text: "All", link: "/orders/all", active: false },
      { text: "Open", link: "/orders/open", active: false },
    ],
  },
  {
    icon: <History size={20} />,
    text: "History",
    alert: true,
    active: false,
    link: "#",
    children: [
      { text: "Withdraw", link: "/history/withdraw", active: false },
      { text: "Deposit", link: "/history/deposit", active: false },
    ],
  },
  {
    icon: <Settings size={20} />,
    text: "Settings",
    active: false,
    link: "/settings",
  },
  {
    icon: <LogOut size={20} />,
    text: "Log Out",
    active: false,
    link: "#",
  },
];

function SidebarItem({ icon, text, link, children }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (text === "Log Out") {
      e.preventDefault();
      logout();
    }
    if (children) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 dark:hover:bg-indigo-900 text-gray-600 dark:text-gray-300`}
      >
        <Link to={link} className="w-full flex items-center" onClick={handleClick}>
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
        </Link>
        {children && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto text-gray-400"
          >
            {isOpen ? "▲" : "▼"}
          </button>
        )}
      </li>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        {children && (
          <ul className="pl-8">
            {children.map((child, index) => (
              <li
                key={index}
                className="py-2 px-3 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-md font-medium transition-colors"
              >
                <Link to={child.link} className="block">
                  {child.text}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default function Sidebar() {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white dark:bg-darkBackground border-r border-gray-200 dark:border-gray-700 shadow-sm">
          {/* Header avec Logo */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logo}
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
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

          {/* Footer avec Profil Utilisateur */}
          <div className="border-t flex p-3 border-gray-200 dark:border-gray-700">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt="User Avatar"
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{user?.name}</h4>
                <span className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

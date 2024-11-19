import {
  ChevronFirst,
  ChevronLast,
  MoreVertical,
  ChartCandlestick,
  Book,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import logo from "@assets/logo.png";

const SidebarContext = createContext({ expanded: true });

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
  link: string;
}

const sidebarItems: SidebarItemProps[] = [
  {
    icon: <ChartCandlestick size={20} />,
    text: "Trade",
    alert: true,
    active: false,
    link: "/",
  },
  { icon: <Book size={20} />, text: "Orders", active: true, link: "/orders" },
  {
    icon: <History size={20} />,
    text: "History",
    alert: true,
    active: false,
    link: "/history",
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
    link: "/logout",
  },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logo}
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              {sidebarItems.slice(0, 3).map((item, index) => (
                <SidebarItem key={index} {...item} />
              ))}
              <hr className="my-3" />
              {sidebarItems.slice(3).map((item, index) => (
                <SidebarItem key={index + 6} {...item} />
              ))}
            </ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({ icon, text, link }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600`}
    >
      <Link to={link} className="w-full flex items-center">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}
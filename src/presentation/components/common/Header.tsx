import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "../../context/ThemeContext";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-between bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText p-4">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      </div>
      <DarkModeSwitch checked={darkMode} onChange={toggleDarkMode} size={30} />
    </div>
  );
};

export default Header;
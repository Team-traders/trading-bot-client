import React, { useState } from "react";
import Header from "../components/common/Header";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <Header title={t('settings.title')} />
      
      <div className="max-w-2xl mx-auto mt-8 space-y-6">
        {/* Language Settings */}
        <div className="bg-lightBackground dark:bg-formBackground rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-lightText dark:text-darkText mb-4">
            {t('settings.language')}
          </h2>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full bg-white dark:bg-formField text-lightText dark:text-darkText 
                     border border-gray-300 dark:border-gray-600 rounded-md 
                     py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary 
                     focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {/* Theme Settings */}
        <div className="bg-lightBackground dark:bg-formBackground rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-lightText dark:text-darkText">
              {t('settings.darkMode')}
            </h2>
            <DarkModeSwitch checked={darkMode} onChange={toggleDarkMode} size={30} />
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-lightBackground dark:bg-formBackground rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-lightText dark:text-darkText mb-4">
            {t('settings.notifications.title')}
          </h2>
          <div className="space-y-6">
            <div className="text-lightText dark:text-darkText mb-4">
              {t('settings.notifications.connectedEmail')} {user?.email}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lightText dark:text-darkText">
                {t('settings.notifications.email')}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-primary rounded-full peer dark:bg-gray-700 
                              peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                              peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lightText dark:text-darkText">
                {t('settings.notifications.push')}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-primary rounded-full peer dark:bg-gray-700 
                              peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                              peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
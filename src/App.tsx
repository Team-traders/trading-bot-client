import { useRoutes, useLocation } from "react-router-dom";
import Sidebar from "./presentation/components/common/Sidebar";
import routes from "./presentation/routes/Routes";
import { useTheme } from "./presentation/context/ThemeContext";
import { useLanguage } from "./presentation/context/LanguageContext"; // Nouveau

function App() {
  const routing = useRoutes(routes);
  const { darkMode } = useTheme();
  const { language } = useLanguage(); // Nouveau
  const location = useLocation();

  const hideSidebarRoutes = ["/login"];

  return (
    <div className={`relative flex h-screen ${darkMode ? "dark" : ""}`} lang={language}>
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}

      <div className="flex-grow relative">
        <div className="absolute inset-0 h-full w-full bg-white dark:bg-darkBackground">
          <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <div className="relative z-10 p-8 text-lightText dark:text-darkText">
            {routing}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
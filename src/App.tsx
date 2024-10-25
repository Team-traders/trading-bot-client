import { useRoutes } from "react-router-dom";
import Sidebar from "./presentation/components/common/Sidebar";
import routes from "./presentation/routes/Routes";

function App() {
  const routing = useRoutes(routes);

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal avec le fond en pointillé */}
      <div className="flex-grow relative">
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Zone du contenu */}
        <div className="relative z-10 p-8">{routing}</div>
      </div>
    </div>
  );
}

export default App;
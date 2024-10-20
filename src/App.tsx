import { Route, Routes } from "react-router-dom";

import Sidebar from "./presentation/components/common/Sidebar";
import LayoutDashboard from "./presentation/pages/LayoutDashboard";
import Orders from "./presentation/pages/Orders";
import History from "./presentation/pages/History";
import Settings from "./presentation/pages/Settings";

//absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]
function App() {
  return (
    <div className='flex h-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] text-gray-100 overflow-hidden'>
    {/* BG */}
    <div className='fixed inset-0 z-0'>
    </div>
      {/* Sidebar */}
      <Sidebar />
      <Routes>
        <Route path="/" element={<LayoutDashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;

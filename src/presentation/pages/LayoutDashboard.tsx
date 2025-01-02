import Header from "../components/common/Header";
import { useLanguage } from "../context/LanguageContext";

const LayoutDashboard = () => {
  const { t } = useLanguage();
  return <Header title={t('sidebar.trade')} />;
};

export default LayoutDashboard;

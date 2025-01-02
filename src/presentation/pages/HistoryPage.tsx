import Header from "../components/common/Header";
import { useLanguage } from "../context/LanguageContext";

const History = () => {
  const { t } = useLanguage();
  return <Header title={t('sidebar.history')} />;
};

export default History;

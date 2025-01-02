import Header from "../components/common/Header";
import { useLanguage } from "../context/LanguageContext";

const Orders = () => {
  const { t } = useLanguage();
  return <Header title={t('sidebar.orders')} />;
};

export default Orders;

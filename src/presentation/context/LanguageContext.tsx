// src/presentation/context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../../i18n/translations';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (path: string): string => {
    try {
      const keys = path.split('.');
      let current: any = translations[language as keyof typeof translations];
      
      for (const key of keys) {
        if (current[key] === undefined) {
          console.warn(`Translation missing for key: ${path}`);
          return path;
        }
        current = current[key];
      }
      
      return current;
    } catch (error) {
      console.error(`Translation error for key: ${path}`, error);
      return path;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Ajout de l'export du hook useLanguage
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
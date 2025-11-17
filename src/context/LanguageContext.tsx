import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    marketplace: 'Marketplace',
    cases: 'Cases',
    messages: 'Messages',
    payments: 'Payments',
    analytics: 'Analytics',
    settings: 'Settings',
    logout: 'Logout',
    createCase: 'Create New Case',
    activeCases: 'Active Cases',
    draftCases: 'Draft Cases',
    completedCases: 'Completed Cases',
    // Add more translations as needed
  },
  ar: {
    dashboard: 'لوحة التحكم',
    marketplace: 'السوق',
    cases: 'الحالات',
    messages: 'الرسائل',
    payments: 'المدفوعات',
    analytics: 'التحليلات',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    createCase: 'إنشاء حالة جديدة',
    activeCases: 'الحالات النشطة',
    draftCases: 'المسودات',
    completedCases: 'الحالات المكتملة',
    // Add more translations as needed
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

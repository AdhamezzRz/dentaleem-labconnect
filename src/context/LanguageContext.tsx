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
    // New translations
    addClinic: 'Add all locations you practice in; set your default pickup/delivery address.',
    specialtiesHelp: 'Examples help labs understand your typical cases.',
    shadeHelp: 'Select porcelain shade; add stump shade if needed.',
    splitPaymentHelp: '30% now, 70% on delivery confirmation.',
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
    // New translations
    addClinic: 'أضف جميع المواقع التي تمارس فيها؛ حدد عنوان الاستلام / التوصيل الافتراضي.',
    specialtiesHelp: 'تساعد الأمثلة المختبرات على فهم حالاتك النموذجية.',
    shadeHelp: 'حدد درجة البورسلين؛ أضف درجة الجذع إذا لزم الأمر.',
    splitPaymentHelp: '30٪ الآن، 70٪ عند تأكيد التسليم.',
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

import i18n, { i18n as I18n, Resource } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { get } from '@utils';

type Translation = ReturnType<typeof useTranslation>;

const I18nContext = createContext<{
  changeLanguage: I18n['changeLanguage'];
  getFallbackLanguage: () => string;
  getLanguage: () => string;
  t: Translation['t'];
  tObj: <T>(
    obj: T,
    path: string,
    options?: {
      translationsKey?: string;
    }
  ) => string;
}>({} as any);

export const useI18n = () => useContext(I18nContext);
export const I18nProvider: React.FC<{
  language?: string;
  fallbackLng?: string;
  resources: Resource;
  children?: React.ReactNode;
}> = ({ fallbackLng = 'en', resources, children, language }) => {
  useMemo(() => {
    i18n.use(initReactI18next).init({
      resources,
      lng: 'en',
      fallbackLng,
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
    });
  }, []);

  const [lang, setLang] = useState<string>(
    localStorage.getItem('language') || i18n.language
  );
  const { t } = useTranslation();

  const getLanguage = () => lang;
  const getFallbackLanguage = () => fallbackLng;

  const changeLanguage: I18n['changeLanguage'] = (
    lng = fallbackLng,
    callback
  ) => {
    const promise = i18n.changeLanguage(lng, callback);
    setLang(lng);
    localStorage.setItem('language', lng || getFallbackLanguage());
    return promise;
  };

  // Retrieves a translation from an standard i18n object.
  const tObj = <T,>(
    obj: T,
    path: string,
    options?: { translationsKey?: string }
  ) => {
    if (obj === undefined) return '';

    let value: any;
    const translations = (obj as any)?.[
      options?.translationsKey || 'localization'
    ];

    if (translations === undefined) {
      value = get(obj, path);
    } else {
      value = get(translations, `${lang}.${path}`);
    }

    if (value === '' || value === undefined) value = get(obj, path);
    if (typeof value !== 'string') return '';
    return value;
  };

  useEffect(() => {
    changeLanguage(lang);
    language !== undefined && changeLanguage(language);
  }, [language]);

  return (
    <I18nContext.Provider
      value={{ changeLanguage, getLanguage, t, tObj, getFallbackLanguage }}
    >
      {children}
    </I18nContext.Provider>
  );
};

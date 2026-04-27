import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import rw from "./locales/rw.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import sw from "./locales/sw.json";

const DICT = { rw, en, fr, sw };
const SUPPORTED = ["rw", "en", "fr", "sw"];
const DEFAULT_LANG = "rw";
const STORAGE_KEY = "parcela.lang";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANG;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  const value = useMemo(() => {
    const dict = DICT[lang] || DICT[DEFAULT_LANG];
    const t = (path) => {
      const segs = path.split(".");
      let cur = dict;
      for (const s of segs) {
        if (cur && typeof cur === "object" && s in cur) cur = cur[s];
        else return path;
      }
      return typeof cur === "string" ? cur : path;
    };
    return { lang, setLang, t, supported: SUPPORTED };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

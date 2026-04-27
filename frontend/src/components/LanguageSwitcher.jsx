import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useI18n } from "../i18n";

const LANG_LABEL = {
  rw: { name: "Kinyarwanda", code: "RW" },
  en: { name: "English", code: "EN" },
  fr: { name: "Français", code: "FR" },
  sw: { name: "Kiswahili", code: "SW" },
};

export default function LanguageSwitcher() {
  const { lang, setLang, supported } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref} data-testid="language-switcher">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lang-pill"
        data-testid="language-switcher-button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe size={14} />
        <span>{LANG_LABEL[lang].code}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
          role="listbox"
          data-testid="language-switcher-menu"
        >
          {supported.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setLang(code);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition ${
                lang === code ? "text-brand font-semibold" : "text-slate-700"
              }`}
              data-testid={`lang-option-${code}`}
              role="option"
              aria-selected={lang === code}
            >
              <span>{LANG_LABEL[code].name}</span>
              {lang === code && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../i18n";

const LOGO = "https://customer-assets.emergentagent.com/job_aee25a89-4c67-409f-a01f-29898f60a829/artifacts/aipw5kaf_WhatsApp%20Image%202026-04-03%20at%2021.59.56%20%281%29.jpeg";

export default function Header() {
  const { t } = useI18n();
  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50" data-testid="site-header">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" data-testid="brand-logo-link">
          <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-sm bg-brand">
            <img src={LOGO} alt="Parcela" className="w-full h-full object-cover" />
          </span>
          <span className="font-display text-xl md:text-2xl font-black tracking-tight text-slate-900">
            parcela
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#problem" className="hover:text-brand transition" data-testid="nav-problem">{t("nav.problem")}</a>
          <a href="#promise" className="hover:text-brand transition" data-testid="nav-promise">{t("nav.promise")}</a>
          <a href="#waitlist" className="hover:text-brand transition" data-testid="nav-waitlist">{t("nav.waitlist")}</a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a href="#waitlist" className="btn btn-primary hidden sm:inline-flex text-sm" data-testid="header-cta">
            {t("nav.cta")}
          </a>
        </div>
      </div>
    </header>
  );
}

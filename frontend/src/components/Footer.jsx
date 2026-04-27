import React from "react";
import { Instagram } from "lucide-react";
import { useI18n } from "../i18n";

const LOGO = "https://customer-assets.emergentagent.com/job_aee25a89-4c67-409f-a01f-29898f60a829/artifacts/aipw5kaf_WhatsApp%20Image%202026-04-03%20at%2021.59.56%20%281%29.jpeg";

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" {...props}>
    <path d="M19.6 6.7c-1.4-.3-2.6-1-3.4-2.1-.5-.7-.8-1.5-.9-2.4h-3.5v13.4a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.4a6.4 6.4 0 0 0-.8-.1A6.3 6.3 0 1 0 15.4 16V9.3c1.3.9 2.9 1.4 4.6 1.4V7.2c-.1 0-.3 0-.4-.1z"/>
  </svg>
);

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10 bg-brand">
              <img src={LOGO} alt="Parcela" className="w-full h-full object-cover" />
            </span>
            <span className="font-display text-2xl font-black tracking-tight text-white">parcela</span>
          </div>
          <p className="mt-4 max-w-md text-slate-400 leading-relaxed">{t("footer.tagline")}</p>
        </div>

        <div className="md:col-span-3">
          <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-slate-500">
            {t("footer.follow")}
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href="https://instagram.com/parcela.rw"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-brand transition flex items-center justify-center text-white"
              aria-label="Instagram @parcela.rw"
              data-testid="social-instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://tiktok.com/@parcela.rw"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-accent hover:text-slate-900 transition flex items-center justify-center text-white"
              aria-label="TikTok @parcela.rw"
              data-testid="social-tiktok"
            >
              <TikTokIcon />
            </a>
          </div>
          <div className="mt-3 text-sm text-slate-400">@parcela.rw</div>
        </div>

        <div className="md:col-span-3">
          <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-slate-500">Kigali, Rwanda</div>
          <div className="mt-4 text-sm text-slate-400 leading-relaxed">
            hello@parcela.rw
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-slate-500">
          <div>© {year} Parcela. {t("footer.rights")}</div>
          <div>Built for Rwanda · Made with care</div>
        </div>
      </div>
    </footer>
  );
}

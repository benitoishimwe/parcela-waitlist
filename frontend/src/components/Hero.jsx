import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Wallet, Sparkles } from "lucide-react";
import { useI18n } from "../i18n";

const HERO_IMG = "https://images.pexels.com/photos/6868799/pexels-photo-6868799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";
const LOGO = "https://customer-assets.emergentagent.com/job_aee25a89-4c67-409f-a01f-29898f60a829/artifacts/aipw5kaf_WhatsApp%20Image%202026-04-03%20at%2021.59.56%20%281%29.jpeg";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden brand-mesh grain" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full bg-accent/95 text-slate-900 px-4 py-1.5 text-xs md:text-sm font-bold shadow-sm ring-1 ring-yellow-300"
              data-testid="hero-badge"
            >
              <Sparkles size={14} />
              {t("hero.badge")}
            </div>

            <h1 className="mt-6 font-display font-black text-[2.5rem] leading-[1.05] md:text-6xl lg:text-7xl tracking-tight text-slate-900" data-testid="hero-title">
              {t("hero.title_line1")}{" "}
              <span className="relative inline-block text-brand">
                {t("hero.title_highlight")}
                <span className="absolute left-0 -bottom-1 h-3 w-full bg-accent/60 -z-10 rounded"></span>
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-600" data-testid="hero-subtitle">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#waitlist" className="btn btn-accent" data-testid="hero-cta-send">
                {t("hero.cta_send")}
                <ArrowRight size={18} />
              </a>
              <a href="#waitlist" className="btn btn-ghost" data-testid="hero-cta-track">
                {t("hero.cta_track")}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2" data-testid="hero-stat-verified">
                <ShieldCheck size={18} className="text-brand" />
                <span>{t("hero.stat_verified")}</span>
              </div>
              <div className="flex items-center gap-2" data-testid="hero-stat-payment">
                <Wallet size={18} className="text-brand" />
                <span>{t("hero.stat_payment")}</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-tr from-brand/30 via-accent/30 to-transparent rounded-[2rem] blur-2xl opacity-70"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200 aspect-[4/5] bg-brand">
                <img
                  src={HERO_IMG}
                  alt="Courier delivering parcels in Kigali"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent"></div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-2xl px-3 py-2 flex items-center gap-2 shadow-lg">
                  <img src={LOGO} alt="" className="w-7 h-7 rounded-lg" />
                  <div className="leading-tight">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Live</div>
                    <div className="text-xs font-bold text-slate-900">Kigali · Nyarutarama</div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-brand">Tracking · #PRC-2461</div>
                  <div className="mt-1.5 font-display text-lg font-extrabold text-slate-900">Out for delivery</div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full w-3/4 bg-brand rounded-full"></div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Picked up</span>
                    <span>In transit</span>
                    <span className="text-slate-900 font-bold">At door</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

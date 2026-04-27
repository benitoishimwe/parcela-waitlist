import React from "react";
import { motion } from "framer-motion";
import { MapPin, Wallet, KeyRound } from "lucide-react";
import { useI18n } from "../i18n";

export default function Features() {
  const { t } = useI18n();
  const items = [
    { icon: MapPin, title: t("features.f1_title"), body: t("features.f1_body") },
    { icon: Wallet, title: t("features.f2_title"), body: t("features.f2_body") },
    { icon: KeyRound, title: t("features.f3_title"), body: t("features.f3_body") },
  ];

  return (
    <section className="py-20 md:py-28 bg-white" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="max-w-3xl">
          <div className="label-eyebrow">{t("features.eyebrow")}</div>
          <h2 className="mt-3 font-display font-black text-3xl md:text-5xl tracking-tight text-slate-900">
            {t("features.title")}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={i}
                className="card"
                data-testid={`feature-card-${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand/10 text-brand">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl md:text-2xl font-bold text-slate-900">{it.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{it.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

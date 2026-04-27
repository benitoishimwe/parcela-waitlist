import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Clock, PackageX } from "lucide-react";
import { useI18n } from "../i18n";

export default function Problem() {
  const { t } = useI18n();
  const cards = [
    { icon: ShieldAlert, title: t("problem.card1_title"), body: t("problem.card1_body"), tone: "brand" },
    { icon: Clock, title: t("problem.card2_title"), body: t("problem.card2_body"), tone: "accent" },
    { icon: PackageX, title: t("problem.card3_title"), body: t("problem.card3_body"), tone: "brand" },
  ];

  return (
    <section id="problem" className="py-20 md:py-28 bg-white" data-testid="problem-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="max-w-3xl">
          <div className="label-eyebrow" data-testid="problem-eyebrow">{t("problem.eyebrow")}</div>
          <h2 className="mt-3 font-display font-black text-3xl md:text-5xl tracking-tight text-slate-900" data-testid="problem-title">
            {t("problem.title")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600" data-testid="problem-subtitle">
            {t("problem.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                className="card group"
                data-testid={`problem-card-${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    c.tone === "accent"
                      ? "bg-accent/20 text-amber-700"
                      : "bg-brand/10 text-brand"
                  }`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 leading-snug">{c.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{c.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

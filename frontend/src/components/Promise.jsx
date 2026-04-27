import React from "react";
import { motion } from "framer-motion";
import { Clock3, ShieldCheck, KeyRound } from "lucide-react";
import { useI18n } from "../i18n";

const PROMISE_IMG = "https://images.pexels.com/photos/6869040/pexels-photo-6869040.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";

export default function Promise() {
  const { t } = useI18n();
  const points = [
    { icon: Clock3, label: t("promise.point1") },
    { icon: ShieldCheck, label: t("promise.point2") },
    { icon: KeyRound, label: t("promise.point3") },
  ];

  return (
    <section id="promise" className="py-20 md:py-28 bg-[#FAFAFA]" data-testid="promise-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          className="lg:col-span-5 order-2 lg:order-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-brand/30 to-accent/30 rounded-[2rem] blur-2xl opacity-60"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-200 aspect-[5/6]">
              <img src={PROMISE_IMG} alt="Confident courier holding parcels" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-7 order-1 lg:order-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="label-eyebrow" data-testid="promise-eyebrow">{t("promise.eyebrow")}</div>
          <h2 className="mt-3 font-display font-black text-3xl md:text-5xl tracking-tight text-slate-900 leading-tight" data-testid="promise-title">
            {t("promise.title")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600" data-testid="promise-subtitle">{t("promise.subtitle")}</p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {points.map((p, i) => {
              const Icon = p.icon;
              return (
                <li
                  key={i}
                  className="flex items-center gap-3 bg-white rounded-2xl border border-slate-200 p-4"
                  data-testid={`promise-point-${i + 1}`}
                >
                  <span className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                    <Icon size={18} />
                  </span>
                  <span className="font-semibold text-slate-800 text-sm md:text-base">{p.label}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

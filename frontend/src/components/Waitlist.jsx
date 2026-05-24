import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "../i18n";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function Waitlist() {
  const { t, lang } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | invalid
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await axios.post(`${API}/waitlist`, { email: email.trim(), language: lang });
      if (res.data && res.data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.response?.data?.error || "");
    }
  };

  return (
    <section id="waitlist" className="py-20 md:py-28 bg-[#FAFAFA]" data-testid="waitlist-section">
      <div className="max-w-4xl mx-auto px-5 md:px-10">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] p-8 md:p-14 shadow-xl"
          style={{
            background:
              "radial-gradient(120% 100% at 0% 0%, rgba(250,210,1,0.18) 0%, transparent 60%), linear-gradient(135deg, #00A1DE 0%, #006B92 100%)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-accent">
              {t("waitlist.eyebrow")}
            </div>
            <h2 className="mt-3 font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-tight" data-testid="waitlist-title">
              {t("waitlist.title")}
            </h2>
            <p className="mt-4 text-white/85 text-base md:text-lg max-w-2xl" data-testid="waitlist-subtitle">
              {t("waitlist.subtitle")}
            </p>

            <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3" data-testid="waitlist-form">
              <div className="relative flex-1">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "invalid" || status === "error") setStatus("idle");
                  }}
                  placeholder={t("waitlist.placeholder")}
                  className="brand-input !pl-11"
                  data-testid="waitlist-email-input"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-accent disabled:opacity-70 disabled:cursor-not-allowed justify-center min-w-[180px]"
                data-testid="waitlist-submit-button"
              >
                {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : null}
                {status === "loading" ? "..." : t("waitlist.submit")}
              </button>
            </form>

            <div className="mt-4 min-h-[24px] text-sm" data-testid="waitlist-status">
              {status === "success" && (
                <div className="inline-flex items-center gap-2 text-emerald-200 font-semibold" data-testid="waitlist-success">
                  <CheckCircle2 size={16} />
                  {t("waitlist.success")}
                </div>
              )}
              {status === "invalid" && (
                <div className="inline-flex items-center gap-2 text-yellow-200 font-semibold" data-testid="waitlist-invalid">
                  <AlertCircle size={16} />
                  {t("waitlist.invalid")}
                </div>
              )}
              {status === "error" && (
                <div className="inline-flex items-center gap-2 text-red-200 font-semibold" data-testid="waitlist-error">
                  <AlertCircle size={16} />
                  {t("waitlist.error")} {errorMsg ? `(${errorMsg})` : ""}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

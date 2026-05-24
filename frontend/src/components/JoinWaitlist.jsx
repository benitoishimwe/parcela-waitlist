import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, User, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "../i18n";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function JoinWaitlist() {
  const { t, lang } = useI18n();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
      const payload = { email: email.trim(), language: lang };
      if (name.trim()) payload.name = name.trim();
      if (phone.trim()) payload.phone = phone.trim();
      const res = await axios.post(`${API}/waitlist`, payload);
      if (res.data && res.data.success) {
        setStatus("success");
        setEmail("");
        setName("");
        setPhone("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.response?.data?.error || "");
    }
  };

  return (
    <section
      id="join-waitlist"
      className="py-20 md:py-28 bg-[#FAFAFA]"
      data-testid="join-waitlist-section"
    >
      <div className="max-w-2xl mx-auto px-5 md:px-10">
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
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />

          <div className="relative">
            <h1
              className="font-display font-black text-3xl md:text-4xl text-white tracking-tight leading-tight"
              data-testid="join-waitlist-title"
            >
              {t("joinWaitlist.title")}
            </h1>
            <p
              className="mt-3 text-white/90 text-base md:text-lg font-semibold"
              data-testid="join-waitlist-subtitle"
            >
              {t("joinWaitlist.subtitle")}
            </p>
            <p
              className="mt-2 text-white/75 text-sm md:text-base"
              data-testid="join-waitlist-support"
            >
              {t("joinWaitlist.support")}
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-8 flex flex-col gap-4"
              data-testid="join-waitlist-form"
            >
              <div>
                <label
                  htmlFor="jw-email"
                  className="block text-sm font-semibold text-white/90 mb-1"
                >
                  {t("joinWaitlist.email_label")}
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    id="jw-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "invalid" || status === "error") setStatus("idle");
                    }}
                    placeholder={t("joinWaitlist.email_placeholder")}
                    className="brand-input !pl-11"
                    data-testid="join-waitlist-email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="jw-name"
                  className="block text-sm font-semibold text-white/90 mb-1"
                >
                  {t("joinWaitlist.name_label")}
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    id="jw-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("joinWaitlist.name_placeholder")}
                    className="brand-input !pl-11"
                    data-testid="join-waitlist-name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="jw-phone"
                  className="block text-sm font-semibold text-white/90 mb-1"
                >
                  {t("joinWaitlist.phone_label")}
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    id="jw-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("joinWaitlist.phone_placeholder")}
                    className="brand-input !pl-11"
                    data-testid="join-waitlist-phone"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-accent disabled:opacity-70 disabled:cursor-not-allowed justify-center w-full mt-2"
                data-testid="join-waitlist-submit"
              >
                {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : null}
                {status === "loading" ? "..." : t("joinWaitlist.submit")}
              </button>
            </form>

            <div className="mt-4 min-h-[24px] text-sm" data-testid="join-waitlist-status">
              {status === "success" && (
                <div
                  className="inline-flex items-center gap-2 text-emerald-200 font-semibold"
                  data-testid="join-waitlist-success"
                >
                  <CheckCircle2 size={16} />
                  {t("joinWaitlist.success")}
                </div>
              )}
              {status === "invalid" && (
                <div
                  className="inline-flex items-center gap-2 text-yellow-200 font-semibold"
                  data-testid="join-waitlist-invalid"
                >
                  <AlertCircle size={16} />
                  {t("joinWaitlist.invalid")}
                </div>
              )}
              {status === "error" && (
                <div
                  className="inline-flex items-center gap-2 text-red-200 font-semibold"
                  data-testid="join-waitlist-error"
                >
                  <AlertCircle size={16} />
                  {t("joinWaitlist.error")} {errorMsg ? `(${errorMsg})` : ""}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import React from "react";
import { I18nProvider } from "./i18n";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Promise from "./components/Promise";
import Features from "./components/Features";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-[#FAFAFA] text-slate-900">
        <Header />
        <main>
          <Hero />
          <Problem />
          <Promise />
          <Features />
          <Waitlist />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}

export default App;

"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    headline: "Conduisez l'Excellence",
    subline: "Location de voiture premium à Oujda et Tanger",
    gradient: "from-red-900/40 via-black/60 to-black/80",
    bg: "#1a0a0a",
  },
  {
    headline: "Liberté sur la Route",
    subline: "Flotte moderne pour tous vos déplacements au Maroc",
    gradient: "from-zinc-900/60 via-black/50 to-black/80",
    bg: "#0a0a1a",
  },
  {
    headline: "Service Premium Garanti",
    subline: "Kilométrage illimité, assurance incluse, service 7j/7",
    gradient: "from-stone-900/50 via-black/60 to-black/90",
    bg: "#0f0f0f",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: slide.bg, transition: "background 1s ease" }}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${slide.gradient} transition-all duration-1000`}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Red accent lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />
        {/* Corner accents */}
        <div className="absolute top-32 left-12 w-32 h-32 border-l-2 border-t-2 border-red-500/20 rounded-tl-lg" />
        <div className="absolute bottom-32 right-12 w-32 h-32 border-r-2 border-b-2 border-red-500/20 rounded-br-lg" />
        {/* Floating orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-medium tracking-wider uppercase">
              Oujda · Tanger · Maroc
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight"
            style={{ fontFamily: "var(--font-outfit)", textShadow: "0 0 60px rgba(239,68,68,0.15)" }}
            key={current}
          >
            {slide.headline.split(" ").map((word, i) => (
              <span key={i} className={i === 1 ? "text-red-500" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Subline */}
          <p className="text-white/60 text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto">
            {slide.subline}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 md:gap-16 mb-12">
            {[
              { value: "14+", label: "Véhicules" },
              { value: "2", label: "Villes" },
              { value: "5★", label: "Service" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/voitures" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
              Voir la Flotte
              <ArrowRight size={18} />
            </Link>
            <Link href="/reservation" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
              Réserver Maintenant
            </Link>
          </div>

          {/* Location badges */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {["Oujda", "Tanger"].map((city) => (
              <div
                key={city}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm"
              >
                <MapPin size={13} className="text-red-500" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-red-500" : "w-3 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-12 flex flex-col items-center gap-2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        <span className="text-white/30 text-xs tracking-widest uppercase rotate-90 origin-center mt-6">
          Scroll
        </span>
      </div>
    </section>
  );
}

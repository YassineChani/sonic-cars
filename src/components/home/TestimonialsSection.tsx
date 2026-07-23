import { Star, Quote } from "lucide-react";
import { Testimonial } from "@prisma/client";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Avis Clients
            </span>
            <div className="divider-red" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Ce Que Disent Nos <span className="text-red-500">Clients</span>
          </h2>
          <p className="text-white/50 text-lg">
            La satisfaction de nos clients est notre plus belle réussite.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between"
            >
              <div>
                <Quote size={32} className="text-red-500/20 mb-4" />
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <span className="text-white/40 text-xs">{t.city || "Client"}</span>
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

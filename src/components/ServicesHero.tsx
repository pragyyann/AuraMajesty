'use strict';
'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

export default function ServicesHero() {
  const handleScrollToBook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('appointment-cta-strip');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-dark-section text-surface-soft pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-slate/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Eyebrow */}
          <span className="font-sans text-xs font-bold text-accent-silver uppercase tracking-widest block">
            The Menu
          </span>

          {/* Heading */}
          <h1 className="font-serif-display text-5xl sm:text-6xl font-medium text-surface-white tracking-tight">
            Salon Services
          </h1>
          
          <div className="w-16 h-[1px] bg-border-custom/30 mx-auto" />

          {/* Subtext */}
          <p className="font-sans text-base sm:text-lg text-text-muted/80 leading-relaxed max-w-2xl mx-auto">
            Explore hair, beauty, makeup, grooming, rituals, and treatment services tailored for women and men. Crafted with precision, care, and premium products.
          </p>

          {/* CTA */}
          <div className="pt-4">
            <button
              onClick={handleScrollToBook}
              className="bg-accent-slate hover:bg-accent-silver text-surface-white font-sans text-xs font-bold px-8 py-4 tracking-wider uppercase transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

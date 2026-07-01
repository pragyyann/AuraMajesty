'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero3D() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleScrollToBook = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('book-appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = "https://wa.me/919355522667?text=Hi%20Aura%20Majesty%20Studio%2C%20I%20want%20to%20book%20an%20appointment.";

  return (
    <section className="hero-section-wrapper">
      {/* 1. Alternating Background Images Layer (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 overflow-hidden z-0">
        {/* Exterior/Storefront Background */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-[1200ms] ease-in-out hero-bg-image animate-zoom-slow motion-reduce:animate-none"
          style={{ 
            backgroundImage: "url('/hero-bg.png')",
            opacity: activeIndex === 0 ? 1 : 0
          }}
        />
        {/* Interior Background */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-[1200ms] ease-in-out bg-center lg:bg-center animate-zoom-slow motion-reduce:animate-none"
          style={{ 
            backgroundImage: "url('/hero-alt.png')",
            opacity: activeIndex === 1 ? 1 : 0
          }}
        />
      </div>

      {/* 2. Overlays Layer (Desktop Only) */}
      <div className="hidden md:block hero-overlay-horizontal" />
      <div className="hidden md:block hero-overlay-bottom" />

      {/* 3. Text/Buttons Content Layer (relative z-10) */}
      <div className="relative z-10 w-full flex justify-start items-center">
        
        {/* Content Container (Left-aligned, uses hero-content-container from globals.css) */}
        <div className="hero-content-container flex flex-col items-start space-y-6 md:space-y-8 text-left animate-fade-up motion-reduce:animate-none">
          
          {/* Eyebrow Label & Status */}
          <div className="space-y-3 w-full md:mb-2">
            <span className="font-sans text-[10px] font-bold text-[#D8B878] uppercase tracking-[0.2em] block bg-white/5 border border-white/10 md:bg-black/[0.42] md:border-white/14 px-3.5 py-1.5 w-fit rounded-full backdrop-blur-sm md:backdrop-blur-[8px]">
              AURA MAJESTY STUDIO · INDIRAPURAM
            </span>
          </div>

          {/* Mobile Image Card Wrapper with Subtle Glow */}
          <div className="md:hidden w-full relative shrink-0">
            {/* Subtle Gold Glow behind Card */}
            <div 
              className="absolute inset-x-0 -inset-y-4 pointer-events-none -z-10 opacity-70"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(216,184,120,0.22), transparent 70%)"
              }}
            />

            {/* Cinematic Image Card */}
            <div 
              className="w-full relative h-[260px] rounded-[22px] overflow-hidden border border-white/14 bg-[#050505]"
              style={{
                boxShadow: "0 28px 80px rgba(0,0,0,0.55)"
              }}
            >
              {/* Storefront Image */}
              <Image
                src="/hero-bg.png"
                alt="Aura Majesty Salon Storefront"
                fill
                priority
                className={`object-cover object-[65%_center] z-0 transition-opacity duration-1000 ease-in-out ${
                  activeIndex === 0 ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Interior Image */}
              <Image
                src="/hero-alt.png"
                alt="Aura Majesty Salon Interior"
                fill
                className={`object-cover object-center z-0 transition-opacity duration-1000 ease-in-out ${
                  activeIndex === 1 ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Combined Vertical/Horizontal Vignette Overlay with Inner Shadow */}
              <div 
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.16) 45%, rgba(0,0,0,0.54) 100%), linear-gradient(90deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.22) 100%)",
                  boxShadow: "inset 0 0 80px rgba(0,0,0,0.55)"
                }}
              />

              {/* Tiny Refined 2-Dot Indicator (Bottom-Right Inside Image) */}
              <div className="absolute bottom-3.5 right-4 z-20 flex items-center space-x-1.5 bg-black/40 backdrop-blur-[4px] px-2.5 py-1.5 rounded-full border border-white/8">
                <span 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === 0 ? 'bg-[#D8B878] scale-110' : 'bg-white/35'
                  }`}
                />
                <span 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === 1 ? 'bg-[#D8B878] scale-110' : 'bg-white/35'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Metadata */}
          <span className="font-sans text-[11px] font-semibold text-white/68 block pl-1 tracking-wider uppercase">
            Open 09:00 AM – 08:00 PM · Unisex Studio
          </span>

          {/* Premium Headline */}
          <h1 className="font-serif-display font-medium text-white tracking-tight hero-heading">
            Step Into Your <br />
            <span className="italic font-normal text-[#D8B878]">Signature</span> Look.
          </h1>

          {/* Subtext */}
          <p className="font-sans text-sm md:text-base text-white/78 leading-relaxed max-w-[520px]">
            Premium hair, beauty, makeup and grooming experiences crafted for confident everyday looks and special moments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 pt-2 w-full md:w-auto">
            <button
              onClick={handleScrollToBook}
              className="w-full md:w-auto bg-white hover:bg-white/90 text-[#050505] font-sans text-xs font-bold uppercase tracking-widest py-4.5 px-8 shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center cursor-pointer"
            >
              Book Appointment
            </button>

            <Link
              href="/services"
              className="group w-full md:w-auto border border-white/25 bg-transparent hover:bg-white/5 text-white font-sans text-xs font-bold uppercase tracking-widest py-4.5 px-8 transition-all duration-300 text-center inline-flex items-center justify-center space-x-2 hover:-translate-y-0.5"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}

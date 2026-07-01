'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, MessageSquare, MapPin } from 'lucide-react';

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
    }, 5500);

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
          <div className="space-y-3 w-full">
            <span className="font-sans text-[10px] font-bold text-[#D8B878] uppercase tracking-[0.2em] block bg-white/5 border border-white/10 px-3.5 py-1.5 w-fit rounded-full backdrop-blur-sm">
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
              className="w-full relative h-[210px] rounded-[18px] overflow-hidden border border-white/14 bg-[#050505]"
              style={{
                boxShadow: "0 22px 60px rgba(0,0,0,0.48)"
              }}
            >
              <Image
                src="/hero-alt.png"
                alt="Aura Majesty Salon Interior"
                fill
                priority
                className="object-cover object-center z-0"
              />

              {/* Combined Vertical/Horizontal Vignette Overlay with Inner Shadow */}
              <div 
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.62) 100%), linear-gradient(90deg, rgba(0,0,0,0.36) 0%, rgba(0,0,0,0.04) 45%, rgba(0,0,0,0.28) 100%)",
                  boxShadow: "inset 0 0 80px rgba(0,0,0,0.55)"
                }}
              />
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

          {/* Subtle Glass Contact Chips (one line on desktop, stacks on mobile) */}
          <div className="pt-8 border-t border-white/18 flex flex-col md:flex-row md:flex-nowrap items-stretch md:items-center gap-3 w-full">
            <a
              href="tel:+919355522667"
              className="inline-flex items-center justify-center md:justify-start gap-2 whitespace-nowrap bg-white/6 border border-white/14 hover:bg-white/10 hover:border-white/25 md:bg-black/35 md:border-white/16 md:hover:border-white/30 md:hover:bg-black/50 px-4 py-2.5 rounded-full text-xs font-semibold font-sans text-white/82 md:text-white/85 transition-all duration-300 w-full md:w-auto"
            >
              <Phone className="w-3.5 h-3.5 text-[#D8B878] shrink-0" />
              <span>+91 935-552-2667</span>
            </a>
            
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center md:justify-start gap-2 whitespace-nowrap bg-white/6 border border-white/14 hover:bg-white/10 hover:border-white/25 md:bg-black/35 md:border-white/16 md:hover:border-white/30 md:hover:bg-black/50 px-4 py-2.5 rounded-full text-xs font-semibold font-sans text-white/82 md:text-white/85 transition-all duration-300 w-full md:w-auto"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
              <span>WhatsApp Booking</span>
            </a>

            <div className="inline-flex items-center justify-center md:justify-start gap-2 whitespace-nowrap bg-white/6 border border-white/14 md:bg-black/35 md:border-white/16 px-4 py-2.5 rounded-full text-xs font-semibold font-sans text-white/82 md:text-white/85 w-full md:w-auto">
              <MapPin className="w-3.5 h-3.5 text-[#D8B878] shrink-0" />
              <span>Indirapuram, Ghaziabad</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

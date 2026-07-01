'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import { Scissors, Palette, Sparkles, Droplet, User, Heart, ArrowRight } from 'lucide-react';

export default function ServicePreview() {
  const previewServices = [
    {
      title: "Hair Styling",
      description: "Precision cuts, blowouts, and styling designed to frame your features and elevate your personal style.",
      icon: Scissors,
      href: "/services?tab=ladies",
      bgColor: "from-accent-silver/10 to-transparent",
    },
    {
      title: "Hair Colour",
      description: "From subtle root touchups to full global transformations and premium balayage highlights.",
      icon: Palette,
      href: "/services?tab=ladies",
      bgColor: "from-accent-slate/10 to-transparent",
    },
    {
      title: "Skin & Facial",
      description: "Rejuvenating skin rituals, deep cleanses, and specialized facials that restore your natural glow.",
      icon: Sparkles,
      href: "/services?tab=ladies",
      bgColor: "from-surface-soft to-transparent",
    },
    {
      title: "Hair Treatments",
      description: "Advanced nourishing spas, color protection, smoothening, and deep scalp therapies.",
      icon: Droplet,
      href: "/services?tab=ladies",
      bgColor: "from-accent-silver/10 to-transparent",
    },
    {
      title: "Makeup",
      description: "Flawless base makeup, eye artistry, and bespoke styling for bridal, engagement, and party looks.",
      icon: Heart,
      href: "/services?tab=ladies",
      bgColor: "from-accent-slate/10 to-transparent",
    },
    {
      title: "Beard Grooming",
      description: "Master beard trims, luxury hot towel shaves, styling, and revitalizing beard spa treatments.",
      icon: User,
      href: "/services?tab=gents",
      bgColor: "from-surface-soft to-transparent",
    },
  ];

  return (
    <section className="bg-[#F5F1EA] text-[#141414] relative border-b border-black/8">
      {/* Dark-to-Neutral Transition Band */}
      <div 
        className="absolute top-0 left-0 right-0 h-[100px] md:h-[150px] lg:h-[180px] pointer-events-none z-10"
        style={{
          background: "linear-gradient(180deg, rgba(5,5,5,0.95) 0%, rgba(24,20,17,0.75) 35%, rgba(72,58,45,0.25) 70%, #F5F1EA 100%)"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-[200px] lg:pb-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-xs font-bold text-[#C7A56A] uppercase tracking-widest block">
            The Menu
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-medium text-[#141414]">
            Our Services
          </h2>
          <div className="w-16 h-[1px] bg-black/16 mx-auto" />
          <p className="font-sans text-base text-[#5C5752] leading-relaxed max-w-[760px] mx-auto">
            Tailored salon services for women and men, from styling and grooming to rituals and treatments. Experience unmatched care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-[#FBF8F3] border border-black/8 p-8 flex flex-col justify-between hover:border-[#C7A56A] hover:-translate-y-1 shadow-[0_18px_45px_rgba(20,20,20,0.04)] hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#EEE7DD]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div>
                  {/* Icon Panel */}
                  <div className="w-12 h-12 bg-[#EFE7DD] border border-black/8 flex items-center justify-center mb-6 group-hover:bg-[#C7A56A] group-hover:border-[#C7A56A] group-hover:text-white transition-all duration-500">
                    <IconComponent className="w-5 h-5 text-[#141414] group-hover:text-white transition-colors duration-500" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif-display text-xl font-medium text-[#141414] mb-3">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-[#5C5752] leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* CTA Link */}
                <Link
                  href={service.href}
                  className="inline-flex items-center space-x-2 font-sans text-xs font-bold text-[#141414] hover:text-[#C7A56A] tracking-wider uppercase mt-auto transition-colors duration-300"
                >
                  <span>View Services</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center justify-center bg-[#141414] hover:bg-[#C7A56A] text-white font-sans text-sm font-semibold px-8 py-4 tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-md"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
}

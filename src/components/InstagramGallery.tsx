'use strict';
'use client';

import React from 'react';

export default function InstagramGallery() {
  const galleryItems = [
    { id: 1, tag: "Hair Artistry", bgClass: "from-accent-silver/20 to-surface-soft" },
    { id: 2, tag: "Nail Styling", bgClass: "from-surface-soft to-accent-slate/15" },
    { id: 3, tag: "Skin Rituals", bgClass: "from-accent-slate/15 to-accent-silver/15" },
    { id: 4, tag: "Bridal Glam", bgClass: "from-accent-silver/20 to-accent-slate/10" },
    { id: 5, tag: "Grooming Studio", bgClass: "from-surface-soft to-accent-silver/10" },
  ];

  return (
    <section className="py-20 bg-[#EEE7DD] border-t border-black/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <span className="font-sans text-xs font-bold text-[#C7A56A] uppercase tracking-widest block mb-2">
              Social Presence
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#141414]">
              Studio Inspiration
            </h2>
            <p className="font-sans text-sm text-[#5C5752] mt-2 max-w-lg">
              Follow our journey on Instagram for styling tips, guest transformations, and behind-the-scenes moments.
            </p>
          </div>
          <div>
            <a
              href="https://instagram.com/auramajestystudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#141414] hover:bg-[#C7A56A] text-white font-sans text-xs font-bold px-6 py-3.5 tracking-wider uppercase transition-colors"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>@auramajestystudio</span>
            </a>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryItems.map((item) => (
            <a
              key={item.id}
              href="https://instagram.com/auramajestystudio"
              target="_blank"
              rel="noopener noreferrer"
              className="group block aspect-square bg-surface-white border border-border-custom p-2 shadow-sm relative overflow-hidden transition-all duration-300 hover:border-text-primary"
            >
              {/* Image Canvas with Gradients */}
              <div className={`w-full h-full bg-gradient-to-tr ${item.bgClass} flex items-center justify-center relative overflow-hidden`}>
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:15px_15px]" />
                
                {/* Instagram Icon Hover Overlay */}
                <div className="absolute inset-0 bg-dark-section/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <svg
                    className="w-8 h-8 text-surface-white scale-75 group-hover:scale-100 transition-transform duration-300 fill-none stroke-current"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>

                <span className="font-serif-display text-xs italic text-accent-slate/60 group-hover:text-surface-white/0 transition-colors z-0">
                  {item.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

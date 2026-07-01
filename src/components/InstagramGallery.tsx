'use strict';
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const instagramPosts = [
  { title: "Hair Artistry", image: "/instagram/hair.jpg" },
  { title: "Nail Styling", image: "/instagram/nail.jpg" },
  { title: "Skin Rituals", image: "/instagram/skin.jpg" },
  { title: "Bridal Glam", image: "/instagram/bridal.jpg" },
  { title: "Offers", image: "/instagram/offer.jpg" },
];

export default function InstagramGallery() {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

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
          {instagramPosts.map((item) => (
            <a
              key={item.title}
              href="https://instagram.com/auramajestystudio"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative h-[220px] sm:h-[260px] overflow-hidden rounded-xl"
            >
              {/* Image */}
              {!failedImages.has(item.image) ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  onError={() => handleImageError(item.image)}
                />
              ) : (
                /* Fallback placeholder if image fails */
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1EA] to-[#E8E0D4] flex items-center justify-center">
                  <span className="font-serif-display text-sm italic text-[#9A928A]/60">{item.title}</span>
                </div>
              )}

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Title text */}
              <div className="absolute inset-0 flex items-end p-4">
                <span className="font-sans text-xs font-bold text-white uppercase tracking-widest drop-shadow-sm">
                  {item.title}
                </span>
              </div>

              {/* Instagram icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-8 h-8 text-white/90 scale-75 group-hover:scale-100 transition-transform duration-300 fill-none stroke-current"
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
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

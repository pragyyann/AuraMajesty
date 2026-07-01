'use strict';
'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';

interface ServiceItem {
  name: string;
  duration?: string;
  note?: string;
}

interface ServiceCategoryCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  services: ServiceItem[];
  categorySlug: string;
}

export default function ServiceCategoryCard({
  title,
  icon: Icon,
  services,
  categorySlug,
}: ServiceCategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const getWhatsAppLink = (serviceName: string) => {
    return `https://wa.me/919355522667?text=Hi%20Aura%20Majesty%20Studio,%20I'd%20like%20to%20enquire%20about%20the%20following%20service:%20${encodeURIComponent(title + ' - ' + serviceName)}`;
  };

  return (
    <div className="bg-surface-white border border-border-custom shadow-sm transition-all duration-300 hover:border-text-primary hover:shadow-md flex flex-col justify-between">
      
      {/* Card Header (Clickable Accordion on Mobile, Static Header on Desktop) */}
      <div
        onClick={toggleAccordion}
        className="flex items-center justify-between p-6 cursor-pointer md:cursor-default md:border-b md:border-border-custom/40 bg-surface-soft/20"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-bg-salon border border-border-custom/50 flex items-center justify-center text-accent-slate">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-serif-display text-lg font-semibold text-text-primary tracking-wide">
            {title}
          </h3>
        </div>
        
        {/* Accordion Toggle Indicators (Visible on Mobile Only) */}
        <div className="md:hidden text-text-muted hover:text-text-primary">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* Services List Content */}
      <div
        className={`md:block p-6 ${
          isExpanded ? 'block' : 'hidden'
        } border-t border-border-custom/40 md:border-t-0`}
      >
        <ul className="space-y-4">
          {services.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between group py-2 border-b border-border-custom/20 last:border-0"
            >
              <div className="space-y-1 pr-4">
                <span className="font-sans text-sm font-medium text-text-primary group-hover:text-accent-slate transition-colors duration-200 block">
                  {item.name}
                </span>
                {item.duration && (
                  <span className="font-sans text-[10px] text-text-muted tracking-wider block">
                    {item.duration}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3.5 flex-shrink-0">
                {item.note && (
                  <span className="font-sans text-[10.5px] italic text-text-muted bg-surface-soft/40 px-2 py-0.5 border border-border-custom/30">
                    {item.note}
                  </span>
                )}
                <a
                  href={getWhatsAppLink(item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] font-bold text-accent-slate hover:text-surface-white hover:bg-accent-slate hover:border-accent-slate uppercase tracking-wider transition-all duration-300 opacity-90 md:opacity-0 md:group-hover:opacity-100 border border-border-custom px-3 py-1.5"
                >
                  Enquire
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer (Desktop Booking CTA) */}
      <div className="hidden md:flex items-center justify-between px-6 py-4 bg-bg-salon/30 border-t border-border-custom/30">
        <span className="font-sans text-[10px] text-text-muted uppercase tracking-wider">
          {services.length} services available
        </span>
        <button
          onClick={() => {
            const element = document.getElementById('appointment-cta-strip');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="font-sans text-[10px] font-bold text-text-primary hover:text-accent-slate uppercase tracking-widest flex items-center space-x-1"
        >
          <span>Book Category</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}

'use strict';
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AppointmentForm from './AppointmentForm';
import { Calendar, Phone } from 'lucide-react';

export default function AppointmentCTA() {
  const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const isBook = searchParams.get('book') === 'true';
    const hasCategory = !!searchParams.get('category');
    const hasService = !!searchParams.get('service');
    
    if (isBook || hasCategory || hasService) {
      setShowForm(true);
      if (isBook) {
        // Wait for React to render the form before scrolling
        setTimeout(() => {
          const element = document.getElementById('appointment-inline-form');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  }, [searchParams]);

  const handleToggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setTimeout(() => {
        const element = document.getElementById('appointment-inline-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <section id="appointment-cta-strip" className="scroll-mt-12">
      {/* Visual Banner */}
      <div className="bg-dark-section text-surface-soft py-16 px-4 border-t border-border-custom/10 text-center relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-slate/20 via-transparent to-accent-slate/10 -z-10" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-surface-white tracking-wide">
            Ready for your next salon experience?
          </h2>
          <p className="font-sans text-sm text-text-muted/80 max-w-lg mx-auto">
            Book an appointment online or contact our concierge desk to customize your personal care session.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleToggleForm}
              className="w-full sm:w-auto bg-white hover:bg-[#ECECEC] text-[#050505] font-sans text-xs font-bold px-8 py-4 tracking-wider uppercase transition-all duration-200 hover:-translate-y-[1px] flex items-center justify-center space-x-2 rounded-[16px] cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{showForm ? 'Close Form' : 'Book Appointment'}</span>
            </button>
            <Link
              href="/#contact"
              className="w-full sm:w-auto border border-white/25 bg-transparent hover:bg-white/5 text-white font-sans text-xs font-bold px-8 py-4 tracking-wider uppercase transition-all duration-200 hover:-translate-y-[1px] flex items-center justify-center space-x-2 rounded-[16px]"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Inline Appointment Form */}
      {showForm && (
        <div id="appointment-inline-form" className="animate-[fadeIn_0.5s_ease-out]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <Suspense fallback={<div className="py-24 text-center font-sans text-text-muted">Loading booking form...</div>}>
              <AppointmentForm />
            </Suspense>
          </div>
        </div>
      )}
    </section>
  );
}

'use strict';
'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Navigation } from 'lucide-react';

export default function ContactSection() {
  const handleScrollToBook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('book-appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#F5F1EA] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div className="space-y-6">
              <span className="font-sans text-xs font-bold text-[#C7A56A] uppercase tracking-widest block">
                Find Us
              </span>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-medium text-[#141414]">
                Contact Us
              </h2>
              <div className="w-16 h-[1px] bg-black/16" />
              <p className="font-sans text-base text-[#5C5752] leading-relaxed">
                Have questions about our services or need help scheduling? Contact our concierge desk or visit us directly in Indirapuram, Ghaziabad.
              </p>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="border border-black/8 p-5 bg-[#FBF8F3] shadow-[0_12px_30px_rgba(20,20,20,0.04)] space-y-3 rounded-xl">
                <MapPin className="w-5 h-5 text-[#C7A56A]" />
                <h3 className="font-serif-display text-base font-semibold text-[#141414]">Our Location</h3>
                <p className="font-sans text-xs text-[#5C5752] leading-relaxed">
                  403 GroundFloor, Niti Khand 2,<br />
                  Indirapuram, Ghaziabad,<br />
                  Uttar Pradesh 201014
                </p>
              </div>

              <div className="border border-black/8 p-5 bg-[#FBF8F3] shadow-[0_12px_30px_rgba(20,20,20,0.04)] space-y-3 rounded-xl">
                <Clock className="w-5 h-5 text-[#C7A56A]" />
                <h3 className="font-serif-display text-base font-semibold text-[#141414]">Opening Hours</h3>
                <p className="font-sans text-xs text-[#5C5752] leading-relaxed">
                  Monday – Sunday<br />
                  09:00 AM – 08:00 PM<br />
                  <span className="text-[#C7A56A] font-medium">Appointments Recommended</span>
                </p>
              </div>

              <div className="border border-black/8 p-5 bg-[#FBF8F3] shadow-[0_12px_30px_rgba(20,20,20,0.04)] space-y-3 rounded-xl">
                <Phone className="w-5 h-5 text-[#C7A56A]" />
                <h3 className="font-serif-display text-base font-semibold text-[#141414]">Call Concierge</h3>
                <p className="font-sans text-xs text-[#5C5752] leading-relaxed">
                  Direct Line:<br />
                  <a href="tel:+919355522667" className="font-semibold text-[#141414] hover:text-[#C7A56A] transition-colors">
                    +91 935-552-2667
                  </a>
                </p>
              </div>

              <div className="border border-black/8 p-5 bg-[#FBF8F3] shadow-[0_12px_30px_rgba(20,20,20,0.04)] space-y-3 rounded-xl">
                <Mail className="w-5 h-5 text-[#C7A56A]" />
                <h3 className="font-serif-display text-base font-semibold text-[#141414]">Connect With Us</h3>
                <div className="font-sans text-xs text-[#5C5752] space-y-2 leading-relaxed">
                  <div>
                    <span className="block font-semibold text-[#141414]">Email Desk:</span>
                    <a href="mailto:auramajestystudio@gmail.com" className="hover:text-[#C7A56A] transition-colors">
                      auramajestystudio@gmail.com
                    </a>
                  </div>
                  <div>
                    <span className="block font-semibold text-[#141414]">Instagram:</span>
                    <a href="https://instagram.com/auramajestystudio" target="_blank" rel="noopener noreferrer" className="hover:text-[#C7A56A] transition-colors">
                      @auramajestystudio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-black/8">
              <button
                onClick={handleScrollToBook}
                className="bg-[#141414] hover:bg-[#C7A56A] text-white font-sans text-xs font-bold px-6 py-4 tracking-wider uppercase transition-colors duration-300 flex items-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <a
                href="tel:+919355522667"
                className="border border-black/16 hover:border-[#141414] text-[#141414] hover:bg-[#141414]/5 font-sans text-xs font-bold px-6 py-4 tracking-wider uppercase transition-colors duration-300 flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=403%20GroundFloor%2C%20Niti%20Khand%202%2C%20Indirapuram%2C%20Ghaziabad%20201014"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black/16 hover:border-[#141414] text-[#141414] hover:bg-[#141414]/5 font-sans text-xs font-bold px-6 py-4 tracking-wider uppercase transition-colors duration-300 flex items-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Premium Map / Location Card */}
          <div className="lg:col-span-7 flex items-stretch">
            <div className="w-full bg-[#FBF8F3] border border-black/8 p-4 flex flex-col justify-between shadow-[0_18px_45px_rgba(20,20,20,0.04)] relative overflow-hidden rounded-2xl min-h-[350px] lg:min-h-full">
              
              {/* Styled Minimalist Map Visual */}
              <div className="w-full h-full bg-[#F5F1EA] border border-black/8 relative overflow-hidden flex-1 flex items-center justify-center rounded-xl">
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,20,20,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,20,20,0.04)_1px,transparent_1px)] bg-[size:30px_30px]" />
                
                {/* Abstract Stylized Map Roads */}
                <svg className="absolute inset-0 w-full h-full text-[#EFE7DD]" fill="none" viewBox="0 0 400 400" preserveAspectRatio="none">
                  <path d="M 0 100 Q 150 120 400 50" stroke="currentColor" strokeWidth="2" />
                  <path d="M 100 0 Q 120 200 80 400" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 0 300 Q 200 250 400 320" stroke="currentColor" strokeWidth="1" />
                  <path d="M 280 0 L 320 400" stroke="currentColor" strokeWidth="1.5" />
                </svg>
 
                {/* Accent Location Ring */}
                <div className="absolute w-36 h-36 border border-[#C7A56A]/20 rounded-full animate-ping -z-0" />
                <div className="absolute w-24 h-24 border border-[#C7A56A]/30 rounded-full -z-0" />
 
                {/* Location Pin Card */}
                <div className="relative bg-[#141414] text-white p-5 shadow-xl border border-white/8 rounded-xl max-w-xs z-10 space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-[#C7A56A] rounded-full animate-pulse" />
                    <span className="font-serif-display text-sm font-semibold tracking-wide">Aura Majesty Studio</span>
                  </div>
                  <p className="font-sans text-[11px] text-white/70 leading-relaxed">
                    403 GroundFloor, Niti Khand 2, Indirapuram, Ghaziabad 201014.
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=403%20GroundFloor%2C%20Niti%20Khand%202%2C%20Indirapuram%2C%20Ghaziabad%20201014"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 font-sans text-[10px] font-bold text-[#C7A56A] uppercase tracking-wider hover:text-white transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <span>→</span>
                  </a>
                </div>
              </div>


            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-dark-section text-surface-soft border-t border-border-custom/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/aura-logo.png"
                alt="Aura Majesty Studio logo"
                width={48}
                height={48}
                className="w-[42px] h-[42px] object-contain shrink-0"
              />
              <span className="font-serif-display text-2xl font-semibold text-surface-white tracking-wide">
                Aura Majesty Studio
              </span>
            </div>
            <p className="text-sm text-text-muted/80 leading-relaxed font-sans mb-6">
              A premium unisex salon experience crafted for modern beauty, confidence, and self-care. Experience excellence in every detail.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/auramajestystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-surface-white transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-5 h-5 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif-display text-lg font-medium text-surface-white tracking-wider mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="font-sans text-sm text-text-muted hover:text-surface-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="font-sans text-sm text-text-muted hover:text-surface-white transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#book-appointment"
                  onClick={(e) => handleLinkClick(e, '/#book-appointment')}
                  className="font-sans text-sm text-text-muted hover:text-surface-white transition-colors duration-300"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  onClick={(e) => handleLinkClick(e, '/#contact')}
                  className="font-sans text-sm text-text-muted hover:text-surface-white transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Quick Link */}
          <div>
            <h3 className="font-serif-display text-lg font-medium text-surface-white tracking-wider mb-6">
              Our Specialties
            </h3>
            <ul className="space-y-4 font-sans text-sm text-text-muted">
              <li>Hair Artistry & Styling</li>
              <li>Hair Color & Highlights</li>
              <li>Skin Rituals & Facials</li>
              <li>Makeup & Bridal Looks</li>
              <li>Men’s Grooming & Shaves</li>
              <li>Nail Care & Extensions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif-display text-lg font-medium text-surface-white tracking-wider mb-6">
              Contact & Hours
            </h3>
            <ul className="space-y-4 text-sm font-sans text-text-muted">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-silver flex-shrink-0 mt-0.5" />
                <span>
                  403 GroundFloor, Niti Khand 2,
                  <br />
                  Indirapuram, Ghaziabad 201014
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-silver flex-shrink-0" />
                <a href="tel:+919355522667" className="hover:text-surface-white transition-colors">
                  +91 935-552-2667
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-silver flex-shrink-0" />
                <a href="mailto:auramajestystudio@gmail.com" className="hover:text-surface-white transition-colors">
                  auramajestystudio@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-accent-silver flex-shrink-0 mt-0.5" />
                <span>
                  Open Daily: 09:00 AM – 08:00 PM
                  <br />
                  <span className="text-accent-silver font-medium">Unisex Services Available</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border-custom/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-text-muted/60">
          <p>© {currentYear} Aura Majesty Studio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-surface-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-surface-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

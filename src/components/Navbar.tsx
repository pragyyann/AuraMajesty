'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Appointment', href: '/#book-appointment' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-1.5 md:py-2 border-b border-white/5 bg-[#050505] shadow-[0_2px_20px_rgba(0,0,0,0.2)]'
          : 'py-2.5 md:py-3 border-b border-white/12 bg-black/92 md:bg-black/35 backdrop-blur-[12px] shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center space-x-3.5">
              <Image
                src="/aura-logo.png"
                alt="Aura Majesty Studio logo"
                width={68}
                height={68}
                className="w-[42px] h-[42px] md:w-[58px] md:h-[58px] lg:w-[68px] lg:h-[68px] object-contain shrink-0"
              />
              <span className="font-serif-display text-base md:text-xl lg:text-2xl tracking-wide font-bold text-white group-hover:text-white/85 transition-colors duration-300">
                <span className="hidden sm:inline">Aura Majesty Studio</span>
                <span className="inline sm:hidden">Aura Majesty</span>
              </span>
            </Link>
          </div>
 
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`font-sans text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
 
          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Instagram Link */}
            <a
              href="https://instagram.com/auramajestystudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors duration-300 inline-flex items-center space-x-2 font-sans text-xs font-semibold uppercase tracking-wider"
              aria-label="Follow us on Instagram"
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
              <span>Instagram</span>
            </a>
            {/* Book CTA */}
            <Link
              href="/#book-appointment"
              onClick={() => handleLinkClick('/#book-appointment')}
              className="bg-white hover:bg-[#ECEFF1] text-[#050505] font-sans text-xs font-bold px-6 py-3 tracking-wider uppercase transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>
 
          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-3.5">
            {/* Quick WhatsApp CTA on mobile */}
            <a
              href="https://wa.me/919355522667?text=Hi%20Aura%20Majesty%20Studio%2C%20I%20want%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="w-[38px] h-[38px] rounded-full border border-white/14 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300"
              aria-label="Book on WhatsApp"
            >
              <svg 
                className="w-5 h-5 fill-current text-[#25D366]" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-white hover:text-white/80 transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-[#050505] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between p-6">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
              <div className="flex items-center space-x-2.5">
                <Image
                  src="/aura-logo.png"
                  alt="Aura Majesty Studio logo"
                  width={38}
                  height={38}
                  className="w-[38px] h-[38px] object-contain shrink-0"
                />
                <span className="font-serif-display text-lg font-bold text-white">
                  Aura Majesty
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80 p-1"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`font-sans text-base font-semibold tracking-wide transition-colors duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {/* Instagram link in mobile menu */}
              <a
                href="https://instagram.com/auramajestystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-base font-semibold text-white/80 hover:text-white tracking-wide transition-colors duration-300 block"
              >
                Instagram
              </a>
            </nav>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <a
              href="tel:+919355522667"
              className="flex items-center justify-center space-x-2 w-full border border-white/20 py-3 text-white font-sans text-sm font-semibold tracking-wide hover:bg-white/10 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Call Studio</span>
            </a>
            <Link
              href="/#book-appointment"
              onClick={() => handleLinkClick('/#book-appointment')}
              className="flex items-center justify-center w-full bg-white py-3 text-[#050505] font-sans text-sm font-semibold tracking-wide hover:bg-[#ECEFF1] transition-colors duration-300"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
    </header>
  );
}

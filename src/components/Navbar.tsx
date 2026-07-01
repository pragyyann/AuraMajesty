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
          : 'py-2.5 md:py-3.5 border-b border-white/12 bg-black/35 backdrop-blur-[12px] shadow-none'
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
          <div className="flex md:hidden items-center space-x-4">
            {/* Quick Book CTA on mobile */}
            <Link
              href="/#book-appointment"
              onClick={() => handleLinkClick('/#book-appointment')}
              className="bg-white hover:bg-[#ECEFF1] text-[#050505] font-sans text-xs font-bold px-4 py-2 tracking-wider uppercase transition-all duration-300"
            >
              Book
            </Link>
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

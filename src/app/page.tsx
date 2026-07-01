'use strict';
'use client';

import React, { Suspense } from 'react';
import Hero3D from '@/components/Hero3D';
import ServicePreview from '@/components/ServicePreview';
import AppointmentForm from '@/components/AppointmentForm';
import ContactSection from '@/components/ContactSection';
import InstagramGallery from '@/components/InstagramGallery';

export default function Home() {
  return (
    <>
      {/* 3D-inspired Editorial Hero Section */}
      <Hero3D />

      {/* Services Grid Preview */}
      <ServicePreview />

      {/* Booking / Reservation Form */}
      <Suspense fallback={<div className="py-24 bg-bg-salon text-center font-sans text-text-muted">Loading booking form...</div>}>
        <AppointmentForm />
      </Suspense>

      {/* Contact & Map Location Section */}
      <ContactSection />

      {/* Instagram Inspiration Gallery */}
      <InstagramGallery />
    </>
  );
}

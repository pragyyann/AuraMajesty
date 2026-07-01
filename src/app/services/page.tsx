'use strict';
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ServicesHero from '@/components/ServicesHero';
import AppointmentCTA from '@/components/AppointmentCTA';
import { servicesData, categoryDescriptions, ServiceItem } from '@/data/services';
import {
  Scissors,
  Palette,
  Layers,
  Droplet,
  Sparkles,
  Heart,
  User,
  Activity,
  Maximize2,
  Search,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Hair Styling":
    case "Hair Cut & Finish":
      return Scissors;
    case "Make Up & Glam":
      return Heart;
    case "Hair Texture":
      return Layers;
    case "Hair Treatments":
      return Droplet;
    case "Facials & Rituals":
    case "Skin Care":
      return Sparkles;
    case "Hand & Feet":
      return Activity;
    case "Nail Care":
      return Maximize2;
    case "Hair Colour":
      return Palette;
    case "Beard Grooming":
      return User;
    default:
      return Sparkles;
  }
};

function ServicesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'Ladies' | 'Gents' | 'Unisex'>('Ladies');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Parse tab from URL parameters
  useEffect(() => {
    const tabParam = searchParams.get('tab')?.toLowerCase();
    if (tabParam === 'gents') {
      setActiveTab('Gents');
    } else if (tabParam === 'unisex') {
      setActiveTab('Unisex');
    } else if (tabParam === 'ladies') {
      setActiveTab('Ladies');
    }
  }, [searchParams]);

  // Reset category filters and expansion when active tab changes
  useEffect(() => {
    setSelectedCategory(null);
    setExpandedCategory(null);
  }, [activeTab]);

  // Reset expansion when search query changes
  useEffect(() => {
    setExpandedCategory(null);
  }, [searchQuery]);

  // Filter services corresponding to current active tab
  const tabServices = servicesData.filter(s => s.genderGroup === activeTab);
  
  // Get all unique categories for current tab
  const categoriesList = Array.from(new Set(tabServices.map(s => s.category)));

  // Filter services by category, search query
  const filteredServices = tabServices.filter(service => {
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group filtered services by category
  const groupedServices = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceItem[]>);

  const handleBookCategory = (categoryTitle: string) => {
    console.log("Selected Category for Booking:", categoryTitle);
    router.push(`/services?category=${encodeURIComponent(categoryTitle)}`);
  };

  const handleBookAppointment = (categoryTitle: string) => {
    console.log("Selected Category for Booking Appointment:", categoryTitle);
    router.push(`/services?category=${encodeURIComponent(categoryTitle)}&book=true`);
  };

  const handleTabChange = (tab: 'Ladies' | 'Gents' | 'Unisex') => {
    setActiveTab(tab);
    router.push(`/services?tab=${tab.toLowerCase()}`);
  };

  const handleToggleExpand = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  // Helper to get 3 preview items per category
  const getPreviewServices = (categoryServices: ServiceItem[]) => {
    if (!searchQuery) {
      return categoryServices.slice(0, 3);
    }
    const matching = categoryServices.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matching.length > 0) {
      return matching.slice(0, 3);
    }
    return categoryServices.slice(0, 3);
  };

  return (
    <>
      <ServicesHero />

      {/* Main Services Filter & Grid Area */}
      <section className="py-20 bg-bg-salon min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Controls Panel (Tabs, Search, and Filters) */}
          <div className="space-y-6">
            
            {/* Segmented Control Gender Tabs */}
            <div className="flex justify-center">
              <div className="bg-surface-soft border border-border-custom p-1.5 flex space-x-1 max-w-md w-full shadow-sm">
                {(['Ladies', 'Gents', 'Unisex'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`flex-1 py-3 text-center font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-accent-slate text-surface-white'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {tab === 'Unisex' ? 'Unisex / Popular' : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-white border border-border-custom text-text-primary font-sans text-sm focus:outline-none focus:border-accent-slate transition-all placeholder:text-text-muted/50"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 justify-start md:justify-center scrollbar-none max-w-4xl mx-auto -mx-4 px-4 sm:mx-auto sm:px-0">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-4 py-2 border font-sans text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === null
                    ? 'bg-accent-slate border-accent-slate text-surface-white'
                    : 'bg-surface-white border-border-custom text-text-primary hover:bg-surface-soft'
                }`}
              >
                All Categories
              </button>
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 border font-sans text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-accent-slate border-accent-slate text-surface-white'
                      : 'bg-surface-white border-border-custom text-text-primary hover:bg-surface-soft'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Categories Overview Grid - Equal Height */}
          {Object.keys(groupedServices).length > 0 ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {Object.entries(groupedServices).map(([categoryName, items]) => {
                  const CategoryIcon = getCategoryIcon(categoryName);
                  const desc = categoryDescriptions[categoryName] || "";
                  const previewItems = getPreviewServices(items);
                  const isExpanded = expandedCategory === categoryName;

                  return (
                    <div
                      key={categoryName}
                      className={`bg-surface-white border transition-all duration-300 flex flex-col justify-between h-full ${
                        isExpanded
                          ? 'border-accent-slate ring-1 ring-accent-slate/20 shadow-md'
                          : 'border-border-custom shadow-sm hover:border-text-primary hover:shadow-md'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="p-6 border-b border-border-custom/40 bg-surface-soft/10">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="w-10 h-10 bg-bg-salon border border-border-custom/50 flex items-center justify-center text-accent-slate">
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-serif-display text-lg font-semibold text-text-primary tracking-wide leading-snug">
                              {categoryName}
                            </h3>
                            <span className="font-sans text-[10px] text-text-muted uppercase tracking-wider block">
                              {items.length} services
                            </span>
                          </div>
                        </div>
                        {desc && (
                          <p className="font-sans text-xs text-text-muted/80 leading-relaxed mt-3 line-clamp-2">
                            {desc}
                          </p>
                        )}
                      </div>

                      {/* Preview Services List (Exactly 3) */}
                      <div className="p-6 flex-grow">
                        <span className="block font-sans text-[9px] font-bold uppercase tracking-widest text-text-dim mb-3">
                          Featured Services
                        </span>
                        <ul className="space-y-3">
                          {previewItems.map((item) => (
                            <li key={item.id} className="flex justify-between items-start text-xs border-b border-border-custom/20 pb-2 last:border-0 last:pb-0">
                              <span className="font-sans font-medium text-text-primary">
                                {item.name}
                              </span>
                              <span className="font-sans text-text-muted flex-shrink-0 ml-4">
                                {item.duration}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Buttons Panel */}
                      <div className="p-6 pt-0 flex flex-col gap-3">
                        <button
                          onClick={() => handleToggleExpand(categoryName)}
                          className={`w-full font-sans text-xs font-bold uppercase tracking-widest py-3 px-4 text-center transition-colors ${
                            isExpanded
                              ? 'bg-accent-slate text-surface-white hover:bg-accent-slate/90'
                              : 'bg-dark-section text-surface-white hover:bg-accent-slate'
                          }`}
                        >
                          {isExpanded ? 'Hide Details' : 'View Services'}
                        </button>
                        
                        <button
                          onClick={() => handleBookCategory(categoryName)}
                          className="w-full border border-border-custom hover:border-text-primary text-text-primary font-sans text-xs font-bold uppercase tracking-widest py-2.5 px-4 text-center transition-colors bg-surface-white"
                        >
                          Book Category
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Full-Width Expandable Service Details Panel */}
              {expandedCategory && groupedServices[expandedCategory] && (
                <div
                  id="expanded-details-panel"
                  className="bg-surface-white border border-accent-slate p-6 md:p-10 shadow-lg animate-[fadeIn_0.4s_ease-out] scroll-mt-24"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border-custom pb-6 mb-8 gap-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        {(() => {
                          const Icon = getCategoryIcon(expandedCategory);
                          return <Icon className="w-6 h-6 text-accent-slate" />;
                        })()}
                        <h3 className="font-serif-display text-2xl md:text-3xl font-medium text-text-primary">
                          {expandedCategory}
                        </h3>
                      </div>
                      <p className="font-sans text-sm text-text-muted">
                        {categoryDescriptions[expandedCategory]}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedCategory(null)}
                      className="text-xs font-sans font-bold text-text-muted hover:text-text-primary uppercase tracking-widest border border-border-custom hover:border-text-primary px-4 py-2 bg-surface-white transition-colors"
                    >
                      Close Panel
                    </button>
                  </div>

                  {/* Services List in 2-column layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {groupedServices[expandedCategory].map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start py-3 border-b border-border-custom/30 group hover:border-accent-slate transition-colors"
                      >
                        <div className="space-y-1 pr-4">
                          <span className="font-sans text-sm font-medium text-text-primary group-hover:text-accent-slate transition-colors block">
                            {item.name}
                          </span>
                          <span className="font-sans text-xs text-text-muted block">
                            {item.duration}
                          </span>
                        </div>
                        {item.consultationBased && (
                          <span className="inline-flex items-center space-x-1 font-sans text-[9px] font-bold text-accent-silver border border-accent-silver/30 bg-accent-silver/5 px-2.5 py-1 mt-0.5 flex-shrink-0">
                            <HelpCircle className="w-2.5 h-2.5" />
                            <span>Consultation based</span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bottom Panel CTA */}
                  <div className="mt-10 pt-8 border-t border-border-custom flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                      <span className="block font-sans text-[10px] text-text-muted uppercase tracking-wider mb-1">
                        Ready to experience {expandedCategory}?
                      </span>
                      <p className="font-serif-display text-lg text-text-primary">
                        Reserve your session and select stylings inside the booking desk.
                      </p>
                    </div>
                    <button
                      onClick={() => handleBookAppointment(expandedCategory)}
                      className="w-full sm:w-auto bg-dark-section hover:bg-accent-slate text-surface-white font-sans text-xs font-bold uppercase tracking-widest py-4 px-8 shadow-md transition-colors"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-surface-white border border-border-custom p-8 max-w-md mx-auto">
              <p className="font-sans text-sm text-text-muted">
                No services found matching your criteria. Try resetting filters or search query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="mt-4 font-sans text-xs font-bold text-accent-slate hover:text-text-primary uppercase tracking-widest underline decoration-2 underline-offset-4"
              >
                Clear Search & Filters
              </button>
            </div>
          )}

        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-salon flex items-center justify-center font-sans text-text-muted">
        Loading services menu...
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}

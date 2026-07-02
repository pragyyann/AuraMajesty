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
  HelpCircle,
  X
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

interface ServiceDetailsModalProps {
  categoryName: string;
  items: ServiceItem[];
  icon: React.ComponentType<{ className?: string }>;
  onClose: () => void;
  onBook: (categoryName: string) => void;
}

function ServiceDetailsModal({
  categoryName,
  items,
  icon: Icon,
  onClose,
  onBook,
}: ServiceDetailsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Lock background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const desc = categoryDescriptions[categoryName] || "";

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[4px] p-4 animate-[fadeIn_0.2s_ease-out]"
    >
      <div className="bg-[#FBF8F3] border border-black/10 rounded-[20px] w-full max-w-[760px] max-h-[80vh] flex flex-col shadow-2xl relative overflow-hidden animate-[zoomIn_0.2s_ease-out]">
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-black/8 flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#F5F1EA] border border-black/8 flex items-center justify-center text-[#C7A56A] rounded-xl">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl md:text-2xl font-semibold text-[#141414] leading-snug">
                {categoryName}
              </h3>
              <span className="font-sans text-xs text-[#5C5752] uppercase tracking-wider block mt-0.5">
                {items.length} services available
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 text-[#5C5752] hover:text-[#141414] rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-5 scrollbar-thin scrollbar-thumb-[#C7A56A]/20 scrollbar-track-transparent">
          {desc && (
            <p className="font-sans text-sm text-[#5C5752] leading-relaxed pb-2 border-b border-black/5">
              {desc}
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 pt-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start py-3 border-b border-black/5 group hover:border-[#C7A56A] transition-colors"
              >
                <div className="space-y-1 pr-4">
                  <span className="font-sans text-sm font-medium text-[#141414] group-hover:text-[#C7A56A] transition-colors block">
                    {item.name}
                  </span>
                  <span className="font-sans text-xs text-[#5C5752] block">
                    {item.duration}
                  </span>
                </div>
                {item.consultationBased && (
                  <span className="inline-flex items-center space-x-1 font-sans text-[9px] font-bold text-[#C7A56A] border border-[#C7A56A]/30 bg-[#C7A56A]/5 px-2.5 py-1 mt-0.5 flex-shrink-0">
                    <HelpCircle className="w-2.5 h-2.5" />
                    <span>Consultation based</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 border-t border-black/8 bg-[#EFE7DD]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-sans text-[#5C5752] hidden sm:inline">
            Reserve your session below.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none border border-black/16 hover:border-[#141414] text-[#141414] font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-6 text-center cursor-pointer transition-colors bg-[#FBF8F3] hover:bg-[#141414]/5 rounded-[14px]"
            >
              Close
            </button>
            <button
              onClick={() => onBook(categoryName)}
              className="flex-1 sm:flex-none bg-[#141414] hover:bg-[#C7A56A] text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-6 shadow-md cursor-pointer transition-colors rounded-[14px]"
            >
              Book Category
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function ServicesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'Ladies' | 'Gents' | 'Unisex'>('Ladies');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModalCategory, setSelectedModalCategory] = useState<string | null>(null);

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
    setSelectedModalCategory(null);
  }, [activeTab]);

  // Reset expansion when search query changes
  useEffect(() => {
    setSelectedModalCategory(null);
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
    const serviceItem = servicesData.find(
      (s) => s.category.toLowerCase() === categoryTitle.toLowerCase()
    );
    const serviceFor = serviceItem ? serviceItem.genderGroup : activeTab;
    router.push(`/?serviceFor=${encodeURIComponent(serviceFor)}&category=${encodeURIComponent(categoryTitle)}#book-appointment`);
  };

  const handleTabChange = (tab: 'Ladies' | 'Gents' | 'Unisex') => {
    setActiveTab(tab);
    router.push(`/services?tab=${tab.toLowerCase()}`);
  };

  const handleOpenModal = (categoryName: string) => {
    setSelectedModalCategory(categoryName);
  };

  const handleBookCategoryClick = (categoryName: string) => {
    setSelectedModalCategory(null);
    handleBookCategory(categoryName);
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
      <section className="py-20 bg-[#F5F1EA] text-[#141414] min-h-screen border-b border-black/8 relative">
        {/* Dark-to-Neutral Transition Band */}
        <div 
          className="absolute top-0 left-0 right-0 h-[75px] md:h-[110px] pointer-events-none z-10"
          style={{
            background: "linear-gradient(180deg, rgba(5, 5, 5, 0.82) 0%, rgba(5, 5, 5, 0.38) 35%, rgba(245, 241, 234, 0.82) 78%, #F5F1EA 100%)"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Controls Panel (Tabs, Search, and Filters) */}
          <div className="space-y-6">
            
            {/* Segmented Control Gender Tabs */}
            <div className="flex justify-center">
              <div className="bg-[#EFE7DD]/40 border border-black/8 p-1.5 flex space-x-1 max-w-md w-full shadow-sm rounded-[14px]">
                {(['Ladies', 'Gents', 'Unisex'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`flex-1 py-3 text-center font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-[12px] ${
                      activeTab === tab
                        ? 'bg-[#141414] text-white shadow-sm'
                        : 'text-[#5C5752] hover:text-[#141414]'
                    }`}
                  >
                    {tab === 'Unisex' ? 'Unisex / Popular' : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-[760px] md:max-w-[800px] mx-auto w-full mb-8 px-4 sm:px-0">
              <div className="relative w-full h-[54px] md:h-[58px]">
                <Search className="w-5 h-5 text-[#8A827A] absolute left-5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full pl-14 pr-5 bg-[#FBF8F3] border border-black/10 text-[#141414] font-sans text-sm focus:outline-none focus:border-[#C7A56A] focus:ring-[3px] focus:ring-[#C7A56A]/18 transition-all placeholder:text-[#8A827A] rounded-[16px]"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="relative max-w-[1100px] mx-auto overflow-visible">
              <div className="flex gap-3 overflow-x-auto md:flex-wrap md:justify-center pb-4 pt-1 px-5 scrollbar-none scroll-pl-5 -mx-5 md:mx-auto overflow-y-visible">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`flex-shrink-0 flex-grow-0 flex-none px-5 py-3 border font-sans text-[13px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-full shadow-[0_8px_24px_rgba(20,20,20,0.04)] hover:-translate-y-[1px] ${
                    selectedCategory === null
                      ? 'bg-[#141414] border-[#141414] text-white shadow-[0_14px_34px_rgba(20,20,20,0.18)]'
                      : 'bg-[#FBF8F3] border-black/10 text-[#34302C] hover:bg-white hover:border-[#C7A56A]/35'
                  }`}
                  style={{ flex: '0 0 auto' }}
                >
                  All Categories
                </button>
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex-shrink-0 flex-grow-0 flex-none px-5 py-3 border font-sans text-[13px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-full shadow-[0_8px_24px_rgba(20,20,20,0.04)] hover:-translate-y-[1px] ${
                      selectedCategory === cat
                        ? 'bg-[#141414] border-[#141414] text-white shadow-[0_14px_34px_rgba(20,20,20,0.18)]'
                        : 'bg-[#FBF8F3] border-black/10 text-[#34302C] hover:bg-white hover:border-[#C7A56A]/35'
                    }`}
                    style={{ flex: '0 0 auto' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
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
                  const isModalActive = selectedModalCategory === categoryName;

                  return (
                    <div
                      key={categoryName}
                      className={`group bg-[#FBF8F3] border transition-all duration-300 flex flex-col justify-between h-full rounded-xl overflow-hidden ${
                        isModalActive
                          ? 'border-[#C7A56A] ring-1 ring-[#C7A56A]/20 shadow-md'
                          : 'border-black/8 shadow-[0_12px_30px_rgba(20,20,20,0.04)] hover:border-[#C7A56A] hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)]'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="p-6 border-b border-black/8 bg-[#EFE7DD]/10">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="w-10 h-10 bg-[#F5F1EA] border border-black/8 flex items-center justify-center text-[#C7A56A] group-hover:bg-[#C7A56A] group-hover:border-[#C7A56A] group-hover:text-white transition-colors duration-300">
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-serif-display text-lg font-semibold text-[#141414] tracking-wide leading-snug">
                              {categoryName}
                            </h3>
                            <span className="font-sans text-[10px] text-[#5C5752] uppercase tracking-wider block">
                              {items.length} services
                            </span>
                          </div>
                        </div>
                        {desc && (
                          <p className="font-sans text-xs text-[#5C5752]/80 leading-relaxed mt-3 line-clamp-2">
                            {desc}
                          </p>
                        )}
                      </div>

                      {/* Preview Services List (Exactly 3) */}
                      <div className="p-6 flex-grow">
                        <span className="block font-sans text-[9px] font-bold uppercase tracking-widest text-[#C7A56A]/80 mb-3">
                          Featured Services
                        </span>
                        <ul className="space-y-3">
                          {previewItems.map((item) => (
                            <li key={item.id} className="flex justify-between items-start text-xs border-b border-black/8 pb-2 last:border-0 last:pb-0">
                              <span className="font-sans font-medium text-[#141414]">
                                {item.name}
                              </span>
                              <span className="font-sans text-[#5C5752] flex-shrink-0 ml-4">
                                {item.duration}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Buttons Panel */}
                      <div className="p-6 pt-0 flex flex-col gap-3">
                        <button
                          type="button"
                          onClick={() => handleOpenModal(categoryName)}
                          className={`w-full font-sans text-xs font-bold uppercase tracking-widest py-3 px-4 text-center cursor-pointer transition-colors duration-200 rounded-[14px] ${
                            isModalActive
                              ? 'bg-[#C7A56A] text-white shadow-sm'
                              : 'bg-[#141414] text-white hover:bg-[#C7A56A]'
                          }`}
                        >
                          View Services
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => handleBookCategory(categoryName)}
                          className="w-full border border-black/16 hover:border-[#141414] text-[#141414] font-sans text-xs font-bold uppercase tracking-widest py-2.5 px-4 text-center cursor-pointer transition-colors duration-200 bg-[#FBF8F3] hover:bg-[#141414]/5 rounded-[14px]"
                        >
                          Book Category
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Overlay Render */}
              {selectedModalCategory && groupedServices[selectedModalCategory] && (
                <ServiceDetailsModal
                  categoryName={selectedModalCategory}
                  items={groupedServices[selectedModalCategory]}
                  icon={getCategoryIcon(selectedModalCategory)}
                  onClose={() => setSelectedModalCategory(null)}
                  onBook={handleBookCategoryClick}
                />
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-[#FBF8F3] border border-black/8 p-8 max-w-md mx-auto rounded-2xl">
              <p className="font-sans text-sm text-[#5C5752]">
                No services found matching your criteria. Try resetting filters or search query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="mt-4 font-sans text-xs font-bold text-[#C7A56A] hover:text-[#141414] uppercase tracking-widest underline decoration-2 underline-offset-4 cursor-pointer"
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
      <div className="min-h-screen bg-[#F5F1EA] flex items-center justify-center font-sans text-[#5C5752]">
        Loading services menu...
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}

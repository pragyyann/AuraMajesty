'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Phone, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { servicesData } from '@/data/services';

export default function AppointmentForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    genderGroup: '' as 'Ladies' | 'Gents' | 'Unisex' | '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const [preselectedCategory, setPreselectedCategory] = useState<string | null>(null);

  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedAppointment, setLastSubmittedAppointment] = useState<any>(null);


  // Helper to preserve scroll position under all conditions
  const restoreScrollPosition = (x: number, y: number) => {
    requestAnimationFrame(() => {
      window.scrollTo(x, y);
      requestAnimationFrame(() => {
        window.scrollTo(x, y);
      });
    });

    setTimeout(() => {
      window.scrollTo(x, y);
    }, 0);

    setTimeout(() => {
      window.scrollTo(x, y);
    }, 50);
  };

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const categoryParam = searchParams.get('category');
    const serviceForParam = searchParams.get('serviceFor') || searchParams.get('genderGroup');
    
    let gender = '' as 'Ladies' | 'Gents' | 'Unisex' | '';
    if (serviceForParam) {
      const lower = serviceForParam.toLowerCase();
      if (lower.includes('lady') || lower.includes('ladies')) {
        gender = 'Ladies';
      } else if (lower.includes('gent') || lower.includes('gents')) {
        gender = 'Gents';
      } else if (lower.includes('uni')) {
        gender = 'Unisex';
      }
    }
    
    if (serviceParam) {
      const match = servicesData.find(
        (s) => s.name.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({
          ...prev,
          genderGroup: match.genderGroup,
          service: match.name
        }));
        setPreselectedCategory(match.category);
        console.log("Preselected Service:", match.name, "Group:", match.genderGroup);
      }
    } else if (categoryParam) {
      const matchingServices = servicesData.filter(
        (s) => s.category.toLowerCase() === categoryParam.toLowerCase() && (!gender || s.genderGroup === gender)
      );
      
      if (matchingServices.length > 0) {
        const resolvedGender = gender || (matchingServices[0].genderGroup as 'Ladies' | 'Gents' | 'Unisex');
        setFormData((prev) => ({
          ...prev,
          genderGroup: resolvedGender,
          service: matchingServices.length === 1 ? matchingServices[0].name : ''
        }));
        setPreselectedCategory(categoryParam);
        console.log("Preselected Category:", categoryParam, "Gender:", resolvedGender);
      }
    }

    // Scroll fallback for book-appointment hash route
    if (typeof window !== 'undefined' && window.location.hash === '#book-appointment') {
      setTimeout(() => {
        const element = document.getElementById('book-appointment');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [searchParams]);

  const handleSelectGenderGroup = (group: 'Ladies' | 'Gents' | 'Unisex') => {
    setFormData((prev) => ({ ...prev, genderGroup: group, service: '' }));
    setPreselectedCategory(null);
    setSubmitError('');
    setSubmitSuccess('');
  };

  const getWhatsAppLink = () => {
    const hasFilledFields = formData.fullName.trim() || formData.phoneNumber.trim() || formData.genderGroup || formData.service || formData.preferredDate || formData.preferredTime;

    if (!hasFilledFields) {
      return "https://wa.me/919355522667?text=Hi%20Aura%20Majesty%20Studio%2C%20I%20want%20to%20book%20an%20appointment.";
    }

    const match = servicesData.find(s => s.name === formData.service);

    let text = "Hi Aura Majesty Studio, I want to book an appointment.\n\n";
    if (formData.fullName.trim()) text += `Name: ${formData.fullName.trim()}\n`;
    if (formData.phoneNumber.trim()) text += `Phone: ${formData.phoneNumber.trim()}\n`;
    if (formData.genderGroup) text += `Service For: ${formData.genderGroup === 'Unisex' ? 'Unisex / Popular' : formData.genderGroup}\n`;
    if (formData.service) text += `Service: ${match ? match.name : formData.service}\n`;
    if (match?.duration) text += `Duration: ${match.duration}\n`;
    if (formData.preferredDate) text += `Date: ${formatDisplayDate(formData.preferredDate)}\n`;
    if (formData.preferredTime) text += `Time: ${formData.preferredTime}\n`;
    if (formData.notes.trim()) text += `Notes: ${formData.notes.trim()}\n`;

    return `https://wa.me/919355522667?text=${encodeURIComponent(text.trim())}`;
  };

  const timeSlots = {
    Morning: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    Afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"],
    Evening: ["04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM"]
  };

  // Helper to dynamically calculate 7 upcoming dates starting today
  const getUpcomingDates = () => {
    const dates = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const baseDate = new Date();
    
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(baseDate.getDate() + i);
      
      const year = d.getFullYear();
      const monthIndex = d.getMonth();
      const month = String(monthIndex + 1).padStart(2, '0');
      const date = String(d.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${date}`;
      
      dates.push({
        dateString,
        dayName: days[d.getDay()],
        dateNum: date,
        monthName: months[monthIndex],
        isToday: i === 0,
        isTomorrow: i === 1,
      });
    }
    return dates;
  };

  const upcomingDates = getUpcomingDates();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectDate = (dateString: string) => {
    setFormData((prev) => ({ ...prev, preferredDate: dateString }));
    setSubmitError('');
    setSubmitSuccess('');
  };

  const handleSelectTime = (time: string) => {
    setFormData((prev) => ({ ...prev, preferredTime: time }));
    setSubmitError('');
    setSubmitSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const scrollXBefore = window.scrollX;
    const scrollYBefore = window.scrollY;
    console.log("Submit scroll before:", scrollYBefore);

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    if (!formData.fullName.trim()) {
      setSubmitError('Please enter your full name.');
      restoreScrollPosition(scrollXBefore, scrollYBefore);
      setIsSubmitting(false);
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setSubmitError('Please enter your phone number.');
      restoreScrollPosition(scrollXBefore, scrollYBefore);
      setIsSubmitting(false);
      return;
    }
    if (!formData.genderGroup) {
      setSubmitError('Please select who the service is for.');
      restoreScrollPosition(scrollXBefore, scrollYBefore);
      setIsSubmitting(false);
      return;
    }
    if (!formData.service) {
      setSubmitError('Please select a service.');
      restoreScrollPosition(scrollXBefore, scrollYBefore);
      setIsSubmitting(false);
      return;
    }
    if (!formData.preferredDate) {
      setSubmitError('Please select your preferred date.');
      restoreScrollPosition(scrollXBefore, scrollYBefore);
      setIsSubmitting(false);
      return;
    }
    if (!formData.preferredTime) {
      setSubmitError('Please select your preferred time slot.');
      restoreScrollPosition(scrollXBefore, scrollYBefore);
      setIsSubmitting(false);
      return;
    }

    // Resolve service metadata from servicesData
    const match = servicesData.find(
      (s) => s.name.toLowerCase() === formData.service.toLowerCase() && s.genderGroup === formData.genderGroup
    );

    const payload = {
      fullName: formData.fullName.trim(),
      phone: formData.phoneNumber.trim(),
      serviceFor: formData.genderGroup,
      serviceCategory: match ? match.category : "Popular Services",
      serviceName: match ? match.name : formData.service,
      duration: match ? match.duration : "",
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      notes: formData.notes.trim(),
      source: "Website"
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit appointment.");
      }

      setSubmitSuccess("Your appointment request has been received. Aura Majesty Studio will confirm your booking shortly.");
      setLastSubmittedAppointment(payload);
      console.log("Submit scroll after success before restore:", window.scrollY);
      restoreScrollPosition(scrollXBefore, scrollYBefore);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again or contact us on WhatsApp.");
      restoreScrollPosition(scrollXBefore, scrollYBefore);
    } finally {
      setIsSubmitting(false);
      console.log("Submit scroll after finally:", window.scrollY);
      restoreScrollPosition(scrollXBefore, scrollYBefore);
    }
  };

  const handleReset = () => {
    const scrollXBefore = window.scrollX;
    const scrollYBefore = window.scrollY;

    setFormData({
      fullName: '',
      phoneNumber: '',
      genderGroup: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
    });
    setSubmitSuccess('');
    setSubmitError('');
    setLastSubmittedAppointment(null);
    setPreselectedCategory(null);

    restoreScrollPosition(scrollXBefore, scrollYBefore);
  };

  // Helper to format stored YYYY-MM-DD date to friendly string for receipt
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    } catch (e) {
      return dateStr;
    }
  };

  // Helper to build WhatsApp confirm link for last submitted appointment
  const buildWhatsAppUrl = (payload: any) => {
    if (!payload) return "";
    const displayDate = formatDisplayDate(payload.preferredDate);
    const message = `Hi Aura Majesty Studio, I want to confirm my appointment request.\n\nName: ${payload.fullName}\nPhone: ${payload.phone}\nService For: ${payload.serviceFor === 'Unisex' ? 'Unisex / Popular' : payload.serviceFor}\nService: ${payload.serviceName}\nDuration: ${payload.duration || ""}\nDate: ${displayDate}\nTime: ${payload.preferredTime}\nNotes: ${payload.notes || "None"}`;
    return `https://wa.me/919355522667?text=${encodeURIComponent(message)}`;
  };


  return (
    <section id="book-appointment" className="py-24 bg-[#EEE7DD] border-b border-black/8 scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="font-sans text-xs font-bold text-[#C7A56A] uppercase tracking-widest block">
            Reservations
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-medium text-[#141414]">
            Book Your Appointment
          </h2>
          <p className="font-sans text-base text-[#5C5752] max-w-lg mx-auto">
            Reserve your salon session with ease. We will confirm your booking via phone call or WhatsApp.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#FBF8F3] border border-black/8 p-6 sm:p-10 shadow-[0_18px_45px_rgba(20,20,20,0.04)] relative overflow-hidden rounded-2xl">
          
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>

              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${submitSuccess ? 'opacity-60 pointer-events-none' : ''}`}>
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#141414]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    readOnly={!!submitSuccess}
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full bg-[#FBF8F3] border border-black/[0.12] px-4 py-3 text-[#141414] font-sans text-sm focus:outline-none focus:border-[#C7A56A] focus:bg-white focus:ring-[3px] focus:ring-[#C7A56A]/16 placeholder:text-[#9A928A] transition-all duration-200 ${submitSuccess ? 'cursor-default' : ''}`}
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#141414]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    readOnly={!!submitSuccess}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className={`w-full bg-[#FBF8F3] border border-black/[0.12] px-4 py-3 text-[#141414] font-sans text-sm focus:outline-none focus:border-[#C7A56A] focus:bg-white focus:ring-[3px] focus:ring-[#C7A56A]/16 placeholder:text-[#9A928A] transition-all duration-200 ${submitSuccess ? 'cursor-default' : ''}`}
                  />
                </div>

                {/* Service For / Gender Group */}
                <div className="space-y-3 md:col-span-2">
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#141414]">
                    Service For *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                    {(['Ladies', 'Gents', 'Unisex'] as const).map((group) => {
                      const isSelected = formData.genderGroup === group;
                      return (
                        <button
                          key={group}
                          type="button"
                          onClick={() => !submitSuccess && handleSelectGenderGroup(group)}
                          disabled={!!submitSuccess}
                          className={`py-3 px-4 text-center font-sans text-xs font-semibold uppercase tracking-widest border transition-all duration-200 rounded-[12px] ${submitSuccess ? 'cursor-default' : 'cursor-pointer'} ${
                            isSelected
                              ? 'bg-[#141414] text-white border-[#141414]'
                              : 'bg-[#F5F1EA] text-[#141414] border-black/8 hover:bg-[#EFE7DD]'
                          }`}
                        >
                          {group === 'Unisex' ? 'Unisex / Popular' : group}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="service" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#141414]">
                    Select Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    disabled={!formData.genderGroup || !!submitSuccess}
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full bg-[#FBF8F3] border border-black/[0.12] px-4 py-3 text-[#141414] font-sans text-sm focus:outline-none focus:border-[#C7A56A] focus:bg-white focus:ring-[3px] focus:ring-[#C7A56A]/16 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${submitSuccess ? 'cursor-default' : ''}`}
                  >
                    {!formData.genderGroup ? (
                      <option value="">-- Please select "Service For" first --</option>
                    ) : (
                      <>
                        <option value="">
                          {preselectedCategory
                            ? `-- Select a service under ${preselectedCategory} --`
                            : '-- Select a service --'}
                        </option>
                        {Object.entries(
                          servicesData
                            .filter((s) => s.genderGroup === formData.genderGroup && (!preselectedCategory || s.category.toLowerCase() === preselectedCategory.toLowerCase()))
                            .reduce((acc, service) => {
                              if (!acc[service.category]) {
                                acc[service.category] = [];
                              }
                              acc[service.category].push(service);
                              return acc;
                            }, {} as Record<string, typeof servicesData>)
                        ).map(([category, list]) => (
                          <optgroup key={category} label={category}>
                            {list.map((s) => (
                              <option key={s.name} value={s.name}>
                                {s.name} ({s.duration})
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </>
                    )}
                  </select>
                </div>

                {/* Date & Time Selector inside a premium rounded panel */}
                <div className="bg-[#F5F1EA] border border-black/8 p-5 sm:p-6 md:p-8 rounded-2xl space-y-6 md:col-span-2">
                  
                  {/* Custom Date Selector */}
                  <div className="space-y-3">
                    <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#141414]">
                      Preferred Date *
                    </label>
                    
                    <div className="flex gap-3 overflow-x-auto pb-3 pt-2 scrollbar-thin scrollbar-thumb-[#C7A56A]/20 scrollbar-track-transparent -mx-4 px-4 sm:mx-0 sm:px-0">
                      {upcomingDates.map((dateObj) => {
                        const isSelected = formData.preferredDate === dateObj.dateString;
                        return (
                          <button
                            key={dateObj.dateString}
                            type="button"
                            onClick={() => !submitSuccess && handleSelectDate(dateObj.dateString)}
                            disabled={!!submitSuccess}
                            aria-pressed={isSelected}
                            className={`flex-shrink-0 w-20 py-4 flex flex-col items-center justify-between border transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-[#C7A56A] rounded-[12px] ${submitSuccess ? 'cursor-default' : 'cursor-pointer'} ${
                              isSelected
                                ? 'bg-[#141414] border-[#141414] text-white shadow-md transform -translate-y-0.5'
                                : 'bg-[#FBF8F3] border-black/8 text-[#141414] hover:border-[#C7A56A] hover:bg-[#EEE7DD]'
                            }`}
                          >
                            {/* Today/Tomorrow Badges */}
                            {(dateObj.isToday || dateObj.isTomorrow) && (
                              <span className={`absolute -top-2.5 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wider ${
                                isSelected ? 'bg-white text-[#141414] border border-[#141414]/20' : 'bg-[#141414] text-white'
                              }`}>
                                {dateObj.isToday ? 'Today' : 'Tomorrow'}
                              </span>
                            )}
                            
                            <span className={`font-sans text-[10px] uppercase tracking-widest font-semibold ${
                              isSelected ? 'text-[#F5F1EA]/80' : 'text-[#5C5752]'
                            }`}>
                              {dateObj.dayName}
                            </span>
                            <span className="font-serif-display text-2xl font-bold my-1 leading-none">
                              {dateObj.dateNum}
                            </span>
                            <span className={`font-sans text-[10px] uppercase tracking-wider font-semibold ${
                              isSelected ? 'text-[#F5F1EA]/80' : 'text-[#5C5752]'
                            }`}>
                              {dateObj.monthName}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Time Selector */}
                  <div className="space-y-4">
                    <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#141414]">
                      Preferred Time Slot *
                    </label>
                    
                    <div className="space-y-4">
                      {Object.entries(timeSlots).map(([group, slots]) => (
                        <div key={group} className="space-y-2">
                          <span className="block font-sans text-[9px] font-bold uppercase tracking-widest text-[#5C5752] border-l-2 border-[#C7A56A] pl-2">
                            {group}
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                            {slots.map((time) => {
                              const isSelected = formData.preferredTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => !submitSuccess && handleSelectTime(time)}
                                  disabled={!!submitSuccess}
                                  aria-pressed={isSelected}
                                  className={`py-2.5 px-3 font-sans text-xs font-medium tracking-wide transition-all duration-200 border text-center focus:outline-none focus:ring-2 focus:ring-[#C7A56A] rounded-[12px] ${submitSuccess ? 'cursor-default' : 'cursor-pointer'} ${
                                    isSelected
                                      ? 'bg-[#141414] border-[#141414] text-white shadow-sm'
                                      : 'bg-[#FBF8F3] border-black/8 text-[#141414] hover:bg-[#EEE7DD]'
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Message / Notes */}
              <div className={`space-y-2 transition-opacity duration-300 ${submitSuccess ? 'opacity-60 pointer-events-none' : ''}`}>
                <label htmlFor="notes" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#141414]">
                  Special Instructions / Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  readOnly={!!submitSuccess}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific stylist preferences or hair/skin concerns..."
                  className={`w-full bg-[#FBF8F3] border border-black/[0.12] px-4 py-3 text-[#141414] font-sans text-sm focus:outline-none focus:border-[#C7A56A] focus:bg-white focus:ring-[3px] focus:ring-[#C7A56A]/16 placeholder:text-[#9A928A] resize-none transition-all duration-200 ${submitSuccess ? 'cursor-default' : ''}`}
                />
              </div>

              {/* Submit Buttons - hidden after successful submission */}
              {!submitSuccess && (
                <div className="space-y-4 pt-4 border-t border-black/8">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-grow bg-[#141414] hover:bg-[#C7A56A] text-white font-sans text-xs font-bold uppercase tracking-widest px-8 transition-all duration-200 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-[54px] rounded-[14px]"
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
                    </button>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow bg-[#FBF8F3] hover:bg-[#F5F1EA] border border-black/12 text-[#141414] hover:text-[#25D366] hover:border-[#25D366] font-sans text-xs font-bold uppercase tracking-widest px-8 transition-all duration-200 text-center h-[54px] flex items-center justify-center space-x-2 cursor-pointer rounded-[14px]"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>WhatsApp Booking</span>
                    </a>
                  </div>
                  
                  {/* Subtle Clear form link */}
                  <div className="flex justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="clear-form-link"
                    >
                      Clear form
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Feedback Slot with Layout Stabilization */}
              <div className="submit-feedback-slot w-full mt-6 flex items-center justify-center">
                {submitSuccess && (
                  <div className="w-full animate-[fadeIn_0.3s_ease-out] space-y-3">
                    <div 
                      className="flex items-center space-x-2 border rounded-[12px] px-3.5 py-3 text-sm font-sans"
                      style={{
                        background: 'rgba(236, 253, 245, 0.7)',
                        borderColor: 'rgba(34, 197, 94, 0.22)',
                        color: '#166534'
                      }}
                    >
                      <Check className="w-4 h-4 flex-shrink-0 text-[#22c55e]" />
                      <span className="font-sans font-medium">Appointment request received. We&apos;ll confirm your booking shortly.</span>
                    </div>

                    {/* Post-success actions: Confirm on WhatsApp + Book Another */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {lastSubmittedAppointment && (
                        <a
                          href={buildWhatsAppUrl(lastSubmittedAppointment)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans text-xs font-bold uppercase tracking-widest py-3 px-4 text-center transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm rounded-[14px]"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          <span>Confirm on WhatsApp</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={handleReset}
                        className="flex-1 border border-black/12 hover:border-[#141414] text-[#141414] hover:bg-[#141414]/5 font-sans text-xs font-bold uppercase tracking-widest py-3 px-4 text-center cursor-pointer transition-all duration-200 rounded-[14px]"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </div>
                )}
                {submitError && (
                  <div className="w-full animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-700 rounded-[12px] px-3.5 py-3 text-xs font-sans font-semibold tracking-wide uppercase">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  </div>
                )}
              </div>
            </form>

        </div>
      </div>
    </section>
  );
}

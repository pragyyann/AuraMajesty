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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const categoryParam = searchParams.get('category');
    
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
        console.log("Preselected Service:", match.name, "Group:", match.genderGroup);
      }
    } else if (categoryParam) {
      // Find the first service matching this category
      const match = servicesData.find(
        (s) => s.category.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({
          ...prev,
          genderGroup: match.genderGroup,
          service: match.name
        }));
        console.log("Preselected Category:", categoryParam, "-> Service:", match.name, "Group:", match.genderGroup);
      }
    }
  }, [searchParams]);

  const handleSelectGenderGroup = (group: 'Ladies' | 'Gents' | 'Unisex') => {
    setFormData((prev) => ({ ...prev, genderGroup: group, service: '' }));
    setErrorMsg('');
  };

  const getWhatsAppLink = () => {
    let text = "Hi Aura Majesty Studio, I want to book an appointment.\n";
    if (formData.genderGroup) {
      text += `Service for: ${formData.genderGroup === 'Unisex' ? 'Unisex / Popular' : formData.genderGroup}\n`;
    }
    if (formData.service) {
      const match = servicesData.find(s => s.name === formData.service);
      const displayServiceName = match ? `${match.category} — ${match.name}` : formData.service;
      text += `Service: ${displayServiceName}\n`;
    }
    if (formData.preferredDate) {
      text += `Preferred date: ${formatDisplayDate(formData.preferredDate)}\n`;
    }
    if (formData.preferredTime) {
      text += `Preferred time: ${formData.preferredTime}\n`;
    }
    return `https://wa.me/919355522667?text=${encodeURIComponent(text)}`;
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
    setErrorMsg('');
  };

  const handleSelectTime = (time: string) => {
    setFormData((prev) => ({ ...prev, preferredTime: time }));
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.genderGroup) {
      setErrorMsg('Please select who the service is for.');
      return;
    }
    if (!formData.service) {
      setErrorMsg('Please select a service.');
      return;
    }
    if (!formData.preferredDate) {
      setErrorMsg('Please select your preferred date.');
      return;
    }
    if (!formData.preferredTime) {
      setErrorMsg('Please select your preferred time slot.');
      return;
    }
    setErrorMsg('');
    console.log("Appointment Form Submitted:", formData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      genderGroup: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
    });
    setErrorMsg('');
    setIsSubmitted(false);
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
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error Alert Banner */}
              {errorMsg && (
                <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-700 p-4 text-xs font-sans font-semibold tracking-wide uppercase transition-all duration-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-[#F5F1EA] border border-black/8 px-4 py-3 text-[#141414] font-sans text-sm focus:outline-none focus:border-[#C7A56A] placeholder:text-[#5C5752]/50 transition-colors"
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
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="w-full bg-[#F5F1EA] border border-black/8 px-4 py-3 text-[#141414] font-sans text-sm focus:outline-none focus:border-[#C7A56A] placeholder:text-[#5C5752]/50 transition-colors"
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
                          onClick={() => handleSelectGenderGroup(group)}
                          className={`py-3 px-4 text-center font-sans text-xs font-semibold uppercase tracking-widest border transition-all duration-200 cursor-pointer ${
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
                    disabled={!formData.genderGroup}
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#F5F1EA] border border-black/8 px-4 py-3 text-[#141414] font-sans text-sm focus:outline-none focus:border-[#C7A56A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {!formData.genderGroup ? (
                      <option value="">-- Please select "Service For" first --</option>
                    ) : (
                      <>
                        <option value="">-- Select a service --</option>
                        {Object.entries(
                          servicesData
                            .filter((s) => s.genderGroup === formData.genderGroup)
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
                            onClick={() => handleSelectDate(dateObj.dateString)}
                            aria-pressed={isSelected}
                            className={`flex-shrink-0 w-20 py-4 flex flex-col items-center justify-between border transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-[#C7A56A] cursor-pointer ${
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
                                  onClick={() => handleSelectTime(time)}
                                  aria-pressed={isSelected}
                                  className={`py-2.5 px-3 font-sans text-xs font-medium tracking-wide transition-all duration-200 border text-center focus:outline-none focus:ring-2 focus:ring-[#C7A56A] cursor-pointer ${
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
              <div className="space-y-2">
                <label htmlFor="notes" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#141414]">
                  Special Instructions / Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific stylist preferences or hair/skin concerns..."
                  className="w-full bg-[#F5F1EA] border border-black/8 px-4 py-3 text-[#141414] font-sans text-sm focus:outline-none focus:border-[#C7A56A] placeholder:text-[#5C5752]/50 resize-none transition-colors"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-black/8">
                <button
                  type="submit"
                  className="flex-grow bg-[#141414] hover:bg-[#C7A56A] text-white font-sans text-xs font-bold uppercase tracking-widest py-4 px-8 transition-colors duration-300 text-center cursor-pointer"
                >
                  Confirm Appointment
                </button>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 border border-black/16 hover:border-[#25D366] hover:text-[#25D366] text-[#141414] hover:bg-[#25D366]/5 font-sans text-xs font-bold uppercase tracking-widest py-4 px-8 transition-all duration-300 text-center"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp Booking</span>
                </a>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="py-8 px-4 text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="w-16 h-16 bg-[#141414]/10 text-[#C7A56A] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif-display text-2xl font-medium text-[#141414]">
                  Request Received
                </h3>
                <p className="font-sans text-sm text-[#5C5752] max-w-md mx-auto">
                  Your appointment request has been received. Aura Majesty Studio will confirm your booking shortly.
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="bg-[#F5F1EA] border border-black/8 p-6 max-w-md mx-auto text-left space-y-3 font-sans text-sm">
                <div className="flex justify-between border-b border-black/8 pb-2">
                  <span className="text-[#5C5752]">Name</span>
                  <span className="font-medium text-[#141414]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-black/8 pb-2">
                  <span className="text-[#5C5752]">Service For</span>
                  <span className="font-medium text-[#141414]">{formData.genderGroup === 'Unisex' ? 'Unisex / Popular' : formData.genderGroup}</span>
                </div>
                <div className="flex justify-between border-b border-black/8 pb-2">
                  <span className="text-[#5C5752]">Service</span>
                  <span className="font-medium text-[#141414]">{formData.service}</span>
                </div>
                <div className="flex justify-between border-b border-black/8 pb-2">
                  <span className="text-[#5C5752]">Date</span>
                  <span className="font-medium text-[#141414]">{formatDisplayDate(formData.preferredDate)}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-[#5C5752]">Time Slot</span>
                  <span className="font-medium text-[#141414]">{formData.preferredTime}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-2 border border-black/16 hover:border-[#141414] text-[#141414] font-sans text-xs font-bold py-3 px-6 tracking-wider uppercase transition-colors cursor-pointer"
              >
                <span>Book Another Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

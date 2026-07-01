'use strict';
'use client';

import React from 'react';

interface ServiceTabsProps {
  activeTab: 'ladies' | 'gents';
  setActiveTab: (tab: 'ladies' | 'gents') => void;
}

export default function ServiceTabs({ activeTab, setActiveTab }: ServiceTabsProps) {
  return (
    <div className="flex justify-center mb-16">
      <div className="bg-surface-soft border border-border-custom p-1.5 flex space-x-1 max-w-xs w-full shadow-sm">
        {/* Ladies Tab */}
        <button
          onClick={() => setActiveTab('ladies')}
          className={`flex-1 py-3 text-center font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
            activeTab === 'ladies'
              ? 'bg-accent-slate text-surface-white'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Ladies
        </button>

        {/* Gents Tab */}
        <button
          onClick={() => setActiveTab('gents')}
          className={`flex-1 py-3 text-center font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
            activeTab === 'gents'
              ? 'bg-accent-slate text-surface-white'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Gents
        </button>
      </div>
    </div>
  );
}

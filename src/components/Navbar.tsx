import React, { useState } from 'react';
import { 
  Factory, 
  Search, 
  Phone, 
  MessageSquare, 
  FileText, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Scale,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/machines';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  compareCount: number;
  openQuoteModal: (machineId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  compareCount,
  openQuoteModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: string; label: string; badge?: string; count?: number }> = [
    { id: 'catalog', label: 'Machinery Catalog' },
    { id: 'calculator', label: 'Capacity & ROI Finder' },
    { id: 'compare', label: 'Compare Models', count: compareCount },
    { id: 'about', label: 'Kolhapur Factory' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Utility Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              {COMPANY_INFO.isoCertification}
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              📍 MIDC Gokul Shirgaon, Kolhapur, Maharashtra
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-slate-300">
            <a 
              href="tel:+919145546639" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-mono font-bold text-amber-300 text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: +91 9145546639</span>
            </a>
            <a 
              href="https://wa.me/919145546639?text=Hello%20Amitas%20Industry,%20I%20am%20interested%20in%20your%20machinery."
              target="_blank" 
              rel="noreferrer"
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-emerald-400 font-bold text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-400/20" />
              <span>WhatsApp: +91 9145546639</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('catalog')} 
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                AMITAS INDUSTRY
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
                FACTORY DIRECT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Density Separators & Grain Processing Machinery
            </p>
          </div>
        </button>

        {/* Global Machine Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center relative flex-1 max-w-md mx-4">
          <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search machine name (e.g. 1500 Kg Density Separator, Destoner)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'catalog' && activeTab !== 'seo-engine') {
                setActiveTab('catalog');
              }
            }}
            className="w-full bg-slate-950/80 text-xs text-slate-100 pl-9 pr-8 py-2 rounded-lg border border-slate-700/80 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-slate-400 hover:text-slate-200 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => openQuoteModal()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            Get Instant Quote
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/80 border border-slate-700"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:block bg-slate-950/60 border-t border-slate-800/50 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-md font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className={`px-1.5 py-0.2 text-[9px] uppercase font-extrabold rounded ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500 text-slate-950'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search machine name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-xs text-slate-100 pl-9 pr-3 py-2 rounded-lg border border-slate-700"
            />
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <a
              href="tel:+919145546639"
              className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md"
            >
              <Phone className="w-4 h-4" />
              Call 9145546639
            </a>

            <a
              href="https://wa.me/919145546639?text=Hello%20Amitas%20Industry,%20I%20am%20interested%20in%20your%20machinery."
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md border border-emerald-500/30"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openQuoteModal();
            }}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-center text-sm shadow-md border border-slate-700"
          >
            Get Machine Quote Now
          </button>
        </div>
      )}
    </header>
  );
};

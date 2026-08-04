import React from 'react';
import { 
  Factory, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  ArrowUp,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO, MACHINES_DATA } from '../data/machines';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  setSearchQuery: (q: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, setSearchQuery }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeywordSearch = (kw: string) => {
    setSearchQuery(kw);
    setActiveTab('catalog');
    scrollToTop();
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-white tracking-tight">AMITAS INDUSTRY</div>
                <p className="text-[11px] text-amber-400 font-medium">Kolhapur Machinery Manufacturer</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Amitas Industry is a premier manufacturer and exporter of <strong className="text-slate-200 font-semibold">1500 Kg Density Separator Machines</strong>, <strong className="text-slate-200 font-semibold">Industrial Grain Destoners</strong>, and <strong className="text-slate-200 font-semibold">Vibro Sifter Machines</strong> in Gokul Shirgaon MIDC, Kolhapur, Maharashtra.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-emerald-400 font-bold rounded text-[10px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {COMPANY_INFO.isoCertification}
              </span>
            </div>
          </div>

          {/* Quick Machinery Links */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">Popular Machinery</h4>
            <ul className="space-y-2">
              {MACHINES_DATA.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => handleKeywordSearch(m.name)}
                    className="hover:text-amber-400 transition-colors text-left line-clamp-1"
                  >
                    • {m.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Portal Navigation */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">Factory Portal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setActiveTab('catalog'); scrollToTop(); }} className="hover:text-amber-400">
                  • Machinery Catalog
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('calculator'); scrollToTop(); }} className="hover:text-amber-400">
                  • Capacity & ROI Calculator
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('compare'); scrollToTop(); }} className="hover:text-amber-400">
                  • Compare Models
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); scrollToTop(); }} className="hover:text-amber-400">
                  • Kolhapur Factory Details
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); scrollToTop(); }} className="hover:text-amber-400">
                  • Request Price Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">Kolhapur Plant</h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone1}`} className="hover:text-amber-400">{COMPANY_INFO.phone1}</a>
              </div>
              <div className="flex items-center gap-2 font-mono text-emerald-400">
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <a href={`https://wa.me/${COMPANY_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="hover:underline">WhatsApp Direct</a>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-amber-400">{COMPANY_INFO.email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keywords Tag Cloud Bar */}
        <div className="pt-6 border-t border-slate-800/80 space-y-2">
          <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            Google Search Keywords & Machine Indexes:
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            {[
              '1500 kg density separator machine',
              'density separator manufacturer kolhapur',
              'industrial destoner machine price',
              'rice destoner machine maharashtra',
              'amitas industry density separator',
              'semi automatic destoner machine 1 ton',
              'vibro sifter machine price india',
              'grain gravity separator supplier',
              'spice pre cleaner machine',
              'rotary screen grain cleaner 5 ton'
            ].map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handleKeywordSearch(tag)}
                className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 px-2.5 py-1 rounded border border-slate-800/80 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Gokul Shirgaon MIDC • Kolhapur 416012</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-lg border border-slate-800 transition-colors"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

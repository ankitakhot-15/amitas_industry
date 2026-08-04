import React from 'react';
import { 
  Factory, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Award, 
  Globe,
  Settings
} from 'lucide-react';
import { COMPANY_INFO, HERO_BANNER_IMG } from '../data/machines';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenSeoPortal?: () => void;
  onOpenQuote: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenQuote,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden py-12 lg:py-20 border-b border-slate-800">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
        <img 
          src={HERO_BANNER_IMG} 
          alt="Amitas Industry Machinery Manufacturing" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Factory className="w-3.5 h-3.5" />
                Kolhapur Manufacturing Facility
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                ISO 9001:2015 Certified
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Density Separators & Grain Destoner Machines{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Manufactured in Kolhapur
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Amitas Industry produces high-precision agro-processing machinery including{' '}
              <strong className="text-white font-semibold">1500 Kg Density Separators</strong>,{' '}
              <strong className="text-white font-semibold">Industrial Grain Destoners</strong>, and{' '}
              <strong className="text-white font-semibold">Multi-Deck Vibro Sifters</strong>. Engineered with 99.8% separation efficiency, food-grade SS304 contact parts, and robust 1-year factory warranty.
            </p>

            {/* Live Search Machine Name Box */}
            <div className="bg-slate-900/90 border border-slate-700/90 p-2.5 rounded-xl shadow-2xl backdrop-blur-md max-w-xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search machine name e.g. 1500 Kg Density Separator..."
                    className="w-full bg-slate-950 text-xs sm:text-sm text-slate-100 pl-9 pr-3 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  onClick={onExploreCatalog}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap"
                >
                  Find Machine
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Preset quick links */}
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 overflow-x-auto">
                <span className="text-slate-500 font-semibold whitespace-nowrap">Popular Searches:</span>
                <button 
                  onClick={() => setSearchQuery('1500 Kg Density Separator')} 
                  className="hover:text-amber-400 transition-colors underline decoration-slate-700 whitespace-nowrap"
                >
                  1500 Kg Density Separator
                </button>
                <span>•</span>
                <button 
                  onClick={() => setSearchQuery('Destoner')} 
                  className="hover:text-amber-400 transition-colors underline decoration-slate-700 whitespace-nowrap"
                >
                  Destoner Machine
                </button>
                <span>•</span>
                <button 
                  onClick={() => setSearchQuery('Vibro Sifter')} 
                  className="hover:text-amber-400 transition-colors underline decoration-slate-700 whitespace-nowrap"
                >
                  Vibro Sifter
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4" />
                Request Price Quote
              </button>

              <button
                onClick={onExploreCatalog}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all hover:text-white"
              >
                Explore Machine Catalog
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Trust bullet points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SS304 Food-Grade Quality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 Year On-Site Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pan-India & Export Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Card: Factory Highlights & Interactive Machine Teaser */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                  Factory Direct Pricing
                </span>
              </div>

              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Amitas Industry Kolhapur</h3>
                  <p className="text-slate-400 text-xs">Agro-Processing Machinery Specialist</p>
                </div>
              </div>

              {/* Factory Statistics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {COMPANY_INFO.stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl">
                    <div className="text-xl sm:text-2xl font-black text-amber-400">{stat.value}</div>
                    <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Popular Machine Spotlight Box */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                    FLAGSHIP MODEL
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    In Stock • Ready To Dispatch
                  </span>
                </div>

                <div className="text-sm font-bold text-white">
                  1500 Kg Density Separator Machine (AI-DS-1500)
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <p>⚡ Capacity: 1500 Kg/Hour (1.5 Tons/hr)</p>
                  <p>⚙️ Motor: 5.0 HP 3-Phase • 99.8% Gravity Separation</p>
                  <p>🏷️ Factory Price Range: ₹1,85,000 - ₹2,45,000</p>
                </div>

                <button
                  onClick={onExploreCatalog}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  View Full Specs & Brochure
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

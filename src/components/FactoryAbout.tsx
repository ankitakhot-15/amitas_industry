import React from 'react';
import { 
  Factory, 
  ShieldCheck, 
  Award, 
  Globe, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  Cpu, 
  Users, 
  Star 
} from 'lucide-react';
import { COMPANY_INFO, HERO_BANNER_IMG } from '../data/machines';

export const FactoryAbout: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs rounded-full">
              <Factory className="w-3.5 h-3.5" />
              Kolhapur Industrial Manufacturing Hub
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              About Amitas Industry Machinery Manufacturing
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Located in the industrial heart of <strong className="text-white font-semibold">Gokul Shirgaon MIDC, Kolhapur, Maharashtra</strong>, Amitas Industry is an advanced engineering company specializing in the design, fabrication, and export of agro-industrial processing equipment.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Our core product line includes <strong className="text-amber-400 font-semibold">1500 Kg Density Separator Machines</strong>, <strong className="text-amber-400 font-semibold">Industrial Rice & Grain Destoners</strong>, <strong className="text-amber-400 font-semibold">Multi-Deck Vibro Sifters</strong>, and custom seed cleaning plants. Each machine is constructed using computerized CNC laser cutting, dynamic deck balancing, and food-grade SS304 stainless steel contact parts.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              {COMPANY_INFO.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">{stat.value}</div>
                  <div className="text-[11px] text-slate-400 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
              <img
                src={HERO_BANNER_IMG}
                alt="Amitas Industry Factory Plant Kolhapur"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  Gokul Shirgaon MIDC, Kolhapur
                </div>
                <p className="text-slate-400 mt-1">Plot C-42, Kolhapur Industrial Area, Maharashtra 416012</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">ISO 9001:2015 Quality Standards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every density separator deck undergoes rigorous static and dynamic balancing tests to guarantee vibration stability and 99.8% specific gravity separation accuracy.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Food Grade SS304 Construction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Contact mesh screens, hoppers, and discharge chutes are made from certified SS304 stainless steel to ensure zero food contamination in rice, pulses, and spices.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Pan-India & Global Export</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Delivered and supported across Maharashtra, Gujarat, Karnataka, Tamil Nadu, Telangana, Punjab, as well as export shipments to Sri Lanka, Nepal, and Kenya.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

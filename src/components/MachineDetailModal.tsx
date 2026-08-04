import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Download, 
  Send, 
  Phone, 
  MessageSquare, 
  Globe, 
  Sparkles, 
  Zap, 
  Award, 
  Factory,
  Copy,
  Check
} from 'lucide-react';
import { Machine, QuoteRequest } from '../types';
import { COMPANY_INFO } from '../data/machines';

interface MachineDetailModalProps {
  machine: Machine | null;
  onClose: () => void;
  onRequestQuote: (machineId: string) => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({
  machine,
  onClose,
  onRequestQuote
}) => {
  if (!machine) return null;

  const [activeImage, setActiveImage] = useState<string>(machine.image);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'seo'>('specs');
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(machine.jsonLdSchema, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleDownloadBrochure = () => {
    // Generate text brochure content for printing / downloading
    const content = `
===================================================================
AMITAS INDUSTRY - OFFICIAL MACHINERY SPECIFICATION BROCHURE
Manufacturer: ${COMPANY_INFO.legalName}
Location: ${COMPANY_INFO.address}
Certification: ${COMPANY_INFO.isoCertification}
===================================================================

MACHINE NAME: ${machine.name}
MODEL NUMBER: ${machine.model}
CATEGORY: ${machine.category.toUpperCase()}
CAPACITY: ${machine.capacity}
POWER RATING: ${machine.powerHp}
MATERIAL OF CONSTRUCTION: ${machine.material}
SEPARATION EFFICIENCY: ${machine.efficiency}
ESTIMATED PRICE RANGE: ${machine.priceRange} (USD: ${machine.usdPrice})
WARRANTY: ${machine.warranty}

SHORT DESCRIPTION:
${machine.shortDescription}

FULL TECHNICAL SPECIFICATIONS:
${machine.specs.map(s => `- ${s.label}: ${s.value}`).join('\n')}

APPLICATIONS:
${machine.applications.join(', ')}

KEY FEATURES:
${machine.keyFeatures.map(f => `• ${f}`).join('\n')}

FOR FACTORY DIRECT INQUIRIES & ORDERS:
Phone: ${COMPANY_INFO.phone1} / ${COMPANY_INFO.phone2}
WhatsApp: ${COMPANY_INFO.whatsapp}
Email: ${COMPANY_INFO.email}
Website: ${COMPANY_INFO.website}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${machine.id}-amitas-industry-spec-sheet.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-slate-100">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
              {machine.model}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {machine.name}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase rounded">
                  In Stock
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Amitas Industry • Kolhapur Factory Model {machine.model}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Top Gallery & Quick Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Gallery Section */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-[4/3] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden relative">
                <img
                  src={activeImage}
                  alt={machine.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm text-amber-400 font-extrabold text-xs px-2.5 py-1 rounded border border-slate-800">
                  {machine.efficiency}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2">
                {machine.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-12 rounded-lg border overflow-hidden transition-all ${
                      activeImage === img ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Machine Quick Specs Box */}
            <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{machine.rating} / 5.0</span>
                  <span className="text-slate-400 font-normal">({machine.reviewCount} verified customer reviews)</span>
                </div>

                <p className="text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                  {machine.fullDescription}
                </p>

                <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Processing Capacity:</span>
                    <span className="text-amber-400 font-extrabold">{machine.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Motor & Power:</span>
                    <span className="text-white font-semibold">{machine.powerHp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Build Material:</span>
                    <span className="text-slate-200 font-semibold">{machine.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Factory Price Range:</span>
                    <span className="text-emerald-400 font-bold">{machine.priceRange} ({machine.usdPrice})</span>
                  </div>
                </div>
              </div>

              {/* Quick Action CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onRequestQuote(machine.id)}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-xl text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Request Factory Direct Price Quote
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDownloadBrochure}
                    className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    Download Spec Sheet
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi%20Amitas%20Industry,%20I%20am%20interested%20in%20model%20${machine.model}%20(${machine.name})`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-emerald-500/30"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    WhatsApp Inquiry
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Modal Tabs: Specs / Features / SEO */}
          <div className="border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'specs' 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Technical Specifications
              </button>

              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'features' 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Key Features & Applications
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'seo' 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                Google SEO & Schema
              </button>
            </div>

            {/* Tab Content 1: Technical Specs Table */}
            {activeTab === 'specs' && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {machine.specs.map((spec, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-400 font-medium">{spec.label}</span>
                    <span className="text-white font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab Content 2: Features & Applications */}
            {activeTab === 'features' && (
              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <h4 className="text-amber-400 font-bold mb-2">Key Engineering Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {machine.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-amber-400 font-bold mb-2">Suitable Crop & Grain Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {machine.applications.map((app, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-950 text-slate-200 rounded-lg border border-slate-800 font-medium">
                        🌾 {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content 3: Google SEO & Schema Preview */}
            {activeTab === 'seo' && (
              <div className="mt-4 space-y-4 text-xs">
                {/* Google Search Result Card Simulator */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 font-sans">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-300">https://amitasindustry.com</span>
                    <span>›</span>
                    <span className="text-slate-400">machines</span>
                    <span>›</span>
                    <span className="text-amber-400 font-mono">{machine.id}</span>
                  </div>

                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-base font-bold text-sky-400 hover:underline leading-snug block"
                  >
                    {machine.seoTitle}
                  </a>

                  <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold my-1">
                    <span>⭐⭐⭐⭐⭐ Rating: {machine.rating}/5</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">In stock</span>
                    <span>•</span>
                    <span className="text-slate-300">Manufacturer Direct</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {machine.seoDescription}
                  </p>
                </div>

                {/* Schema Code Block */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-bold">JSON-LD Structured Data (Product Schema.org):</span>
                    <button
                      onClick={handleCopySchema}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px]"
                    >
                      {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedSchema ? 'Copied to Clipboard!' : 'Copy Schema Code'}
                    </button>
                  </div>

                  <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-amber-300/90 overflow-x-auto max-h-48">
                    {JSON.stringify(machine.jsonLdSchema, null, 2)}
                  </pre>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

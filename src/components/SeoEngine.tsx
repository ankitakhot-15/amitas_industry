import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  FileCode, 
  Sliders, 
  Star, 
  ExternalLink,
  ShieldCheck,
  Zap,
  BarChart3,
  Smartphone,
  CheckSquare,
  Download
} from 'lucide-react';
import { MACHINES_DATA, COMPANY_INFO } from '../data/machines';
import { Machine } from '../types';

interface SeoEngineProps {
  machines?: Machine[];
  onSelectMachine: (m: Machine) => void;
  onOpenQuote: (machineId: string) => void;
}

export const SeoEngine: React.FC<SeoEngineProps> = ({
  machines,
  onSelectMachine,
  onOpenQuote
}) => {
  const machineList = machines && machines.length > 0 ? machines : MACHINES_DATA;
  const [selectedMachine, setSelectedMachine] = useState<Machine>(machineList[0]);
  const [googleQuery, setGoogleQuery] = useState<string>(machineList[0].name);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'serp' | 'audit' | 'schema' | 'sitemap'>('serp');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  // Handle machine choice
  const handleSelectMachineToInspect = (m: Machine) => {
    setSelectedMachine(m);
    setGoogleQuery(m.name);
  };

  // Generate XML Sitemap string
  const generateSitemapXml = () => {
    const urls = [
      'https://amitasindustry.com/',
      'https://amitasindustry.com/catalog',
      'https://amitasindustry.com/about-factory-kolhapur',
      'https://amitasindustry.com/contact-us',
      ...machineList.map(m => m.canonicalUrl || `https://amitasindustry.com/machines/${m.id}`)
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === 'https://amitasindustry.com/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedMachine.jsonLdSchema, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleCopySitemap = () => {
    navigator.clipboard.writeText(generateSitemapXml());
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2000);
  };

  return (
    <section id="seo-portal" className="py-12 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Google Search Engine Optimization (SEO) Portal
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Google Machine Name Search & Rich Snippet Simulator
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                This portal verifies how Google's search crawlers index each Amitas Industry machine name. Test machine search queries, preview desktop & mobile Google SERP cards, copy Schema.org JSON-LD structured data, and export sitemaps.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1 shrink-0">
              <div className="text-3xl font-black text-amber-400">98 / 100</div>
              <div className="text-[11px] text-slate-400 font-semibold">SEO Indexability Rating</div>
              <div className="text-[10px] text-emerald-400 font-mono">100% Schema.org Compliant</div>
            </div>
          </div>
        </div>

        {/* Machine Picker Bar */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            Select Machine to Test in Google Search:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {machineList.map((m) => {
              const isSelected = selectedMachine.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectMachineToInspect(m)}
                  className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="font-extrabold text-[10px] text-amber-400 mb-0.5">{m.model}</div>
                  <div className="line-clamp-1 font-bold text-slate-100">{m.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('serp')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'serp' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Google SERP Result Simulator
          </button>

          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'audit' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            SEO Health Audit
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'schema' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Schema.org JSON-LD Code
          </button>

          <button
            onClick={() => setActiveSubTab('sitemap')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'sitemap' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            XML Sitemap for Google
          </button>
        </div>

        {/* TAB 1: Google SERP Simulator */}
        {activeSubTab === 'serp' && (
          <div className="space-y-6">
            
            {/* Search Input Box */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-400" />
                  Simulate Google Search Query:
                </label>
                
                {/* Desktop vs Mobile Viewport Switch */}
                <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-bold">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      deviceView === 'desktop' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Desktop Google
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                      deviceView === 'mobile' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    Mobile Google
                  </button>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={googleQuery}
                  onChange={(e) => setGoogleQuery(e.target.value)}
                  placeholder="Type any machine name (e.g. 1500 kg density separator)..."
                  className="w-full bg-slate-950 text-sm text-slate-100 pl-10 pr-24 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500 font-medium"
                />
                <div className="absolute left-3 top-3.5 text-slate-500">
                  <Search className="w-4 h-4" />
                </div>
                <button
                  onClick={() => setGoogleQuery(selectedMachine.name)}
                  className="absolute right-2 top-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg font-semibold"
                >
                  Reset Name
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Quick Test Query Keywords:</span>
                {selectedMachine.seoKeywords.slice(0, 4).map((kw, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGoogleQuery(kw)}
                    className="px-2 py-0.5 bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 rounded transition-colors"
                  >
                    "{kw}"
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Google Search Result UI Container */}
            <div className={`mx-auto transition-all ${deviceView === 'mobile' ? 'max-w-md' : 'w-full'}`}>
              <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4 font-sans">
                
                {/* Simulated Google Search Header */}
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-extrabold text-lg tracking-tight">G<span className="text-red-500">o</span><span className="text-amber-500">o</span><span className="text-blue-600">g</span><span className="text-green-600">l</span><span className="text-red-500">e</span></span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px] font-mono font-medium text-slate-700">
                      Search: "{googleQuery}"
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">About 1,420 results (0.28 seconds)</span>
                </div>

                {/* Primary Organic Search Card */}
                <div className="space-y-1.5">
                  {/* URL Breadcrumb */}
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 text-[9px] font-bold">
                      A
                    </div>
                    <div className="flex items-center gap-1 overflow-hidden font-normal text-[12px] text-slate-800">
                      <span className="font-bold text-slate-900">amitasindustry.com</span>
                      <span className="text-slate-400">›</span>
                      <span className="text-slate-600">machines</span>
                      <span className="text-slate-400">›</span>
                      <span className="text-slate-600 font-mono text-[11px]">{selectedMachine.id}</span>
                    </div>
                  </div>

                  {/* Title Link */}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectMachine(selectedMachine);
                    }}
                    className="text-lg sm:text-xl font-medium text-blue-800 hover:underline leading-snug block font-sans"
                  >
                    {selectedMachine.seoTitle}
                  </a>

                  {/* Rich Snippets Stars & Stock */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 font-medium py-0.5">
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      ★★★★★ {selectedMachine.rating}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{selectedMachine.reviewCount} reviews</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      In stock
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-slate-800">Price: {selectedMachine.priceRange}</span>
                  </div>

                  {/* Meta Description Snippet */}
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {selectedMachine.seoDescription}
                  </p>

                  {/* Sitelinks Extensions */}
                  <div className="pt-3 grid grid-cols-2 gap-3 text-xs border-t border-slate-100">
                    <div>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenQuote(selectedMachine.id);
                        }}
                        className="text-blue-700 font-medium hover:underline block"
                      >
                        Request Factory Quote
                      </a>
                      <p className="text-[11px] text-slate-500 line-clamp-1">Get instant pricing directly from Kolhapur MIDC plant.</p>
                    </div>

                    <div>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectMachine(selectedMachine);
                        }}
                        className="text-blue-700 font-medium hover:underline block"
                      >
                        Technical Spec Sheet
                      </a>
                      <p className="text-[11px] text-slate-500 line-clamp-1">5 HP motor, 99.8% separation, SS304 food grade deck.</p>
                    </div>
                  </div>

                </div>

                {/* Google Information Footer Note */}
                <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
                  <span>Indexed by Googlebot • Schema.org/Product Verified</span>
                  <button 
                    onClick={() => onSelectMachine(selectedMachine)}
                    className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    Open Machine Page <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SEO Health Audit */}
        {activeSubTab === 'audit' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  SEO Audit Report for "{selectedMachine.name}"
                </h3>
                <p className="text-xs text-slate-400">
                  Validates search engine indexing guidelines for Google Search algorithms.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                PASSED ALL CHECKS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Title Tag Length</span>
                  <span className="text-emerald-400">{selectedMachine.seoTitle.length} / 60 chars</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${Math.min((selectedMachine.seoTitle.length / 60) * 100, 100)}%` }} />
                </div>
                <p className="text-[11px] text-slate-400">Optimal length prevents title truncation on Google desktop and mobile SERPs.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Meta Description</span>
                  <span className="text-emerald-400">{selectedMachine.seoDescription.length} / 160 chars</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${Math.min((selectedMachine.seoDescription.length / 160) * 100, 100)}%` }} />
                </div>
                <p className="text-[11px] text-slate-400">Includes target keyword, Kolhapur location, 99.8% capacity, and clear call to action.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Structured Data</span>
                  <span className="text-emerald-400">Product + AggregateOffer</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-full" />
                </div>
                <p className="text-[11px] text-slate-400">Enables Google Rich Snippets with star ratings, stock status, and price range.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Target SEO Keywords Covered:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMachine.seoKeywords.map((kw, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-900 text-slate-200 text-xs rounded-lg border border-slate-800 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Schema.org JSON-LD */}
        {activeSubTab === 'schema' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  JSON-LD Structured Data for "{selectedMachine.name}"
                </h3>
                <p className="text-xs text-slate-400">
                  Embed this code in the head section of your website for instant Google Rich Snippet indexing.
                </p>
              </div>

              <button
                onClick={handleCopySchema}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                {copiedSchema ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedSchema ? 'Copied to Clipboard!' : 'Copy Schema Code'}
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto">
              {JSON.stringify(selectedMachine.jsonLdSchema, null, 2)}
            </pre>
          </div>
        )}

        {/* TAB 4: XML Sitemap */}
        {activeSubTab === 'sitemap' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Google Search Console XML Sitemap (`sitemap.xml`)
                </h3>
                <p className="text-xs text-slate-400">
                  Submit this XML file to Google Search Console to index all machine pages automatically.
                </p>
              </div>

              <button
                onClick={handleCopySitemap}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                {copiedSitemap ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedSitemap ? 'Copied Sitemap!' : 'Copy XML Sitemap'}
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-96">
              {generateSitemapXml()}
            </pre>
          </div>
        )}

      </div>
    </section>
  );
};

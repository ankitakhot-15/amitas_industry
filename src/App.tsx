/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MachineCatalog } from './components/MachineCatalog';
import { QuoteCalculator } from './components/QuoteCalculator';
import { MachineComparison } from './components/MachineComparison';
import { FactoryAbout } from './components/FactoryAbout';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MachineDetailModal } from './components/MachineDetailModal';
import { Machine } from './types';
import { MACHINES_DATA, COMPANY_INFO } from './data/machines';

const STORAGE_KEY = 'amitas_machines_catalog_v1';

// Automated Background SEO Head & JSON-LD Schema Injector for Google, Chrome & Safari Crawlers
const SeoHeadInjector: React.FC<{ machines: Machine[] }> = ({ machines }) => {
  useEffect(() => {
    // 1. Update Document Title & Meta Description for Search Engine Indexing
    document.title = "Amitas Industry | 1500 Kg Density Separator & Grain Destoner Manufacturer Kolhapur";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Amitas Industry is a leading manufacturer of 1500 Kg Density Separators, Industrial Grain Destoners, and Vibro Sifters in Kolhapur, Maharashtra. Food-grade SS304, 99.8% separation efficiency.');

    // 2. Canonical URL Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://amitasindustry.com/');

    // 3. Organization & LocalBusiness JSON-LD Schema
    const companySchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Amitas Industry",
      "legalName": "Amitas Industry Kolhapur",
      "url": "https://amitasindustry.com",
      "telephone": COMPANY_INFO.phone1,
      "email": COMPANY_INFO.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": COMPANY_INFO.address,
        "addressLocality": "Kolhapur",
        "addressRegion": "Maharashtra",
        "postalCode": "416234",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "priceRange": "₹₹₹"
    };

    // 4. Products ItemList JSON-LD Schema for Google / Chrome / Safari rich snippets
    const productsSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": machines.map((m, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": m.jsonLdSchema || {
          "@type": "Product",
          "name": m.name,
          "image": m.imageUrl,
          "description": m.shortDescription,
          "sku": m.model,
          "brand": { "@type": "Brand", "name": "Amitas Industry" },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": m.priceInrMin,
            "highPrice": m.priceInrMax,
            "offerCount": 1,
            "availability": m.inStock ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
          }
        }
      }))
    };

    // Append JSON-LD script tags to document head
    let scriptComp = document.getElementById('jsonld-company-schema');
    if (!scriptComp) {
      scriptComp = document.createElement('script');
      scriptComp.id = 'jsonld-company-schema';
      scriptComp.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptComp);
    }
    scriptComp.textContent = JSON.stringify(companySchema);

    let scriptProd = document.getElementById('jsonld-products-schema');
    if (!scriptProd) {
      scriptProd = document.createElement('script');
      scriptProd.id = 'jsonld-products-schema';
      scriptProd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptProd);
    }
    scriptProd.textContent = JSON.stringify(productsSchema);

  }, [machines]);

  return null;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('catalog');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [compareList, setCompareList] = useState<string[]>(['1500kg-density-separator', 'heavy-duty-industrial-destoner']);
  const [preselectedQuoteMachineId, setPreselectedQuoteMachineId] = useState<string>('1500kg-density-separator');

  // Load machines from localStorage or fallback to MACHINES_DATA
  const [machines, setMachines] = useState<Machine[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved machines from localStorage:', e);
    }
    return MACHINES_DATA;
  });

  // Save to localStorage whenever machines change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(machines));
    } catch (e) {
      console.error('Error saving machines to localStorage:', e);
    }
  }, [machines]);

  const toggleCompare = (machineId: string) => {
    setCompareList((prev) => 
      prev.includes(machineId)
        ? prev.filter(id => id !== machineId)
        : [...prev, machineId]
    );
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const openQuoteModal = (machineId?: string) => {
    if (machineId) {
      setPreselectedQuoteMachineId(machineId);
    }
    setActiveTab('contact');
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Search Engine Crawler SEO Head Injector */}
      <SeoHeadInjector machines={machines} />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        compareCount={compareList.length}
        openQuoteModal={openQuoteModal}
      />

      {/* Hero Section */}
      <Hero
        onExploreCatalog={() => {
          setActiveTab('catalog');
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenQuote={() => openQuoteModal('1500kg-density-separator')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Tab Views */}
      <main className="space-y-4">
        {activeTab === 'catalog' && (
          <MachineCatalog
            machines={machines}
            onSelectMachine={(m) => setSelectedMachine(m)}
            onOpenQuoteModal={(mId) => openQuoteModal(mId)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            compareList={compareList}
            toggleCompare={toggleCompare}
          />
        )}

        {activeTab === 'calculator' && (
          <QuoteCalculator
            machines={machines}
            onOpenQuoteWithMachine={(mId) => openQuoteModal(mId)}
            onSelectMachine={(m) => setSelectedMachine(m)}
          />
        )}

        {activeTab === 'compare' && (
          <MachineComparison
            machines={machines}
            compareList={compareList}
            toggleCompare={toggleCompare}
            clearCompare={clearCompare}
            onSelectMachine={(m) => setSelectedMachine(m)}
            onOpenQuote={(mId) => openQuoteModal(mId)}
          />
        )}

        {activeTab === 'about' && (
          <FactoryAbout />
        )}

        {activeTab === 'contact' && (
          <ContactSection machines={machines} preselectedMachineId={preselectedQuoteMachineId} />
        )}
      </main>

      {/* Persistent Contact & Factory Overview (always shown at bottom of home/catalog) */}
      {activeTab === 'catalog' && (
        <>
          <FactoryAbout />
          <ContactSection preselectedMachineId={preselectedQuoteMachineId} />
        </>
      )}

      {/* Machine Detail Specs Modal */}
      {selectedMachine && (
        <MachineDetailModal
          machine={selectedMachine}
          onClose={() => setSelectedMachine(null)}
          onRequestQuote={(mId) => {
            setSelectedMachine(null);
            openQuoteModal(mId);
          }}
        />
      )}

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        setSearchQuery={setSearchQuery}
      />

      {/* Floating Direct Call & WhatsApp Quick Buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col sm:flex-row items-end sm:items-center gap-2">
        <a
          href="tel:+919145546639"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-amber-300 transition-all hover:scale-105 active:scale-95"
          title="Call Direct"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span className="hidden xs:inline">Call +91 9145546639</span>
          <span className="xs:hidden">Call</span>
        </a>

        <a
          href="https://wa.me/919145546639?text=Hello%20Amitas%20Industry,%20I%20am%20interested%20in%20a%20price%20quote%20for%20your%20density%20separator%20and%20grain%20machinery."
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-3.5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-emerald-400 transition-all hover:scale-105 active:scale-95"
          title="WhatsApp Direct"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden xs:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

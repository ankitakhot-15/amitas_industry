import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  CheckCircle, 
  Scale, 
  FileText, 
  Eye, 
  Zap, 
  ShieldCheck,
  Tag,
  SlidersHorizontal,
  Plus,
  Check
} from 'lucide-react';
import { Machine } from '../types';
import { MACHINES_DATA } from '../data/machines';

interface MachineCatalogProps {
  machines?: Machine[];
  onSelectMachine: (machine: Machine) => void;
  onOpenQuoteModal: (machineId?: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  compareList: string[];
  toggleCompare: (machineId: string) => void;
}

export const MachineCatalog: React.FC<MachineCatalogProps> = ({
  machines,
  onSelectMachine,
  onOpenQuoteModal,
  searchQuery,
  setSearchQuery,
  compareList,
  toggleCompare
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'capacity-high' | 'capacity-low'>('relevance');

  const categories = [
    { id: 'all', label: 'All Machinery' },
    { id: 'density-separator', label: 'Density Separators' },
    { id: 'destoner', label: 'Destoners' },
    { id: 'vibro-sifter', label: 'Vibro Sifters' },
    { id: 'pre-cleaner', label: 'Spice Pre-Cleaners' },
    { id: 'processing-plant', label: 'Rotary Screen Plants' }
  ];

  const filteredMachines = useMemo(() => {
    const list = machines || MACHINES_DATA;
    return list.filter((m) => {
      // Category filter
      if (selectedCategory !== 'all' && m.category !== selectedCategory) {
        return false;
      }

      // Material filter
      if (selectedMaterial === 'ss304' && !m.material.toLowerCase().includes('ss304') && !m.material.toLowerCase().includes('stainless')) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const nameMatch = m.name.toLowerCase().includes(q);
        const modelMatch = m.model.toLowerCase().includes(q);
        const taglineMatch = m.tagline.toLowerCase().includes(q);
        const keywordMatch = m.seoKeywords.some(k => k.toLowerCase().includes(q));
        const appMatch = m.applications.some(a => a.toLowerCase().includes(q));
        const specMatch = m.specs.some(s => s.value.toLowerCase().includes(q));
        
        if (!nameMatch && !modelMatch && !taglineMatch && !keywordMatch && !appMatch && !specMatch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'capacity-high') return parseInt(b.capacity) - parseInt(a.capacity);
      if (sortBy === 'capacity-low') return parseInt(a.capacity) - parseInt(b.capacity);
      return 0;
    });
  }, [selectedCategory, selectedMaterial, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-12 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              Kolhapur Machinery Manufacturer Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Agro Processing & Grain Density Separators
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
              Select any machine to view complete engineering specifications, Google SEO metadata, download brochures, or request factory-direct quotations.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 whitespace-nowrap">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 text-xs text-slate-200 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="relevance">Featured & Relevant</option>
              <option value="rating">Top Customer Rated</option>
              <option value="capacity-high">Capacity: High to Low</option>
              <option value="capacity-low">Capacity: Low to High</option>
            </select>
          </div>
        </div>

        {/* Category Tabs & Filter Toolbar */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const count = cat.id === 'all' 
                ? MACHINES_DATA.length 
                : MACHINES_DATA.filter(m => m.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {cat.label}
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Chips */}
          {(searchQuery || selectedMaterial !== 'all') && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-300">Active Filters:</span>
              {searchQuery && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-white">✕</button>
                </span>
              )}
              {selectedMaterial !== 'all' && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                  Food Grade SS304
                  <button onClick={() => setSelectedMaterial('all')} className="hover:text-white">✕</button>
                </span>
              )}
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMaterial('all');
                  setSelectedCategory('all');
                }}
                className="text-amber-400 font-semibold underline text-[11px] ml-auto hover:text-amber-300"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Machine Cards Grid */}
        {filteredMachines.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <Search className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Machinery Found</h3>
            <p className="text-slate-400 text-xs max-w-md mx-auto">
              No machine matches "{searchQuery}". Try searching for keywords like "Density Separator", "Destoner", "Vibro Sifter", or "1500 Kg".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors"
            >
              Reset Search & Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMachines.map((m) => {
              const isCompared = compareList.includes(m.id);

              return (
                <div
                  key={m.id}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col group"
                >
                  {/* Card Header & Image */}
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 bg-slate-950/90 text-amber-400 border border-amber-500/30 font-extrabold text-[10px] uppercase tracking-wider rounded-md backdrop-blur-sm">
                        {m.model}
                      </span>

                      <button
                        onClick={() => toggleCompare(m.id)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all backdrop-blur-sm ${
                          isCompared
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-900/90 text-slate-300 border border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        {isCompared ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        {isCompared ? 'In Compare' : 'Compare'}
                      </button>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium">
                      <span className="bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {m.capacity}
                      </span>
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 text-[11px] font-bold">
                        {m.efficiency}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Reviews */}
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{m.rating}</span>
                          <span className="text-slate-500 font-normal">({m.reviewCount} reviews)</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">{m.warranty}</span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => onSelectMachine(m)}
                        className="text-lg font-bold text-white hover:text-amber-400 cursor-pointer transition-colors leading-snug"
                      >
                        {m.name}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {m.shortDescription}
                      </p>

                      {/* Key Quick Specs */}
                      <div className="mt-3 py-2 px-3 bg-slate-900/80 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-400 font-medium">Motor Power:</span>
                          <span className="font-semibold text-white">{m.powerHp}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-400 font-medium">Construction:</span>
                          <span className="font-semibold text-slate-200 truncate max-w-[170px]">{m.material}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-400 font-medium">Est. Price:</span>
                          <span className="font-bold text-amber-400">{m.priceRange}</span>
                        </div>
                      </div>

                      {/* Application Badges */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {m.applications.slice(0, 4).map((app, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-900 text-slate-300 text-[10px] rounded border border-slate-800">
                            {app}
                          </span>
                        ))}
                        {m.applications.length > 4 && (
                          <span className="px-1.5 py-0.5 bg-slate-900 text-slate-500 text-[10px] rounded">
                            +{m.applications.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectMachine(m)}
                        className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        Full Specs
                      </button>

                      <button
                        onClick={() => onOpenQuoteModal(m.id)}
                        className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Get Quote
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

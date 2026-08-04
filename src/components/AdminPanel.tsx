import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle, 
  Copy, 
  Image as ImageIcon, 
  X, 
  Save, 
  Sparkles, 
  Search, 
  Filter, 
  Check, 
  AlertCircle,
  Factory,
  Layers,
  Tag,
  Boxes,
  Eye
} from 'lucide-react';
import { Machine, TechnicalSpec } from '../types';
import { DENSITY_SEPARATOR_IMG } from '../data/machines';

interface AdminPanelProps {
  machines: Machine[];
  onAddMachine: (newMachine: Machine) => void;
  onUpdateMachine: (updatedMachine: Machine) => void;
  onDeleteMachine: (machineId: string) => void;
  onResetMachines: () => void;
  onSelectMachineToPreview: (machine: Machine) => void;
}

const PRESET_IMAGES = [
  { label: 'Density Separator Machine', url: DENSITY_SEPARATOR_IMG },
  { label: 'Industrial Destoner', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { label: 'Vibro Sifter & Grader', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { label: 'Heavy Equipment Processing', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  machines,
  onAddMachine,
  onUpdateMachine,
  onDeleteMachine,
  onResetMachines,
  onSelectMachineToPreview
}) => {
  // Admin Login & Token State
  const ADMIN_EMAIL = 'amitaindustry@gmail.com';
  const ADMIN_PASS = 'amita@industry';
  const TOKEN_KEY = 'amitas_admin_auth_token_v1';

  const [authToken, setAuthToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (e) {
      return null;
    }
  });

  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const isTokenValid = (token: string | null): boolean => {
    return !!(token && token.startsWith('AMITAS_ADM_'));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim().toLowerCase() === ADMIN_EMAIL && passwordInput === ADMIN_PASS) {
      const generatedToken = `AMITAS_ADM_JWT_${btoa(JSON.stringify({ email: ADMIN_EMAIL, timestamp: Date.now() }))}_${Math.random().toString(36).substring(2, 9)}`;
      try {
        localStorage.setItem(TOKEN_KEY, generatedToken);
      } catch (err) {
        console.error('Failed to save auth token:', err);
      }
      setAuthToken(generatedToken);
      setLoginError(null);
      setEmailInput('');
      setPasswordInput('');
      showToast('Login successful! Auth Bearer Token generated & stored.');
    } else {
      setLoginError('Invalid Login ID or Password. Only authorized admins can access.');
    }
  };

  const handleAdminLogout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (err) {
      console.error('Failed to remove auth token:', err);
    }
    setAuthToken(null);
    showToast('Logged out of Admin Portal.');
  };

  const fillQuickCredentials = () => {
    setEmailInput(ADMIN_EMAIL);
    setPasswordInput(ADMIN_PASS);
    setLoginError(null);
  };

  // Form State
  const [formData, setFormData] = useState<Partial<Machine>>({
    name: '',
    model: '',
    category: 'density-separator',
    tagline: '',
    shortDescription: '',
    fullDescription: '',
    capacity: '1500 kg/hr',
    powerHp: '5 HP (3-Phase)',
    material: 'SS304 Food Grade Contact / MS Frame',
    efficiency: '99.8% Separation Accuracy',
    priceRange: '₹1,85,000 - ₹2,45,000',
    usdPrice: '$2,200 - $2,900',
    rating: 4.9,
    reviewCount: 45,
    inStock: true,
    warranty: '1 Year Manufacturer Warranty',
    image: DENSITY_SEPARATOR_IMG,
    galleryImages: [DENSITY_SEPARATOR_IMG],
    applications: ['Rice Milling', 'Pulses & Dal', 'Spices', 'Seeds'],
    keyFeatures: [
      'Heavy-duty vibration dampening deck',
      'Variable Speed Drive (VFD) frequency control',
      'Food-grade SS304 screen mesh'
    ],
    specs: [
      { label: 'Processing Capacity', value: '1500 Kg/Hour' },
      { label: 'Electric Motor', value: '5 HP (3-Phase)' },
      { label: 'Deck Material', value: 'SS304 Stainless Steel' }
    ],
    seoKeywords: ['density separator machine', 'kolhapur grain machinery', 'destoner price']
  });

  const [appInput, setAppInput] = useState<string>('');
  const [featureInput, setFeatureInput] = useState<string>('');
  const [specLabelInput, setSpecLabelInput] = useState<string>('');
  const [specValueInput, setSpecValueInput] = useState<string>('');

  const handleOpenAddModal = () => {
    if (!isTokenValid(authToken)) {
      showToast('Unauthorized! Please login with admin credentials first.');
      return;
    }
    setEditingMachine(null);
    const newId = `machine-${Date.now()}`;
    setFormData({
      id: newId,
      name: 'New Grain Processing Machine',
      model: `AI-M-${Math.floor(100 + Math.random() * 900)}`,
      category: 'density-separator',
      tagline: 'High Performance Agro Grain Processing Equipment',
      shortDescription: 'Industrial grade grain cleaner engineered at Kolhapur Gokul Shirgaon MIDC plant.',
      fullDescription: 'Comprehensive high throughput industrial machine for cleaning, grading, and separating impurity particles with maximum precision.',
      capacity: '1500 kg/hr',
      powerHp: '5 HP (3-Phase)',
      material: 'SS304 Contact Parts',
      efficiency: '99.8% Impurity Separation',
      priceRange: '₹1,50,000 - ₹2,20,000',
      usdPrice: '$1,800 - $2,600',
      rating: 4.8,
      reviewCount: 12,
      inStock: true,
      warranty: '1 Year Manufacturer Warranty',
      image: DENSITY_SEPARATOR_IMG,
      galleryImages: [DENSITY_SEPARATOR_IMG],
      applications: ['Rice Milling', 'Pulses', 'Spices', 'Wheat'],
      keyFeatures: [
        'Heavy-duty industrial structural frame',
        'Energy-efficient 3-phase electric motor',
        'Low maintenance vibratory deck'
      ],
      specs: [
        { label: 'Capacity', value: '1500 Kg/Hr' },
        { label: 'Motor Power', value: '5 HP' }
      ],
      seoKeywords: ['kolhapur machine manufacturer', 'agro grain cleaner']
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (m: Machine) => {
    if (!isTokenValid(authToken)) {
      showToast('Unauthorized! Please login with admin credentials first.');
      return;
    }
    setEditingMachine(m);
    setFormData({ ...m });
    setIsModalOpen(true);
  };

  const handleSaveMachine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTokenValid(authToken)) {
      showToast('Unauthorized! Valid Admin Bearer token is required to add/edit products.');
      return;
    }

    if (!formData.name || !formData.model) {
      alert('Please fill in machine name and model number.');
      return;
    }

    const mName = formData.name || 'Machine';
    const slug = formData.id || mName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const canonicalUrl = `https://amitasindustry.com/machines/${slug}`;
    const jsonLdSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": mName,
      "image": [formData.image || DENSITY_SEPARATOR_IMG],
      "description": formData.shortDescription || mName,
      "sku": formData.model || 'AI-MODEL',
      "mpn": formData.model || 'AI-MODEL',
      "brand": {
        "@type": "Brand",
        "name": "Amitas Industry"
      },
      "offers": {
        "@type": "Offer",
        "url": canonicalUrl,
        "priceCurrency": "INR",
        "price": "185000.00",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": formData.inStock ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
      }
    };

    const finalMachine: Machine = {
      id: slug,
      name: mName,
      model: formData.model || 'AI-MODEL',
      category: (formData.category as any) || 'density-separator',
      tagline: formData.tagline || 'Industrial Grain Processing Machinery',
      shortDescription: formData.shortDescription || '',
      fullDescription: formData.fullDescription || '',
      capacity: formData.capacity || '1500 kg/hr',
      powerHp: formData.powerHp || '5 HP',
      material: formData.material || 'SS304 Stainless Steel',
      efficiency: formData.efficiency || '99.8% Efficiency',
      priceRange: formData.priceRange || '₹1,85,000 - ₹2,45,000',
      usdPrice: formData.usdPrice || '$2,200 - $2,900',
      rating: formData.rating || 4.9,
      reviewCount: formData.reviewCount || 25,
      inStock: formData.inStock ?? true,
      warranty: formData.warranty || '1 Year Manufacturer Warranty',
      image: formData.image || DENSITY_SEPARATOR_IMG,
      galleryImages: formData.galleryImages && formData.galleryImages.length > 0 ? formData.galleryImages : [formData.image || DENSITY_SEPARATOR_IMG],
      applications: formData.applications || ['Rice Milling', 'Pulses', 'Spices'],
      keyFeatures: formData.keyFeatures || ['Industrial construction'],
      specs: formData.specs || [{ label: 'Capacity', value: '1500 kg/hr' }],
      seoKeywords: formData.seoKeywords || [mName.toLowerCase()],
      seoTitle: `${mName} (${formData.model}) Price & Specs | Amitas Industry Kolhapur`,
      seoDescription: formData.shortDescription || `Buy ${mName} directly from Kolhapur manufacturer.`,
      canonicalUrl,
      jsonLdSchema
    };

    if (editingMachine) {
      onUpdateMachine(finalMachine);
      showToast(`Updated product: "${finalMachine.name}" [Token Authorized]`);
    } else {
      onAddMachine(finalMachine);
      showToast(`Added new product: "${finalMachine.name}" [Token Authorized]`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirmed = () => {
    if (!isTokenValid(authToken)) {
      showToast('Unauthorized! Valid Admin Bearer token is required to delete products.');
      return;
    }
    if (deleteConfirmId) {
      const target = machines.find(m => m.id === deleteConfirmId);
      onDeleteMachine(deleteConfirmId);
      showToast(`Deleted product: "${target?.name || 'Machine'}" [Token Authorized]`);
      setDeleteConfirmId(null);
    }
  };

  const handleDuplicateMachine = (m: Machine) => {
    if (!isTokenValid(authToken)) {
      showToast('Unauthorized! Valid Admin Bearer token is required to duplicate products.');
      return;
    }
    const dup: Machine = {
      ...m,
      id: `${m.id}-copy-${Date.now()}`,
      name: `${m.name} (Copy)`,
      model: `${m.model}-COPY`
    };
    onAddMachine(dup);
    showToast(`Duplicated product: "${dup.name}" [Token Authorized]`);
  };

  const handleToggleStock = (m: Machine) => {
    if (!isTokenValid(authToken)) {
      showToast('Unauthorized! Valid Admin Bearer token is required to update stock status.');
      return;
    }
    const updated = { ...m, inStock: !m.inStock };
    onUpdateMachine(updated);
    showToast(`Updated stock status for "${m.name}" to ${updated.inStock ? 'In Stock' : 'Made to Order'} [Token Authorized]`);
  };

  const filteredMachinesList = machines.filter(m => {
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (searchFilter.trim() !== '') {
      const q = searchFilter.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.model.toLowerCase().includes(q) || m.capacity.toLowerCase().includes(q);
    }
    return true;
  });

  // Render Login Card if not authorized
  if (!isTokenValid(authToken)) {
    return (
      <section id="admin-login" className="py-16 bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-[11px] rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Restricted Admin Portal Access
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight">
              Admin Sign In & Token Auth
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Log in with official Amitas Industry admin credentials to generate a secure Bearer Auth Token for product creation, modification, and deletion.
            </p>
          </div>

          {loginError && (
            <div className="bg-rose-500/15 border border-rose-500/30 p-3.5 rounded-xl text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">
                Admin Email ID *
              </label>
              <input
                type="email"
                required
                placeholder="amitaindustry@gmail.com"
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value); setLoginError(null); }}
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3.5 focus:outline-none focus:border-amber-500 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">
                Admin Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => { setPasswordInput(e.target.value); setLoginError(null); }}
                  className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3.5 pr-10 focus:outline-none focus:border-amber-500 font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              Sign In & Generate Admin Auth Token
            </button>
          </form>

          {/* Helper Box with Click to Fill */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-center">
            <div className="text-[11px] font-bold text-slate-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Authorized Admin Credentials:
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 space-y-1">
              <div><span className="text-slate-400">Login ID:</span> amitaindustry@gmail.com</div>
              <div><span className="text-slate-400">Password:</span> amita@industry</div>
            </div>

            <button
              type="button"
              onClick={fillQuickCredentials}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
            >
              ⚡ Auto-Fill Admin Login Credentials
            </button>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section id="admin-panel" className="py-10 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 space-y-8">

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-black px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-4 text-xs">
            <CheckCircle className="w-5 h-5" />
            {toastMessage}
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs rounded-full">
              <Factory className="w-3.5 h-3.5" />
              Kolhapur Plant Product Catalog Management
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Admin Machine Product Portal
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">
                Live Inventory Manager
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Add new machine models, update specifications, prices, and photo galleries, or delete discontinued products.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add New Machine
            </button>

            <button
              onClick={() => {
                if (!isTokenValid(authToken)) {
                  showToast('Unauthorized! Valid token required.');
                  return;
                }
                if (confirm('Are you sure you want to reset all products back to Kolhapur default factory lineup?')) {
                  onResetMachines();
                  showToast('Reset catalog to default Kolhapur factory lineup! [Token Authorized]');
                }
              }}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Active Auth Token Session Banner */}
        <div className="bg-slate-900 border border-emerald-500/30 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 shadow-lg">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-white">Authorized Admin Session:</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  {ADMIN_EMAIL}
                </span>
                <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                  Token Active
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-1 overflow-hidden">
                <span className="text-slate-500 shrink-0">Bearer Token:</span>
                <span className="text-amber-300 truncate max-w-xs sm:max-w-md select-all">{authToken}</span>
                <button
                  onClick={() => {
                    if (authToken) {
                      navigator.clipboard.writeText(authToken);
                      showToast('Auth Token copied to clipboard!');
                    }
                  }}
                  className="text-slate-300 hover:text-white flex items-center gap-1 text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 transition-colors shrink-0"
                  title="Copy Auth Token"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAdminLogout}
            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shrink-0 self-start md:self-auto"
          >
            <Lock className="w-3.5 h-3.5" />
            Sign Out & Revoke Token
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Machine Models</div>
            <div className="text-2xl font-black text-white font-mono">{machines.length}</div>
            <p className="text-[10px] text-slate-500">Active in search index & catalog</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">In Stock Ready</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {machines.filter(m => m.inStock).length}
            </div>
            <p className="text-[10px] text-slate-500">Dispatch within 24 hours</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Categories Covered</div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {new Set(machines.map(m => m.category)).size}
            </div>
            <p className="text-[10px] text-slate-500">Density, Destoners, Sifters</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Storage Engine</div>
            <div className="text-sm font-bold text-slate-200">Browser Local Storage</div>
            <p className="text-[10px] text-emerald-400 font-mono">Synced & Persisted</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by machine name or model..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Categories</option>
              <option value="density-separator">Density Separators</option>
              <option value="destoner">Destoners</option>
              <option value="vibro-sifter">Vibro Sifters</option>
              <option value="pre-cleaner">Spice Pre-Cleaners</option>
              <option value="processing-plant">Rotary Processing Plants</option>
            </select>
          </div>
        </div>

        {/* Machine Table / Cards Grid */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Machine Product</th>
                  <th className="py-3.5 px-4">Model & Code</th>
                  <th className="py-3.5 px-4">Capacity & Motor</th>
                  <th className="py-3.5 px-4">Factory Price Range</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredMachinesList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 space-y-2">
                      <AlertCircle className="w-8 h-8 mx-auto text-slate-600" />
                      <p className="font-bold">No machine products found matching filter.</p>
                      <button
                        onClick={() => { setSearchFilter(''); setCategoryFilter('all'); }}
                        className="text-amber-400 underline font-semibold"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredMachinesList.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={m.image}
                            alt={m.name}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).src = DENSITY_SEPARATOR_IMG; }}
                          />
                          <div>
                            <div className="font-bold text-white text-sm line-clamp-1">{m.name}</div>
                            <span className="text-[10px] text-amber-400 font-mono uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              {m.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-slate-200">
                        {m.model}
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{m.capacity}</div>
                        <div className="text-[11px] text-slate-400">{m.powerHp}</div>
                      </td>

                      <td className="py-4 px-4 font-bold text-amber-300">
                        {m.priceRange}
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStock(m)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            m.inStock 
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' 
                              : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                          }`}
                        >
                          {m.inStock ? '✓ Ready Stock' : '⏳ Made To Order'}
                        </button>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectMachineToPreview(m)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                            title="Preview Specs Modal"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(m)}
                            className="p-2 bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 rounded-lg border border-amber-500/30 transition-colors"
                            title="Edit Machine Specifications"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDuplicateMachine(m)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                            title="Duplicate as New Model"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(m.id)}
                            className="p-2 bg-rose-500/15 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg border border-rose-500/30 transition-colors"
                            title="Delete Machine"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ADD / EDIT MACHINE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Factory className="w-5 h-5 text-amber-400" />
                  {editingMachine ? `Edit Product: ${editingMachine.name}` : 'Add New Machine Product'}
                </h3>
                <p className="text-xs text-slate-400">
                  Update specifications, prices, and applications for Kolhapur catalog and Google Search Indexing.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Form */}
            <form onSubmit={handleSaveMachine} className="space-y-6 text-xs">
              
              {/* Row 1: Name & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Machine Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1500 Kg Density Separator Machine"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Model Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI-DS-1500"
                    value={formData.model || ''}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Row 2: Category, Capacity, Power */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category || 'density-separator'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="density-separator">Density Separator</option>
                    <option value="destoner">Destoner</option>
                    <option value="vibro-sifter">Vibro Sifter</option>
                    <option value="pre-cleaner">Spice Pre-Cleaner</option>
                    <option value="processing-plant">Rotary Processing Plant</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Capacity (Kg/Hr)</label>
                  <input
                    type="text"
                    placeholder="e.g. 1500 kg/hr"
                    value={formData.capacity || ''}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Motor Power (HP)</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 HP (3-Phase)"
                    value={formData.powerHp || ''}
                    onChange={(e) => setFormData({ ...formData, powerHp: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Row 3: Prices & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">INR Price Range (₹)</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹1,85,000 - ₹2,45,000"
                    value={formData.priceRange || ''}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-mono text-amber-400 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">USD Price Range ($)</label>
                  <input
                    type="text"
                    placeholder="e.g. $2,200 - $2,900"
                    value={formData.usdPrice || ''}
                    onChange={(e) => setFormData({ ...formData, usdPrice: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Stock Availability</label>
                  <select
                    value={formData.inStock ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.value === 'true' })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="true">In Stock (Ready Dispatch)</option>
                    <option value="false">Made To Order (5-7 Days)</option>
                  </select>
                </div>
              </div>

              {/* Tagline & Short Description */}
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Tagline / Subheading</label>
                  <input
                    type="text"
                    placeholder="e.g. High-Efficiency Specific Gravity Separation for Grains, Seeds & Pulses"
                    value={formData.tagline || ''}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief 2-sentence summary for card previews..."
                    value={formData.shortDescription || ''}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Full Machine Description</label>
                  <textarea
                    rows={3}
                    placeholder="Detailed explanation of machine deck engineering, vibration principles, and applications..."
                    value={formData.fullDescription || ''}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="block font-bold text-slate-300">Machine Image Source URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-mono text-xs"
                />

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-bold">Or select factory preset:</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded border border-slate-800 text-[10px] font-bold"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Applications Tag Manager */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="block font-bold text-slate-300">Grains & Materials Applications</label>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.applications || []).map((app, idx) => (
                    <span key={idx} className="bg-slate-900 text-slate-200 border border-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold text-[11px]">
                      {app}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedApps = (formData.applications || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, applications: updatedApps });
                        }}
                        className="text-slate-400 hover:text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add target crop (e.g. Wheat, Toor Dal, Spices)..."
                    value={appInput}
                    onChange={(e) => setAppInput(e.target.value)}
                    className="flex-1 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-2 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (appInput.trim()) {
                        setFormData({
                          ...formData,
                          applications: [...(formData.applications || []), appInput.trim()]
                        });
                        setAppInput('');
                      }
                    }}
                    className="px-4 bg-amber-500 text-slate-950 font-bold rounded-xl"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Technical Specifications Pair Editor */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="block font-bold text-slate-300">Technical Specifications Table</label>
                <div className="space-y-2">
                  {(formData.specs || []).map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="font-bold text-amber-300 w-1/3">{s.label}:</span>
                      <span className="text-slate-200 w-2/3">{s.value}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedSpecs = (formData.specs || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, specs: updatedSpecs });
                        }}
                        className="text-rose-400 p-1 hover:bg-rose-500/20 rounded"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Spec Label (e.g. Deck Dimension)"
                    value={specLabelInput}
                    onChange={(e) => setSpecLabelInput(e.target.value)}
                    className="sm:col-span-2 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-2 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 1200 x 900 mm)"
                    value={specValueInput}
                    onChange={(e) => setSpecValueInput(e.target.value)}
                    className="sm:col-span-2 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-2 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (specLabelInput.trim() && specValueInput.trim()) {
                        setFormData({
                          ...formData,
                          specs: [...(formData.specs || []), { label: specLabelInput.trim(), value: specValueInput.trim() }]
                        });
                        setSpecLabelInput('');
                        setSpecValueInput('');
                      }
                    }}
                    className="bg-amber-500 text-slate-950 font-bold rounded-xl py-2"
                  >
                    Add Spec
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingMachine ? 'Save Machine Changes' : 'Publish Machine To Catalog'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto font-black">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-lg font-black text-white">Delete Product from Catalog?</h4>
              <p className="text-xs text-slate-300">
                Are you sure you want to permanently delete{' '}
                <strong className="text-amber-400">
                  {machines.find(m => m.id === deleteConfirmId)?.name}
                </strong>?
                This action will remove it from the catalog, comparison tool, and Google SEO Schema exporter.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirmed}
                className="py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs shadow-lg shadow-rose-600/20"
              >
                Yes, Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

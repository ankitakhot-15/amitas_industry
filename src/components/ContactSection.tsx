import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Factory,
  ShieldCheck,
  Check,
  Building2
} from 'lucide-react';
import { COMPANY_INFO, MACHINES_DATA } from '../data/machines';
import { Machine, QuoteRequest } from '../types';

interface ContactSectionProps {
  machines?: Machine[];
  preselectedMachineId?: string;
  onQuoteSubmitted?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  machines,
  preselectedMachineId,
  onQuoteSubmitted
}) => {
  const machineList = machines && machines.length > 0 ? machines : MACHINES_DATA;
  const [formData, setFormData] = useState<QuoteRequest>({
    machineId: preselectedMachineId || '1500kg-density-separator',
    machineName: machineList.find(m => m.id === preselectedMachineId)?.name || machineList[0].name,
    customerName: '',
    companyName: '',
    phone: '',
    email: '',
    cityState: '',
    materialToProcess: 'Rice & Pulses',
    requiredCapacityKgHr: 1500,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onQuoteSubmitted) {
      onQuoteSubmitted();
    }
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Amitas Industry Kolhapur,%0A%0AI would like a price quotation for:%0AMachine: ${formData.machineName}%0ACompany: ${formData.companyName || 'N/A'}%0AContact: ${formData.customerName} (${formData.phone})%0ALocation: ${formData.cityState}%0AMaterial: ${formData.materialToProcess}%0AProcessing Target: ${formData.requiredCapacityKgHr} Kg/hr%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const handleEmailDirect = () => {
    const subject = encodeURIComponent(`Inquiry for ${formData.machineName} - ${formData.customerName || 'Customer'}`);
    const body = encodeURIComponent(
      `Hello Amitas Industry,\n\nI would like to inquire about the following machine:\n\n` +
      `Machine: ${formData.machineName}\n` +
      `Customer Name: ${formData.customerName || 'N/A'}\n` +
      `Company: ${formData.companyName || 'N/A'}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Location: ${formData.cityState || 'N/A'}\n` +
      `Processing Material: ${formData.materialToProcess}\n` +
      `Target Capacity: ${formData.requiredCapacityKgHr} kg/hr\n` +
      `Message: ${formData.message || 'N/A'}\n\n` +
      `Please send me product pricing and technical specification PDF.`
    );
    window.open(`mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`, '_self');
  };

  const faqs = [
    {
      q: 'What is the price of the 1500 Kg Density Separator Machine?',
      a: 'The 1500 Kg Density Separator Machine (Model AI-DS-1500) ranges from ₹1,85,000 to ₹2,45,000 depending on motor specifications (3-phase 5 HP) and SS304 food-grade contact screen options. Contact us for factory direct pricing.'
    },
    {
      q: 'How does a Density Separator Machine work?',
      a: 'The machine operates on the principle of specific gravity difference. An adjustable air fluidization fan elevates lighter grains while eccentric deck vibrations move heavier stones and foreign particles towards separate discharge chutes with 99.8% separation precision.'
    },
    {
      q: 'Where is your factory located?',
      a: 'Our manufacturing plant is located at Plot No. C-42, Gokul Shirgaon MIDC Industrial Area, Kolhapur, Maharashtra 416012, India. We welcome factory visits and live grain testing demonstrations.'
    },
    {
      q: 'What warranty and technical support is provided?',
      a: 'All Amitas Industry machinery includes 1-year comprehensive manufacturer warranty covering motors and structural frames, along with pan-India on-site technical support and spare parts availability.'
    },
    {
      q: 'Can this machine be searched and indexed on Google Search by machine name?',
      a: 'Yes! Every machine generated on this portal contains Schema.org JSON-LD structured data and optimized meta tags so when someone searches machine names like "1500 Kg Density Separator Machine" or "Destoner Machine", Google renders the rich snippet result.'
    }
  ];

  return (
    <section id="contact" className="py-16 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs rounded-full">
            <Factory className="w-3.5 h-3.5" />
            Direct Factory Quotation & Technical Inquiry
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Contact Amitas Industry Kolhapur
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Get instant price estimates, technical spec sheets, and live machinery demonstrations directly from our Gokul Shirgaon MIDC plant.
          </p>
        </div>

        {/* Direct Phone & WhatsApp Hotlines Banner */}
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-500/20 border border-amber-500/30 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
              <Phone className="w-4 h-4 animate-bounce" />
              Direct Factory Sales Hotlines
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Call or WhatsApp us at <span className="text-amber-400 font-mono">+91 9145546639</span>
            </h3>
            <p className="text-xs text-slate-300">
              Instant factory price quote, machine specification PDF, and live video demo from Gokul Shirgaon MIDC Kolhapur.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+919145546639"
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              Call +91 9145546639
            </a>

            <a
              href="https://wa.me/919145546639?text=Hello%20Amitas%20Industry,%20I%20am%20interested%20in%20a%20price%20quote%20for%20your%20density%20separator%20and%20grain%20machinery."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all active:scale-95 border border-emerald-500/30"
            >
              <MessageSquare className="w-4 h-4" />
              Send WhatsApp Message
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}?subject=Inquiry%20for%20Amitas%20Industry%20Machinery`}
              className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-sky-600/20 flex items-center gap-2 transition-all active:scale-95 border border-sky-500/30"
            >
              <Mail className="w-4 h-4" />
              Email ankitakhot015@gmail.com
            </a>
          </div>
        </div>

        {/* Main Grid: Form + Address Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Quote Form */}
          <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Official Price Quote Request Form</h3>
                <p className="text-xs text-slate-400">Fill in your requirements for factory pricing within 2 hours.</p>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded font-bold uppercase">
                Direct To Sales Team
              </span>
            </div>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-xl text-center space-y-4 animate-in zoom-in-95">
                <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto font-black">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-emerald-400">Quotation Request Received!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.customerName}</strong>. Our engineering team at Kolhapur will review your request for <strong className="text-amber-400">{formData.machineName}</strong> and contact you at <strong className="text-white">{formData.phone}</strong> shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 mx-auto"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Speed Up Inquiry via WhatsApp
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Select Machine */}
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Select Machine Model:</label>
                  <select
                    value={formData.machineId}
                    onChange={(e) => {
                      const selected = MACHINES_DATA.find(m => m.id === e.target.value);
                      setFormData({
                        ...formData,
                        machineId: e.target.value,
                        machineName: selected?.name || ''
                      });
                    }}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    {machineList.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.model}) - {m.capacity}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Company / Mill Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Patil Rice & Pulse Mill"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98234 56789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. sales@patilmill.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* City & State */}
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Delivery City & State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kolhapur, Maharashtra / Nizamabad, Telangana"
                    value={formData.cityState}
                    onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Specific Requirements / Message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your target raw material (e.g. Paddy rice, Toor dal, Turmeric), required motor voltage, or installation support needed."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    type="submit"
                    className="py-3 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Quote
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all border border-emerald-500/30 text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailDirect}
                    className="py-3 px-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl shadow-lg shadow-sky-600/20 flex items-center justify-center gap-1.5 transition-all border border-sky-500/30 text-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Send Email
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Address & Map Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <MapPin className="w-5 h-5 text-amber-400" />
                Kolhapur Manufacturing Plant
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Factory Address:</span>
                    <p className="text-slate-300 leading-relaxed">{COMPANY_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Factory Contact Hotline:</span>
                    <a href="tel:+919145546639" className="font-mono text-amber-300 font-bold hover:underline">
                      +91 91455 46639
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Email Inquiry:</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}?subject=Inquiry%20for%20Amitas%20Industry%20Machinery`}
                      className="font-mono text-amber-300 font-bold hover:underline hover:text-amber-200 transition-colors inline-flex items-center gap-1 text-xs sm:text-sm"
                    >
                      {COMPANY_INFO.email} ↗
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">ISO Certification:</span>
                    <p className="text-emerald-400 font-semibold">{COMPANY_INFO.isoCertification}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Block */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>📍 Gokul Shirgaon MIDC Location Map</span>
                <span className="text-[10px] text-amber-400 font-mono">Kolhapur, MH</span>
              </div>

              <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center text-center p-4">
                <div className="space-y-2">
                  <MapPin className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
                  <div className="text-xs font-bold text-white">Amitas Industry Machinery Works</div>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    Plot C-42, Gokul Shirgaon MIDC, Kolhapur 416012
                  </p>
                  <a
                    href="https://maps.google.com/?q=Gokul+Shirgaon+MIDC+Kolhapur"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-[11px] font-bold text-amber-400 underline hover:text-amber-300"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              Frequently Asked Questions (FAQs)
            </h3>
            <p className="text-xs text-slate-400">Common questions regarding density separators, destoners, and Google search indexing.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left text-xs sm:text-sm font-bold text-white flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

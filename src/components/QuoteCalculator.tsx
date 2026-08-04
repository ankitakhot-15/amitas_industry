import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Factory, 
  ShieldCheck,
  Scale
} from 'lucide-react';
import { MACHINES_DATA } from '../data/machines';
import { Machine } from '../types';

interface QuoteCalculatorProps {
  machines?: Machine[];
  onOpenQuoteWithMachine: (machineId: string) => void;
  onSelectMachine: (machine: Machine) => void;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({
  machines,
  onOpenQuoteWithMachine,
  onSelectMachine
}) => {
  const machineList = machines && machines.length > 0 ? machines : MACHINES_DATA;
  const [cropType, setCropType] = useState<string>('Rice');
  const [targetVolume, setTargetVolume] = useState<number>(1500); // kg/hr
  const [operatingHours, setOperatingHours] = useState<number>(10); // hrs/day
  const [electricityRate, setElectricityRate] = useState<number>(8); // INR per kWh

  // Determine recommended machine
  const recommendation = useMemo(() => {
    if (targetVolume <= 1000) {
      return machineList.find(m => m.id === 'semi-automatic-destoner-machine') || machineList[0];
    } else if (targetVolume <= 1500) {
      return machineList.find(m => m.id === '1500kg-density-separator') || machineList[0];
    } else if (targetVolume <= 2500) {
      return machineList.find(m => m.id === 'heavy-duty-industrial-destoner') || machineList[1] || machineList[0];
    } else {
      return machineList.find(m => m.id === 'rotary-drum-grain-cleaner') || machineList[machineList.length - 1] || machineList[0];
    }
  }, [targetVolume, machineList]);

  // Calculations
  const dailyTotalKg = targetVolume * operatingHours;
  const estimatedPowerKw = parseFloat(recommendation.powerHp) * 0.746; // HP to kW
  const dailyPowerKwh = estimatedPowerKw * operatingHours;
  const dailyPowerCostInr = Math.round(dailyPowerKwh * electricityRate);
  const monthlyLaborSavingsInr = Math.round(dailyTotalKg * 0.15 * 26); // Labor saved by automated gravity separation
  const estimatedPaybackMonths = Math.max(2.5, Math.round((210000 / (monthlyLaborSavingsInr || 1)) * 10) / 10);

  return (
    <section id="calculator" className="py-12 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs rounded-full">
            <Calculator className="w-3.5 h-3.5" />
            Machine Capacity & ROI Calculator
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Find the Perfect Density Separator or Destoner for Your Plant
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure your target processing volume and crop type to receive an instant machinery recommendation, power consumption estimate, and estimated payback schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Controls */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            
            {/* Crop Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                1. Select Material / Grain to Process:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Rice', 'Pulses & Dal', 'Spices & Herbs', 'Wheat & Grains', 'Seeds & Sesame', 'Plastic Granules'].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setCropType(crop)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-left ${
                      cropType === crop
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    🌾 {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Capacity Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-300">2. Target Hourly Processing Volume:</label>
                <span className="text-amber-400 font-extrabold text-sm">{targetVolume} Kg / Hour</span>
              </div>
              <input
                type="range"
                min={500}
                max={5000}
                step={250}
                value={targetVolume}
                onChange={(e) => setTargetVolume(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>500 Kg/hr</span>
                <span>1500 Kg/hr (Popular)</span>
                <span>3000 Kg/hr</span>
                <span>5000 Kg/hr</span>
              </div>
            </div>

            {/* Daily Operating Hours */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-300">3. Estimated Daily Operating Hours:</label>
                <span className="text-amber-400 font-extrabold text-sm">{operatingHours} Hours / Day</span>
              </div>
              <input
                type="range"
                min={4}
                max={24}
                step={1}
                value={operatingHours}
                onChange={(e) => setOperatingHours(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Electricity Tariff */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                4. Local Commercial Electricity Tariff (₹ per kWh):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono w-24 focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs text-slate-400">₹ / Unit (India Average: ₹7 - ₹10)</span>
              </div>
            </div>

          </div>

          {/* Results Output Box */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Factory className="w-4 h-4" />
                RECOMMENDED MACHINERY MODEL
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded">
                99.8% Separation Match
              </span>
            </div>

            {/* Machine Name Box */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-amber-400 font-mono font-bold">{recommendation.model}</div>
              <h3 className="text-lg font-black text-white">{recommendation.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{recommendation.shortDescription}</p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 font-semibold text-slate-300">
                  ⚡ Power: {recommendation.powerHp}
                </span>
                <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 font-semibold text-slate-300">
                  🏗️ Rated: {recommendation.capacity}
                </span>
                <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 font-bold text-amber-400">
                  🏷️ Est. Price: {recommendation.priceRange}
                </span>
              </div>
            </div>

            {/* Calculated Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 font-medium">Daily Processing Total</div>
                <div className="text-lg font-black text-white mt-0.5">
                  {(dailyTotalKg / 1000).toFixed(1)} Tons / Day
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{dailyTotalKg.toLocaleString()} Kg total output</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 font-medium">Daily Electricity Cost</div>
                <div className="text-lg font-black text-amber-400 mt-0.5">
                  ₹{dailyPowerCostInr} / Day
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{dailyPowerKwh.toFixed(1)} kWh energy draw</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 font-medium">Monthly Labor Savings</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">
                  ₹{monthlyLaborSavingsInr.toLocaleString()} / Mo
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Automated stone & heavy sorting</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 font-medium">Estimated Payback Period</div>
                <div className="text-lg font-black text-sky-400 mt-0.5">
                  ~ {estimatedPaybackMonths} Months
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">ROI payback schedule</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onOpenQuoteWithMachine(recommendation.id)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Request Factory Direct Quotation For {recommendation.model}
              </button>

              <button
                onClick={() => onSelectMachine(recommendation)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
              >
                View Complete Engineering Specifications
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

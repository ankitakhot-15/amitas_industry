import React from 'react';
import { Scale, Check, X, FileText, ArrowRight, Trash2, ShieldCheck, Zap } from 'lucide-react';
import { MACHINES_DATA } from '../data/machines';
import { Machine } from '../types';

interface MachineComparisonProps {
  machines?: Machine[];
  compareList: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  onSelectMachine: (m: Machine) => void;
  onOpenQuote: (id: string) => void;
}

export const MachineComparison: React.FC<MachineComparisonProps> = ({
  machines,
  compareList,
  toggleCompare,
  clearCompare,
  onSelectMachine,
  onOpenQuote
}) => {
  const machineList = machines && machines.length > 0 ? machines : MACHINES_DATA;
  // If fewer than 2 selected, default to comparing first 3 machines
  const machinesToCompare = compareList.length >= 2 
    ? machineList.filter(m => compareList.includes(m.id))
    : machineList.slice(0, 3);

  return (
    <section id="compare" className="py-12 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              Machine Side-by-Side Comparison Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Compare Amitas Industry Machinery Models
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Evaluate capacities, motor power, separation efficiency, build materials, and factory prices side-by-side.
            </p>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Custom Selection
            </button>
          )}
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="p-4 w-48 text-slate-400 font-bold uppercase text-[11px] sticky left-0 bg-slate-950 z-10 border-r border-slate-800">
                  Specification Attribute
                </th>
                {machinesToCompare.map((m) => (
                  <th key={m.id} className="p-4 min-w-[240px] text-center border-r border-slate-800/80">
                    <div className="space-y-2">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 max-w-[160px] mx-auto border border-slate-800">
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="font-mono text-[10px] text-amber-400 font-extrabold">{m.model}</div>
                      <div className="font-bold text-slate-100 text-sm line-clamp-2 h-10">{m.name}</div>
                      <button
                        onClick={() => onOpenQuote(m.id)}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-md shadow-amber-500/10"
                      >
                        Get Price Quote
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {/* Category */}
              <tr>
                <td className="p-4 font-bold text-slate-400 sticky left-0 bg-slate-950 border-r border-slate-800">
                  Category
                </td>
                {machinesToCompare.map((m) => (
                  <td key={m.id} className="p-4 text-center border-r border-slate-800/80 capitalize font-medium">
                    {m.category.replace('-', ' ')}
                  </td>
                ))}
              </tr>

              {/* Processing Capacity */}
              <tr className="bg-slate-950/40">
                <td className="p-4 font-bold text-slate-400 sticky left-0 bg-slate-950 border-r border-slate-800">
                  Hourly Processing Capacity
                </td>
                {machinesToCompare.map((m) => (
                  <td key={m.id} className="p-4 text-center border-r border-slate-800/80 font-black text-amber-400 text-sm">
                    {m.capacity}
                  </td>
                ))}
              </tr>

              {/* Electric Motor Power */}
              <tr>
                <td className="p-4 font-bold text-slate-400 sticky left-0 bg-slate-950 border-r border-slate-800">
                  Motor & Power HP
                </td>
                {machinesToCompare.map((m) => (
                  <td key={m.id} className="p-4 text-center border-r border-slate-800/80 font-semibold text-white">
                    {m.powerHp}
                  </td>
                ))}
              </tr>

              {/* Efficiency Rate */}
              <tr className="bg-slate-950/40">
                <td className="p-4 font-bold text-slate-400 sticky left-0 bg-slate-950 border-r border-slate-800">
                  Separation Efficiency
                </td>
                {machinesToCompare.map((m) => (
                  <td key={m.id} className="p-4 text-center border-r border-slate-800/80 font-bold text-emerald-400">
                    {m.efficiency}
                  </td>
                ))}
              </tr>

              {/* Material of Construction */}
              <tr>
                <td className="p-4 font-bold text-slate-400 sticky left-0 bg-slate-950 border-r border-slate-800">
                  Build Material
                </td>
                {machinesToCompare.map((m) => (
                  <td key={m.id} className="p-4 text-center border-r border-slate-800/80 font-medium text-slate-200">
                    {m.material}
                  </td>
                ))}
              </tr>

              {/* Estimated Factory Price */}
              <tr className="bg-slate-950/40">
                <td className="p-4 font-bold text-slate-400 sticky left-0 bg-slate-950 border-r border-slate-800">
                  Factory Price Range
                </td>
                {machinesToCompare.map((m) => (
                  <td key={m.id} className="p-4 text-center border-r border-slate-800/80 font-black text-amber-400 text-sm">
                    {m.priceRange}
                  </td>
                ))}
              </tr>

              {/* Warranty */}
              <tr>
                <td className="p-4 font-bold text-slate-400 sticky left-0 bg-slate-950 border-r border-slate-800">
                  Warranty & Support
                </td>
                {machinesToCompare.map((m) => (
                  <td key={m.id} className="p-4 text-center border-r border-slate-800/80 font-medium">
                    {m.warranty}
                  </td>
                ))}
              </tr>

              {/* Key Applications */}
              <tr className="bg-slate-950/40">
                <td className="p-4 font-bold text-slate-400 sticky left-0 bg-slate-950 border-r border-slate-800">
                  Applications
                </td>
                {machinesToCompare.map((m) => (
                  <td key={m.id} className="p-4 border-r border-slate-800/80">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {m.applications.map((app, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-950 text-slate-300 rounded text-[10px] border border-slate-800">
                          {app}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Inspect Button */}
              <tr>
                <td className="p-4 font-bold text-slate-400 sticky left-0 bg-slate-950 border-r border-slate-800">
                  Full Details
                </td>
                {machinesToCompare.map((m) => (
                  <td key={m.id} className="p-4 text-center border-r border-slate-800/80">
                    <button
                      onClick={() => onSelectMachine(m)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-xs transition-colors border border-slate-700"
                    >
                      View Complete Specs
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

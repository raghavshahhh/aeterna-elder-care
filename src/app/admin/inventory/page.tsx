'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Lock,
  Tag,
  Edit2,
  Save,
  X,
  Sparkles,
  Layers
} from 'lucide-react';
import { InventoryUnit, InventoryStatus } from '@/lib/db/schema';

export default function AdminInventoryPage() {
  const [units, setUnits] = useState<InventoryUnit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editPriceDisplay, setEditPriceDisplay] = useState<string>('');

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/inventory');
      if (res.ok) {
        const data = await res.json();
        setUnits(data.inventory || []);
      }
    } catch (err) {
      console.error('Error fetching inventory:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus(unitId: string, status: InventoryStatus) {
    try {
      const res = await fetch('/api/inventory', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: unitId, status })
      });
      if (res.ok) {
        const data = await res.json();
        setUnits((prev) => prev.map((u) => (u.id === unitId ? data.unit : u)));
      }
    } catch (err) {
      console.error('Error updating unit status:', err);
    }
  }

  async function savePrice(unitId: string) {
    try {
      const res = await fetch('/api/inventory', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: unitId, price: editPrice, priceDisplay: editPriceDisplay })
      });
      if (res.ok) {
        const data = await res.json();
        setUnits((prev) => prev.map((u) => (u.id === unitId ? data.unit : u)));
        setEditingUnitId(null);
      }
    } catch (err) {
      console.error('Error saving price:', err);
    }
  }

  const filteredUnits = units.filter((unit) => {
    if (filterType !== 'ALL' && unit.type !== filterType) return false;
    if (filterStatus !== 'ALL' && unit.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!unit.unitCode.toLowerCase().includes(q) && !unit.block?.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#2C5E50] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>64-PLOT MASTER PLAN &amp; RESIDENCES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900">
            Inventory &amp; Unit Availability Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time status management. Changes reflect immediately on the 3D Masterplan and Unit Visualizer.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Plot / Unit ID (e.g. PLOT-A-01, UNIT-G-01)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#2C5E50]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'PLOT', 'STUDIO_SUITE', '1_BHK_RESIDENCE', '2_BHK_SUITE'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filterType === t ? 'bg-[#2C5E50] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'AVAILABLE', 'HOLD', 'RESERVED', 'SOLD'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filterStatus === s ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredUnits.map((unit) => {
          const isEditing = editingUnitId === unit.id;
          return (
            <div
              key={unit.id}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold font-mono text-slate-900">{unit.unitCode}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      unit.status === 'AVAILABLE'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : unit.status === 'HOLD'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : unit.status === 'RESERVED'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {unit.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Type:</span>
                    <span className="font-bold text-slate-900">{unit.type.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dimension:</span>
                    <span className="font-mono text-slate-800">{unit.areaSqYd ? `${unit.areaSqYd} Sq. Yd.` : `${unit.areaSqFt} Sq. Ft.`}</span>
                  </div>
                  {unit.floorLevel && (
                    <div className="flex items-center justify-between">
                      <span>Floor:</span>
                      <span className="capitalize font-mono text-slate-800">{unit.floorLevel}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Facing:</span>
                    <span className="text-slate-800">{unit.facing}</span>
                  </div>
                </div>

                {/* Price Display / Editor */}
                <div className="pt-2 border-t border-slate-100">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="e.g. ₹27.00 Lakh"
                        value={editPriceDisplay}
                        onChange={(e) => setEditPriceDisplay(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-[#2C5E50]"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => savePrice(unit.id)}
                          className="flex-1 py-1 rounded-lg bg-[#2C5E50] hover:bg-[#234b40] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setEditingUnitId(null)}
                          className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#2C5E50] font-mono">{unit.priceDisplay}</span>
                      <button
                        onClick={() => {
                          setEditingUnitId(unit.id);
                          setEditPrice(unit.price);
                          setEditPriceDisplay(unit.priceDisplay);
                        }}
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Quick Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                {(['AVAILABLE', 'HOLD', 'RESERVED', 'SOLD'] as InventoryStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateStatus(unit.id, st)}
                    className={`flex-1 py-1 rounded-lg text-[9px] font-mono font-bold transition-colors cursor-pointer ${
                      unit.status === st
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

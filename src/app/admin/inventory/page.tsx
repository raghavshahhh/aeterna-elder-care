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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-heading font-bold text-white">
            Inventory &amp; Unit Availability
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Real-time status management. Changes reflect immediately on the 3D Masterplan and Unit Visualizer.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-[#091B20] border border-white/10">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Plot / Unit ID (e.g. PLOT-A-01, UNIT-G-01)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#C58F58]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'PLOT', 'STUDIO_SUITE', '1_BHK_RESIDENCE', '2_BHK_SUITE'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                filterType === t ? 'bg-[#2C5E50] text-white shadow-md' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
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
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                filterStatus === s ? 'bg-[#C58F58] text-white shadow-md' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
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
              className="p-5 rounded-2xl bg-[#091B20] border border-white/10 space-y-4 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold font-mono text-white">{unit.unitCode}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      unit.status === 'AVAILABLE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : unit.status === 'HOLD'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : unit.status === 'RESERVED'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {unit.status}
                  </span>
                </div>

                <div className="text-xs text-white/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Type:</span>
                    <span className="font-bold text-white">{unit.type.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dimension:</span>
                    <span className="font-mono">{unit.areaSqYd ? `${unit.areaSqYd} Sq. Yd.` : `${unit.areaSqFt} Sq. Ft.`}</span>
                  </div>
                  {unit.floorLevel && (
                    <div className="flex items-center justify-between">
                      <span>Floor:</span>
                      <span className="capitalize font-mono">{unit.floorLevel}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Facing:</span>
                    <span>{unit.facing}</span>
                  </div>
                </div>

                {/* Price Display / Editor */}
                <div className="pt-2 border-t border-white/10">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="e.g. ₹27.00 Lakh"
                        value={editPriceDisplay}
                        onChange={(e) => setEditPriceDisplay(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-mono"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => savePrice(unit.id)}
                          className="flex-1 py-1 rounded-lg bg-[#2C5E50] text-white text-xs font-bold flex items-center justify-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setEditingUnitId(null)}
                          className="px-2 py-1 rounded-lg bg-white/10 text-white text-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#E0AB77] font-mono">{unit.priceDisplay}</span>
                      <button
                        onClick={() => {
                          setEditingUnitId(unit.id);
                          setEditPrice(unit.price);
                          setEditPriceDisplay(unit.priceDisplay);
                        }}
                        className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Quick Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                {(['AVAILABLE', 'HOLD', 'RESERVED', 'SOLD'] as InventoryStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateStatus(unit.id, st)}
                    className={`flex-1 py-1 rounded-lg text-[9px] font-mono font-bold transition-colors ${
                      unit.status === st
                        ? 'bg-white/20 text-white ring-1 ring-white/40'
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
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

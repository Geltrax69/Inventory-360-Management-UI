import React, { useState } from 'react';
import { Map, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';

const utilColor = (pct) => {
  if (pct >= 95) return 'var(--danger)';
  if (pct >= 85) return 'var(--warning)';
  return 'var(--accent)';
};

const ZonesBins = () => {
  const zones = useStore((s) => s.zones);
  const addZone = useStore((s) => s.addZone);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', bins: '', used: '', capacity: '' });

  const handleSave = (e) => {
    e.preventDefault();
    const used = parseInt(form.used) || 0;
    const cap = parseInt(form.capacity) || 1;
    addZone({
      id: Date.now(),
      name: form.name,
      bins: parseInt(form.bins) || 0,
      used,
      capacity: cap,
      utilization: Math.round((used / cap) * 100),
    });
    setIsOpen(false);
    setForm({ name: '', bins: '', used: '', capacity: '' });
  };

  return (
    <div className="view-container">
      <div className="view-header reveal-animation" style={{ '--animation-order': 1 }}>
        <div>
          <h2 className="view-title">Zones &amp; Bins</h2>
          <p className="view-subtitle">Warehouse topography and capacity utilization</p>
        </div>
        <div className="view-actions">
          <button className="btn-secondary"><Map size={16} /> View Map</button>
          <button className="btn-primary" onClick={() => setIsOpen(true)}><Plus size={16} /> Add Zone</button>
        </div>
      </div>

      <div className="zones-grid reveal-animation" style={{ '--animation-order': 2 }}>
        {zones.map((zone, i) => {
          const color = utilColor(zone.utilization);
          return (
            <div key={zone.id} className="card zone-card reveal-animation" style={{ '--animation-order': i + 3 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div className="font-medium" style={{ fontSize: '16px', marginBottom: '4px' }}>{zone.name}</div>
                  <div className="text-muted text-sm">{zone.bins} Bins</div>
                </div>
                <span className="badge-neutral">{zone.bins} Bins</span>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="text-muted text-sm">Utilization</span>
                  <span className="font-medium" style={{ color }}>{zone.utilization}%</span>
                </div>
                <div className="progress-bar-bg" style={{ height: '8px', borderRadius: '8px' }}>
                  <div style={{ width: `${zone.utilization}%`, height: '100%', background: color, borderRadius: '8px', transition: 'width 1s ease' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                <div>
                  <div className="text-muted text-sm" style={{ marginBottom: '2px' }}>Used Capacity</div>
                  <div className="font-medium">{zone.used.toLocaleString()} units</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="text-muted text-sm" style={{ marginBottom: '2px' }}>Total Capacity</div>
                  <div className="font-medium">{zone.capacity.toLocaleString()} units</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Zone"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setIsOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>Add Zone</button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Zone Name</label>
          <input className="form-input" placeholder="e.g. Zone E - Cold Storage" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Number of Bins</label>
          <input className="form-input" type="number" min={1} placeholder="e.g. 50" value={form.bins} onChange={e => setForm({ ...form, bins: e.target.value })} />
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Current Used (units)</label>
            <input className="form-input" type="number" min={0} placeholder="e.g. 200" value={form.used} onChange={e => setForm({ ...form, used: e.target.value })} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Total Capacity (units)</label>
            <input className="form-input" type="number" min={1} placeholder="e.g. 1000" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ZonesBins;

import React, { useState } from 'react';
import { Plus, ChevronDown, ArrowRight } from 'lucide-react';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';

const Transfers = () => {
  const transfers = useStore((s) => s.transfers);
  const addTransfer = useStore((s) => s.addTransfer);
  const skus = useStore((s) => s.skus);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ sku: '', source: '', dest: '', qty: '' });

  const filtered = transfers.filter(t => {
    const matchSearch = !search || t.transferId.includes(search) || t.source.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status.toLowerCase().includes(statusFilter);
    return matchSearch && matchStatus;
  });

  const handleSave = (e) => {
    e.preventDefault();
    addTransfer({
      id: Date.now(),
      transferId: `TRF-${Math.floor(Math.random() * 900 + 100)}`,
      source: form.source,
      dest: form.dest,
      qty: parseInt(form.qty) || 0,
      status: 'In Transit',
    });
    setIsOpen(false);
    setForm({ sku: '', source: '', dest: '', qty: '' });
  };

  return (
    <div className="view-container">
      <div className="view-header reveal-animation" style={{ '--animation-order': 1 }}>
        <div>
          <h2 className="view-title">Transfers</h2>
          <p className="view-subtitle">Track stock moving between warehouse locations</p>
        </div>
        <button className="btn-primary" onClick={() => setIsOpen(true)}><Plus size={16} /> Create Transfer</button>
      </div>

      <div className="view-filters reveal-animation" style={{ '--animation-order': 2 }}>
        <div className="search-bar">
          <input type="text" placeholder="Search by Transfer ID or Location..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="select-wrap">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="transit">In Transit</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>
          <ChevronDown className="chevron" size={16} />
        </div>
      </div>

      <div className="table-container reveal-animation" style={{ '--animation-order': 3 }}>
        <table className="data-table">
          <thead>
            <tr><th>Transfer ID</th><th>Route</th><th>Items</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item.id} className="interactive-row reveal-animation" style={{ '--animation-order': i + 4 }}>
                <td className="font-mono text-sm">{item.transferId}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500 }}>
                    {item.source} <ArrowRight size={14} className="text-muted" /> {item.dest}
                  </div>
                </td>
                <td>{item.qty} SKUs</td>
                <td><span className="badge-warning">{item.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>Approve</button>
                    <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>Mark Received</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Transfer"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setIsOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>Create Transfer</button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">SKU / Product</label>
          <select className="form-input" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })}>
            <option value="">Select SKU...</option>
            {skus.map(s => <option key={s.id} value={s.code}>{s.name} ({s.code})</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">From Location</label>
            <input className="form-input" placeholder="e.g. Warehouse A" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} />
          </div>
          <ArrowRight size={20} style={{ color: 'var(--text-muted)', marginTop: '8px', flexShrink: 0 }} />
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">To Location</label>
            <input className="form-input" placeholder="e.g. HQ Store" value={form.dest} onChange={e => setForm({ ...form, dest: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input className="form-input" type="number" min={1} placeholder="e.g. 25" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
};

export default Transfers;

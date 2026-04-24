import React, { useState } from 'react';
import { Plus, ChevronDown, Download, ArrowRightLeft } from 'lucide-react';
import Modal from '../common/Modal';
import Pagination from '../common/Pagination';
import useStore from '../../store/useStore';

const PAGE_SIZE = 8;

const StockMovement = () => {
  const movements = useStore((s) => s.movements);
  const addMovement = useStore((s) => s.addMovement);
  const skus = useStore((s) => s.skus);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ sku: '', type: 'Inbound', qty: '', ref: '' });

  const filtered = movements.filter(m => {
    const matchSearch = !search || m.ref.toLowerCase().includes(search.toLowerCase()) || m.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || m.type.toLowerCase() === typeFilter;
    return matchSearch && matchType;
  });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (setter) => (e) => { setter(e.target.value); setPage(1); };

  const handleSave = (e) => {
    e.preventDefault();
    const target = skus.find(s => s.code === form.sku);
    const qty = form.type === 'Outbound' ? -Math.abs(parseInt(form.qty)) : Math.abs(parseInt(form.qty));
    addMovement({
      id: Date.now(),
      date: `${new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })} (now)`,
      ref: form.ref || `TRX-${Math.floor(Math.random() * 9000 + 1000)}`,
      sku: form.sku,
      name: target?.name || 'Unknown',
      type: form.type,
      qty,
      user: 'Sasha Merkel',
    });
    setIsOpen(false);
    setForm({ sku: '', type: 'Inbound', qty: '', ref: '' });
  };

  return (
    <div className="view-container">
      <div className="view-header reveal-animation" style={{ '--animation-order': 1 }}>
        <div>
          <h2 className="view-title">Stock Movement</h2>
          <p className="view-subtitle">Audit trail of all inbound and outbound transactions · {movements.length} records</p>
        </div>
        <div className="view-actions">
          <button className="btn-secondary"><Download size={16} /> Export Log</button>
          <button className="btn-primary" onClick={() => setIsOpen(true)}><ArrowRightLeft size={16} /> Record Movement</button>
        </div>
      </div>

      <div className="view-filters reveal-animation" style={{ '--animation-order': 2 }}>
        <div className="search-bar">
          <input type="text" placeholder="Search by SKU, product, reference ID..." value={search} onChange={handleFilterChange(setSearch)} />
        </div>
        <div className="select-wrap">
          <select value={typeFilter} onChange={handleFilterChange(setTypeFilter)}>
            <option value="all">All Types</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
          <ChevronDown className="chevron" size={16} />
        </div>
      </div>

      <div className="table-container reveal-animation" style={{ '--animation-order': 3 }}>
        <table className="data-table">
          <thead>
            <tr><th>Date / Time</th><th>Reference ID</th><th>SKU / Product</th><th>Type</th><th>Qty Change</th><th>User</th></tr>
          </thead>
          <tbody>
            {paginated.map((item, i) => (
              <tr key={item.id} className="interactive-row reveal-animation" style={{ '--animation-order': i + 4 }}>
                <td className="text-sm text-muted">{item.date}</td>
                <td className="font-mono text-sm">{item.ref}</td>
                <td>
                  <div className="font-medium">{item.name}</div>
                  <div className="font-mono text-sm text-muted">{item.sku}</div>
                </td>
                <td>{item.type === 'Inbound' ? <span className="badge-success">Inbound</span> : <span className="badge-danger">Outbound</span>}</td>
                <td>
                  <span style={{ fontWeight: 700, color: item.qty > 0 ? 'var(--accent)' : 'var(--danger)', fontFamily: 'monospace' }}>
                    {item.qty > 0 ? '+' : ''}{item.qty}
                  </span>
                </td>
                <td className="text-sm">{item.user}</td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>No movement records match your filters.</td></tr>
            )}
          </tbody>
        </table>
        <Pagination currentPage={page} totalItems={filtered.length} itemsPerPage={PAGE_SIZE} onPageChange={setPage} />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Record Stock Movement"
        footer={<><button className="btn-secondary" onClick={() => setIsOpen(false)}>Cancel</button><button className="btn-primary" onClick={handleSave}>Record</button></>}
      >
        <div className="form-group">
          <label className="form-label">SKU / Product</label>
          <select className="form-input" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })}>
            <option value="">Select SKU...</option>
            {skus.map(s => <option key={s.id} value={s.code}>{s.name} ({s.code})</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Type</label>
            <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="Inbound">Inbound</option>
              <option value="Outbound">Outbound</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Quantity</label>
            <input className="form-input" type="number" min={1} placeholder="e.g. 24" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Reference ID (optional)</label>
          <input className="form-input" placeholder="e.g. TRX-9999" value={form.ref} onChange={e => setForm({ ...form, ref: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
};

export default StockMovement;

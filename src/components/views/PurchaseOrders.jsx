import React, { useState } from 'react';
import { Plus, ChevronDown, Download, CheckCircle, Clock } from 'lucide-react';
import Modal from '../common/Modal';
import Pagination from '../common/Pagination';
import useStore from '../../store/useStore';

const PAGE_SIZE = 6;

const PurchaseOrders = () => {
  const pos = useStore((s) => s.pos);
  const addPO = useStore((s) => s.addPO);
  const skus = useStore((s) => s.skus);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ vendor: '', sku: '', qty: '', expectedDate: '' });

  const filtered = pos.filter(p => {
    const matchSearch = !search || p.poId.includes(search) || p.vendor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter;
    return matchSearch && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleFilterChange = (setter) => (e) => { setter(e.target.value); setPage(1); };

  const handleSave = (e) => {
    e.preventDefault();
    addPO({
      id: Date.now(),
      poId: `PO-2026-${String(pos.length + 1).padStart(3, '0')}`,
      vendor: form.vendor,
      qty: parseInt(form.qty) || 0,
      status: 'Draft',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    setIsOpen(false);
    setForm({ vendor: '', sku: '', qty: '', expectedDate: '' });
  };

  const statusBadge = (status) => {
    if (status === 'Shipped') return <span className="badge-warning"><Clock size={11} style={{ marginRight: '4px', display: 'inline' }} />Shipped</span>;
    if (status === 'Received') return <span className="badge-success"><CheckCircle size={11} style={{ marginRight: '4px', display: 'inline' }} />Received</span>;
    return <span className="badge-neutral">Draft</span>;
  };

  return (
    <div className="view-container">
      <div className="view-header reveal-animation" style={{ '--animation-order': 1 }}>
        <div>
          <h2 className="view-title">Purchase Orders</h2>
          <p className="view-subtitle">Manage PO lifecycle: Draft → Shipped → Received</p>
        </div>
        <div className="view-actions">
          <button className="btn-secondary"><Download size={16} /> Export</button>
          <button className="btn-primary" onClick={() => setIsOpen(true)}><Plus size={16} /> Create PO</button>
        </div>
      </div>

      <div className="view-filters reveal-animation" style={{ '--animation-order': 2 }}>
        <div className="search-bar">
          <input type="text" placeholder="Search by PO ID, Vendor..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="select-wrap">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="shipped">Shipped</option>
            <option value="received">Received</option>
          </select>
          <ChevronDown className="chevron" size={16} />
        </div>
      </div>

      <div className="table-container reveal-animation" style={{ '--animation-order': 3 }}>
        <table className="data-table">
          <thead>
            <tr><th>PO ID</th><th>Vendor</th><th>Total Qty</th><th>Status</th><th>Date Created</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {paginated.map((item, i) => (
              <tr key={item.id} className="interactive-row reveal-animation" style={{ '--animation-order': i + 4 }}>
                <td className="font-mono text-sm">{item.poId}</td>
                <td className="font-medium">{item.vendor}</td>
                <td>{item.qty} items</td>
                <td>{statusBadge(item.status)}</td>
                <td className="text-sm">{item.date}</td>
                <td><button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={page} totalItems={filtered.length} itemsPerPage={PAGE_SIZE} onPageChange={setPage} />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Purchase Order"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setIsOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>Create PO</button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Vendor Name</label>
          <input className="form-input" placeholder="e.g. Apple Inc." value={form.vendor} onChange={e => setForm({ ...form, vendor: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">SKU / Product</label>
          <select className="form-input" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })}>
            <option value="">Select SKU...</option>
            {skus.map(s => <option key={s.id} value={s.code}>{s.name} ({s.code})</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Order Quantity</label>
            <input className="form-input" type="number" min={1} placeholder="e.g. 500" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Expected Date</label>
            <input className="form-input" type="date" value={form.expectedDate} onChange={e => setForm({ ...form, expectedDate: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PurchaseOrders;

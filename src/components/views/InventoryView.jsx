import React, { useState } from 'react';
import { Plus, ArrowRightLeft, MoveDiagonal, AlertCircle, ChevronDown, SlidersHorizontal } from 'lucide-react';
import Modal from '../common/Modal';
import Pagination from '../common/Pagination';
import useStore from '../../store/useStore';

const PAGE_SIZE = 8;

const InventoryView = () => {
  const inventory = useStore((s) => s.inventory);
  const adjustInventory = useStore((s) => s.adjustInventory);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [adjustForm, setAdjustForm] = useState({ sku: '', qtyChange: '', reason: 'Count Discrepancy' });
  const [moveForm, setMoveForm] = useState({ sku: '', fromBin: '', toBin: '', qty: '' });

  const filtered = inventory.filter(item => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchLocation = locationFilter === 'all' || item.location === locationFilter;
    const matchStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter;
    return matchSearch && matchLocation && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalQty = inventory.reduce((s, i) => s + i.qty, 0);
  const lowStock = inventory.filter(i => i.qty < 50).length;
  const damaged = inventory.filter(i => i.status === 'Damaged');

  const handleFilterChange = (setter) => (e) => { setter(e.target.value); setPage(1); };

  const handleAdjust = (e) => {
    e.preventDefault();
    adjustInventory(adjustForm.sku, parseInt(adjustForm.qtyChange), adjustForm.reason);
    setIsAdjustOpen(false);
    setAdjustForm({ sku: '', qtyChange: '', reason: 'Count Discrepancy' });
  };

  const statusBadge = (s) => {
    if (s === 'Sellable') return <span className="badge-success">{s}</span>;
    if (s === 'Damaged') return <span className="badge-danger">{s}</span>;
    return <span className="badge-warning">{s}</span>;
  };

  return (
    <div className="view-container">
      <div className="view-header reveal-animation" style={{ '--animation-order': 1 }}>
        <div>
          <h2 className="view-title">Inventory View</h2>
          <p className="view-subtitle">Track stock locations, batches, and health · {inventory.length} stock lines</p>
        </div>
        <div className="view-actions">
          <button className="btn-secondary" onClick={() => setIsAdjustOpen(true)}><ArrowRightLeft size={16} /> Adjust Stock</button>
          <button className="btn-primary" onClick={() => setIsMoveOpen(true)}><MoveDiagonal size={16} /> Move Stock</button>
        </div>
      </div>

      <div className="inventory-stats-bar reveal-animation" style={{ '--animation-order': 2 }}>
        <div className="stat-pill">Total Items: <strong>{totalQty.toLocaleString('en-IN')}</strong></div>
        <div className="stat-pill warning"><AlertCircle size={14} /> Low Stock: <strong>{lowStock} SKUs</strong></div>
        <div className="stat-pill danger"><AlertCircle size={14} /> Damaged: <strong>{damaged.reduce((s, i) => s + i.qty, 0)} items</strong></div>
      </div>

      <div className="view-filters reveal-animation" style={{ '--animation-order': 3, marginTop: '24px' }}>
        <div className="search-bar">
          <input type="text" placeholder="Search by SKU or product name..." value={search} onChange={handleFilterChange(setSearch)} />
        </div>
        <div className="select-wrap">
          <select value={locationFilter} onChange={handleFilterChange(setLocationFilter)}>
            <option value="all">All Locations</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
            <option value="Warehouse C">Warehouse C</option>
          </select>
          <ChevronDown className="chevron" size={16} />
        </div>
        <div className="select-wrap">
          <select value={statusFilter} onChange={handleFilterChange(setStatusFilter)}>
            <option value="all">All Statuses</option>
            <option value="sellable">Sellable</option>
            <option value="damaged">Damaged</option>
            <option value="quarantine">Quarantine</option>
          </select>
          <ChevronDown className="chevron" size={16} />
        </div>
        <button className="btn-icon"><SlidersHorizontal size={16} /> More Filters</button>
      </div>

      <div className="table-container reveal-animation" style={{ '--animation-order': 4 }}>
        <table className="data-table">
          <thead>
            <tr><th>SKU / Product</th><th>Location (Zone/Bin)</th><th>Batch / Expiry</th><th>Quantity</th><th>Status</th></tr>
          </thead>
          <tbody>
            {paginated.map((item, i) => (
              <tr key={item.id} className="interactive-row reveal-animation" style={{ '--animation-order': i + 5 }}>
                <td>
                  <div className="font-medium">{item.name}</div>
                  <div className="font-mono text-sm text-muted">{item.sku}</div>
                </td>
                <td>
                  <div>{item.location}</div>
                  <div className="text-sm text-muted">{item.bin}</div>
                </td>
                <td>
                  <div className="font-mono text-sm">{item.batch}</div>
                  <div className="text-sm text-muted">Exp: {item.expiry}</div>
                </td>
                <td>
                  <div className="font-medium" style={{ marginBottom: '6px' }}>{item.qty.toLocaleString('en-IN')}</div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${Math.min((item.qty / 1200) * 100, 100)}%`, background: item.qty < 50 ? 'var(--danger)' : item.qty < 100 ? 'var(--warning)' : 'var(--accent)' }} />
                  </div>
                </td>
                <td>{statusBadge(item.status)}</td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>No inventory matches your filters.</td></tr>
            )}
          </tbody>
        </table>
        <Pagination currentPage={page} totalItems={filtered.length} itemsPerPage={PAGE_SIZE} onPageChange={setPage} />
      </div>

      <Modal isOpen={isAdjustOpen} onClose={() => setIsAdjustOpen(false)} title="Adjust Stock Quantity"
        footer={<><button className="btn-secondary" onClick={() => setIsAdjustOpen(false)}>Cancel</button><button className="btn-primary" onClick={handleAdjust}>Confirm Adjustment</button></>}
      >
        <div className="form-group">
          <label className="form-label">Target SKU</label>
          <select className="form-input" value={adjustForm.sku} onChange={e => setAdjustForm({ ...adjustForm, sku: e.target.value })}>
            <option value="">Select SKU...</option>
            {inventory.filter(i => i.status !== 'Damaged').map(i => <option key={i.id} value={i.sku}>{i.sku} — {i.name} (Qty: {i.qty})</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Adjustment Quantity (+/-)</label>
          <input className="form-input" type="number" placeholder="e.g. -12 or +50" value={adjustForm.qtyChange} onChange={e => setAdjustForm({ ...adjustForm, qtyChange: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Reason Code</label>
          <select className="form-input" value={adjustForm.reason} onChange={e => setAdjustForm({ ...adjustForm, reason: e.target.value })}>
            <option>Count Discrepancy</option><option>Damaged Stock</option><option>Found Stock</option><option>Theft / Loss</option><option>Return</option>
          </select>
        </div>
      </Modal>

      <Modal isOpen={isMoveOpen} onClose={() => setIsMoveOpen(false)} title="Move Stock Between Locations"
        footer={<><button className="btn-secondary" onClick={() => setIsMoveOpen(false)}>Cancel</button><button className="btn-primary" onClick={() => setIsMoveOpen(false)}>Confirm Move</button></>}
      >
        <div className="form-group">
          <label className="form-label">SKU to Move</label>
          <select className="form-input" value={moveForm.sku} onChange={e => setMoveForm({ ...moveForm, sku: e.target.value })}>
            <option value="">Select SKU...</option>
            {inventory.map(i => <option key={i.id} value={i.sku}>{i.sku} — {i.name}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">From Bin</label>
            <input className="form-input" placeholder="e.g. Zone 4, Bin 12" value={moveForm.fromBin} onChange={e => setMoveForm({ ...moveForm, fromBin: e.target.value })} />
          </div>
          <div style={{ paddingTop: '8px', color: 'var(--text-muted)', fontWeight: 700 }}>→</div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">To Bin</label>
            <input className="form-input" placeholder="e.g. Zone 2, Bin 05" value={moveForm.toBin} onChange={e => setMoveForm({ ...moveForm, toBin: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Quantity to Move</label>
          <input className="form-input" type="number" min={1} placeholder="e.g. 50" value={moveForm.qty} onChange={e => setMoveForm({ ...moveForm, qty: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
};

export default InventoryView;

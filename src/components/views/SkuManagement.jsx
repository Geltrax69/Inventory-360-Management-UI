import React, { useState } from 'react';
import { Plus, Filter, Download, MoreHorizontal, ChevronDown } from 'lucide-react';
import Modal from '../common/Modal';
import Pagination from '../common/Pagination';
import useStore from '../../store/useStore';
import { formatINR } from '../../utils/currency';

const PAGE_SIZE = 8;

const SkuManagement = () => {
  const skus = useStore((s) => s.skus);
  const addSku = useStore((s) => s.addSku);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({ code: '', name: '', category: 'Electronics', variants: 1, sellPrice: '', costPrice: '', status: 'Active' });

  const filtered = skus.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || s.category === categoryFilter;
    const matchStatus = statusFilter === 'all' || s.status.toLowerCase() === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (setter) => (e) => { setter(e.target.value); setPage(1); };

  const handleCreateSku = (e) => {
    e.preventDefault();
    addSku({ id: Date.now(), ...formData, variants: parseInt(formData.variants) || 1, sellPrice: parseFloat(formData.sellPrice) || 0, costPrice: parseFloat(formData.costPrice) || 0 });
    setIsModalOpen(false);
    setFormData({ code: '', name: '', category: 'Electronics', variants: 1, sellPrice: '', costPrice: '', status: 'Active' });
  };

  return (
    <div className="view-container">
      <div className="view-header reveal-animation" style={{ '--animation-order': 1 }}>
        <div>
          <h2 className="view-title">SKU Management</h2>
          <p className="view-subtitle">Manage products, variants, and pricing · {filtered.length} SKUs</p>
        </div>
        <div className="view-actions">
          <button className="btn-secondary"><Download size={16} /> Export</button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}><Plus size={16} /> Create SKU</button>
        </div>
      </div>

      <div className="view-filters reveal-animation" style={{ '--animation-order': 2 }}>
        <div className="search-bar">
          <input type="text" placeholder="Search by SKU name or code..." value={search} onChange={handleFilterChange(setSearch)} />
        </div>
        <div className="select-wrap">
          <select value={categoryFilter} onChange={handleFilterChange(setCategoryFilter)}>
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Computers">Computers</option>
            <option value="Accessories">Accessories</option>
            <option value="Wearables">Wearables</option>
            <option value="Audio">Audio</option>
          </select>
          <ChevronDown className="chevron" size={16} />
        </div>
        <div className="select-wrap">
          <select value={statusFilter} onChange={handleFilterChange(setStatusFilter)}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <ChevronDown className="chevron" size={16} />
        </div>
        <button className="btn-icon"><Filter size={16} /> Filters</button>
      </div>

      <div className="table-container reveal-animation" style={{ '--animation-order': 3 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>SKU Code</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Variants</th>
              <th>Sell Price</th>
              <th>Cost Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, index) => (
              <tr key={item.id} className="interactive-row reveal-animation" style={{ '--animation-order': index + 4 }}>
                <td className="font-mono text-sm">{item.code}</td>
                <td className="font-medium">{item.name}</td>
                <td>{item.category}</td>
                <td><span className="badge-neutral">{item.variants} variants</span></td>
                <td className="font-medium">{formatINR(item.sellPrice)}</td>
                <td className="text-muted">{formatINR(item.costPrice)}</td>
                <td><span className={item.status === 'Active' ? 'badge-success' : 'badge-neutral'}>{item.status}</span></td>
                <td><button className="btn-icon-only"><MoreHorizontal size={16} /></button></td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>No SKUs match your filters.</td></tr>
            )}
          </tbody>
        </table>
        <Pagination currentPage={page} totalItems={filtered.length} itemsPerPage={PAGE_SIZE} onPageChange={setPage} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New SKU"
        footer={<><button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button><button className="btn-primary" onClick={handleCreateSku}>Save SKU</button></>}
      >
        <div className="form-group">
          <label className="form-label">SKU Code</label>
          <input className="form-input" name="code" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} placeholder="e.g. SKU-1026" />
        </div>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input className="form-input" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. iPad Air 5" />
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Category</label>
            <select className="form-input" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
              <option>Electronics</option><option>Computers</option><option>Accessories</option><option>Wearables</option><option>Audio</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Variants</label>
            <input className="form-input" type="number" value={formData.variants} onChange={e => setFormData({ ...formData, variants: e.target.value })} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Selling Price (₹)</label>
            <input className="form-input" type="number" value={formData.sellPrice} onChange={e => setFormData({ ...formData, sellPrice: e.target.value })} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Cost Price (₹)</label>
            <input className="form-input" type="number" value={formData.costPrice} onChange={e => setFormData({ ...formData, costPrice: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SkuManagement;

import React, { useState } from 'react';
import { Plus, ArrowRight, ChevronDown } from 'lucide-react';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';
import { formatINR } from '../../utils/currency';

const Bundles = () => {
  const bundles = useStore((s) => s.bundles);
  const addBundle = useStore((s) => s.addBundle);
  const skus = useStore((s) => s.skus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewRecipe, setViewRecipe] = useState(null);
  const [form, setForm] = useState({ name: '', code: '', component1: '', qty1: 1, component2: '', qty2: 1, price: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    const comp1 = skus.find(s => s.code === form.component1);
    const comp2 = skus.find(s => s.code === form.component2);
    const cost = ((comp1?.costPrice || 0) * form.qty1) + ((comp2?.costPrice || 0) * form.qty2);
    addBundle({
      id: Date.now(),
      name: form.name,
      code: form.code,
      components: [
        form.component1 ? `${form.qty1}x ${comp1?.name || form.component1}` : null,
        form.component2 ? `${form.qty2}x ${comp2?.name || form.component2}` : null,
      ].filter(Boolean),
      cost: parseFloat(cost.toFixed(2)),
      price: parseFloat(form.price) || 0,
    });
    setIsModalOpen(false);
    setForm({ name: '', code: '', component1: '', qty1: 1, component2: '', qty2: 1, price: '' });
  };

  return (
    <div className="view-container">
      <div className="view-header reveal-animation" style={{ '--animation-order': 1 }}>
        <div>
          <h2 className="view-title">Bundles &amp; Recipes</h2>
          <p className="view-subtitle">Combine multiple SKUs into a single sellable product</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}><Plus size={16} /> Create Bundle</button>
      </div>

      <div className="table-container reveal-animation" style={{ '--animation-order': 2 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Bundle Name</th>
              <th>Components (SKUs)</th>
              <th>Bundle Cost</th>
              <th>Selling Price</th>
              <th>Margin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bundles.map((b, i) => (
              <tr key={b.id} className="interactive-row reveal-animation" style={{ '--animation-order': i + 3 }}>
                <td>
                  <div className="font-medium">{b.name}</div>
                  <div className="font-mono text-sm text-muted">{b.code}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {b.components.map((c, ci) => <span key={ci} className="badge-neutral">{c}</span>)}
                  </div>
                </td>
                <td>{formatINR(b.cost)}</td>
                <td>{formatINR(b.price)}</td>
                <td>
                  <span className="badge-success">
                    {b.price > 0 ? `${(((b.price - b.cost) / b.price) * 100).toFixed(0)}%` : '—'}
                  </span>
                </td>
                <td>
                  <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }} onClick={() => setViewRecipe(b)}>
                    View Recipe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Bundle Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Bundle"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleCreate}>Save Bundle</button>
          </>
        }
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Bundle Name</label>
            <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Starter Kit Pro" />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Bundle Code</label>
            <input className="form-input" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="e.g. BNDL-002" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Component 1</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select className="form-input" style={{ flex: 3 }} value={form.component1} onChange={e => setForm({ ...form, component1: e.target.value })}>
              <option value="">Select SKU...</option>
              {skus.map(s => <option key={s.id} value={s.code}>{s.name} ({s.code})</option>)}
            </select>
            <input className="form-input" style={{ flex: 1 }} type="number" value={form.qty1} min={1} onChange={e => setForm({ ...form, qty1: parseInt(e.target.value) })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Component 2 (optional)</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select className="form-input" style={{ flex: 3 }} value={form.component2} onChange={e => setForm({ ...form, component2: e.target.value })}>
              <option value="">Select SKU...</option>
              {skus.map(s => <option key={s.id} value={s.code}>{s.name} ({s.code})</option>)}
            </select>
            <input className="form-input" style={{ flex: 1 }} type="number" value={form.qty2} min={1} onChange={e => setForm({ ...form, qty2: parseInt(e.target.value) })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Selling Price ($)</label>
          <input className="form-input" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="e.g. 1299.00" />
        </div>
      </Modal>

      {/* View Recipe Modal */}
      <Modal isOpen={!!viewRecipe} onClose={() => setViewRecipe(null)} title={`Recipe: ${viewRecipe?.name}`}
        footer={<button className="btn-secondary" onClick={() => setViewRecipe(null)}>Close</button>}
      >
        {viewRecipe && (
          <>
            <div className="form-group">
              <label className="form-label">Components</label>
              {viewRecipe.components.map((c, i) => (
                <div key={i} style={{ padding: '12px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="font-medium">{c}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(189,255,66,0.06)', borderRadius: '10px', border: '1px solid rgba(189,255,66,0.2)' }}>
              <span className="text-muted">Total Cost</span>
              <strong>{formatINR(viewRecipe.cost)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <span className="text-muted">Selling Price</span>
              <strong style={{ color: 'var(--accent)' }}>{formatINR(viewRecipe.price)}</strong>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Bundles;

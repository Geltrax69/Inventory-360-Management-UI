import React, { useState } from 'react';
import { Plus, ArrowRight, Edit2, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';
import useStore from '../../store/useStore';

const defaultForm = { source: '', sourceCode: '', target: '', targetCode: '', fromQty: 1, toQty: 1 };

const Conversions = () => {
  const conversions = useStore((s) => s.conversions);
  const addConversion = useStore((s) => s.addConversion);
  const skus = useStore((s) => s.skus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const openNew = () => { setEditItem(null); setForm(defaultForm); setIsModalOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ source: item.source, sourceCode: item.sourceCode, target: item.target, targetCode: item.targetCode, fromQty: 1, toQty: parseInt(item.ratio.split(':')[1].trim()) });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const src = skus.find(s => s.code === form.sourceCode);
    const tgt = skus.find(s => s.code === form.targetCode);
    addConversion({
      id: Date.now(),
      source: src?.name || form.source,
      sourceCode: form.sourceCode,
      path: `${form.fromQty} ${src?.name?.split(' ').pop() || 'Unit'} → ${form.toQty} ${tgt?.name?.split(' ').pop() || 'Unit'}`,
      target: tgt?.name || form.target,
      targetCode: form.targetCode,
      ratio: `${form.fromQty} : ${form.toQty}`,
    });
    setIsModalOpen(false);
    setForm(defaultForm);
  };

  return (
    <div className="view-container">
      <div className="view-header reveal-animation" style={{ '--animation-order': 1 }}>
        <div>
          <h2 className="view-title">SKU Conversions</h2>
          <p className="view-subtitle">Define multi-level conversion rules (e.g. Pallet → Case → Unit)</p>
        </div>
        <button className="btn-primary" onClick={openNew}><Plus size={16} /> New Rule</button>
      </div>

      <div className="table-container reveal-animation" style={{ '--animation-order': 2 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Source SKU</th>
              <th>Conversion Path</th>
              <th>Target SKU</th>
              <th>Ratio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {conversions.map((item, i) => (
              <tr key={item.id} className="interactive-row reveal-animation" style={{ '--animation-order': i + 3 }}>
                <td>
                  <div className="font-medium">{item.source}</div>
                  <div className="font-mono text-sm text-muted">{item.sourceCode}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge-neutral">{item.path.split('→')[0].trim()}</span>
                    <ArrowRight size={14} className="text-muted" />
                    <span className="badge-success">{item.path.split('→')[1]?.trim()}</span>
                  </div>
                </td>
                <td>
                  <div className="font-medium">{item.target}</div>
                  <div className="font-mono text-sm text-muted">{item.targetCode}</div>
                </td>
                <td className="font-mono">{item.ratio}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }} onClick={() => openEdit(item)}>
                      <Edit2 size={12} style={{ marginRight: '4px' }} />Edit Rule
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? 'Edit Conversion Rule' : 'New Conversion Rule'}
        footer={
          <>
            <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>Save Rule</button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Source SKU</label>
          <select className="form-input" value={form.sourceCode} onChange={e => setForm({ ...form, sourceCode: e.target.value })}>
            <option value="">Select source SKU...</option>
            {skus.map(s => <option key={s.id} value={s.code}>{s.name} ({s.code})</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Target SKU</label>
          <select className="form-input" value={form.targetCode} onChange={e => setForm({ ...form, targetCode: e.target.value })}>
            <option value="">Select target SKU...</option>
            {skus.map(s => <option key={s.id} value={s.code}>{s.name} ({s.code})</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">From Qty</label>
            <input className="form-input" type="number" min={1} value={form.fromQty} onChange={e => setForm({ ...form, fromQty: parseInt(e.target.value) })} />
          </div>
          <div style={{ paddingBottom: '10px', color: 'var(--text-muted)' }}><ArrowRight size={20} /></div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">To Qty</label>
            <input className="form-input" type="number" min={1} value={form.toQty} onChange={e => setForm({ ...form, toQty: parseInt(e.target.value) })} />
          </div>
        </div>
        <div style={{ padding: '12px', background: 'rgba(189,255,66,0.06)', borderRadius: '10px', border: '1px solid rgba(189,255,66,0.2)', fontSize: '13px', textAlign: 'center' }}>
          Conversion: <strong>{form.fromQty} Source</strong> → <strong style={{ color: 'var(--accent)' }}>{form.toQty} Target</strong>
        </div>
      </Modal>
    </div>
  );
};

export default Conversions;

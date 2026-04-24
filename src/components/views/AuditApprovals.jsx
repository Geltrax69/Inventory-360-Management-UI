import React from 'react';
import { ClipboardCheck, CheckCircle, XCircle, Clock } from 'lucide-react';

const AuditApprovals = () => {
  return (
    <div className="view-container reveal-animation" style={{ '--animation-order': 1 }}>
      <div className="view-header">
        <div>
          <h2 className="view-title">Audit & Approvals</h2>
          <p className="view-subtitle">Manage inventory audits and pending authorization requests</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{ flex: 1 }}>
          <div className="card-header">
            <h3 className="card-title">Pending Approvals</h3>
            <span className="badge-warning">3 Pending</span>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Req ID</th>
                  <th>Type</th>
                  <th>Requested By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="interactive-row">
                  <td className="font-mono text-sm">REQ-001</td>
                  <td>Stock Adjustment (-50 units)</td>
                  <td>Sarah Jenkins</td>
                  <td><span className="badge-warning">Pending</span></td>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-icon-only" style={{ color: 'var(--success)' }}><CheckCircle size={18} /></button>
                    <button className="btn-icon-only" style={{ color: 'var(--danger)' }}><XCircle size={18} /></button>
                  </td>
                </tr>
                <tr className="interactive-row">
                  <td className="font-mono text-sm">REQ-002</td>
                  <td>Price Change (AirPods Pro)</td>
                  <td>Mike Ross</td>
                  <td><span className="badge-success">Approved</span></td>
                  <td><span className="text-muted text-sm">Processed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ flex: 1 }}>
          <div className="card-header">
            <h3 className="card-title">Active Audits</h3>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>New Audit</button>
          </div>
          <div className="alerts-list">
            <div className="alert-item">
              <div className="alert-icon info"><ClipboardCheck size={16} /></div>
              <div className="alert-content" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4>Q2 Full Warehouse Audit</h4>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: '65%' }}></div></div>
                <p style={{ marginTop: '8px' }}>Assigned to: Team Alpha • Zone B & C</p>
              </div>
            </div>
            <div className="alert-item">
              <div className="alert-icon warning"><Clock size={16} /></div>
              <div className="alert-content" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4>High-Value Items Check</h4>
                  <span className="text-sm font-medium">10%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: '10%' }}></div></div>
                <p style={{ marginTop: '8px' }}>Assigned to: David Chen • Zone A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditApprovals;

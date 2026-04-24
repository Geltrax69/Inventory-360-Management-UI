import React from 'react';
import { Users, Plus, Shield, ShieldAlert } from 'lucide-react';

const UsersRoles = () => {
  return (
    <div className="view-container reveal-animation" style={{ '--animation-order': 1 }}>
      <div className="view-header">
        <div>
          <h2 className="view-title">Users & Roles</h2>
          <p className="view-subtitle">Manage team access and permissions</p>
        </div>
        <div className="view-actions">
          <button className="btn-primary"><Plus size={16} /> Invite User</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="interactive-row">
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="user-avatar">SM</div>
                  <div>
                    <div className="font-medium">Sasha Merkel</div>
                    <div className="text-sm text-muted">sasha@inventory360.com</div>
                  </div>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldAlert size={14} className="text-danger" /> Admin
                </div>
              </td>
              <td><span className="badge-success">Active</span></td>
              <td className="text-sm text-muted">Just now</td>
              <td><button className="btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}}>Edit</button></td>
            </tr>
            <tr className="interactive-row">
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="user-avatar" style={{ background: 'var(--text-sidebar)' }}>JD</div>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted">john@inventory360.com</div>
                  </div>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={14} className="text-muted" /> Warehouse Staff
                </div>
              </td>
              <td><span className="badge-success">Active</span></td>
              <td className="text-sm text-muted">2 hours ago</td>
              <td><button className="btn-secondary" style={{padding: '6px 12px', fontSize: '12px'}}>Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersRoles;

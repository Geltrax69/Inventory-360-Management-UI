import React, { useState } from 'react';
import {
  Save, Building2, Globe, Bell, Shield, Database,
  Mail, MessageSquare, AlertTriangle, CheckCircle,
  Palette, Clock, Warehouse, ChevronRight, ChevronDown
} from 'lucide-react';

const Toggle = ({ checked, onChange, label, description }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 0', borderBottom: '1px solid var(--border-light)' }}>
    <div style={{ flex: 1, paddingRight: '24px' }}>
      <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '3px' }}>{label}</div>
      {description && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{description}</div>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', padding: '3px',
        background: checked ? 'var(--accent)' : 'var(--border-light)',
        transition: 'background 0.2s',
        display: 'flex', alignItems: 'center',
        justifyContent: checked ? 'flex-end' : 'flex-start',
        flexShrink: 0,
      }}
    >
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: checked ? '#1a1a1a' : 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'all 0.2s' }} />
    </button>
  </div>
);

const Section = ({ icon: Icon, title, children }) => (
  <div className="card reveal-animation" style={{ '--animation-order': 2, marginBottom: '24px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ padding: '10px', background: 'rgba(189,255,66,0.12)', borderRadius: '10px' }}>
        <Icon size={18} style={{ color: 'var(--accent)' }} />
      </div>
      <h3 style={{ margin: 0, fontWeight: 700, fontSize: '16px' }}>{title}</h3>
    </div>
    {children}
  </div>
);

const SystemSettings = () => {
  const [company, setCompany] = useState({ name: 'Inventory360 India Pvt. Ltd.', currency: 'INR', timezone: 'Asia/Kolkata', language: 'en' });
  const [notifs, setNotifs] = useState({ email: true, snapshot: true, sms: false, lowStock: true, expiry: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="view-container">
      <div className="view-header reveal-animation" style={{ '--animation-order': 1 }}>
        <div>
          <h2 className="view-title">System Settings</h2>
          <p className="view-subtitle">Global configuration, notifications, and preferences</p>
        </div>
        <button className="btn-primary" onClick={handleSave} style={{ gap: '8px', minWidth: '140px', justifyContent: 'center' }}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {saved && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', background: 'rgba(189,255,66,0.1)', border: '1px solid rgba(189,255,66,0.3)', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', fontWeight: 500 }}>
          <CheckCircle size={16} style={{ color: 'var(--accent)' }} /> Settings saved successfully.
        </div>
      )}

      <Section icon={Building2} title="Company Profile">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input className="form-input" value={company.name} onChange={e => setCompany({ ...company, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Base Currency</label>
            <div className="select-wrap" style={{ position: 'relative' }}>
              <select className="form-input" style={{ paddingRight: '36px' }} value={company.currency} onChange={e => setCompany({ ...company, currency: e.target.value })}>
                <option value="USD">USD — US Dollar ($)</option>
                <option value="EUR">EUR — Euro (€)</option>
                <option value="GBP">GBP — British Pound (£)</option>
                <option value="INR">INR — Indian Rupee (₹)</option>
              </select>
              <ChevronDown className="chevron" size={16} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Timezone</label>
            <div className="select-wrap" style={{ position: 'relative' }}>
              <select className="form-input" style={{ paddingRight: '36px' }} value={company.timezone} onChange={e => setCompany({ ...company, timezone: e.target.value })}>
                <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="UTC">UTC</option>
              </select>
              <ChevronDown className="chevron" size={16} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Language</label>
            <div className="select-wrap" style={{ position: 'relative' }}>
              <select className="form-input" style={{ paddingRight: '36px' }} value={company.language} onChange={e => setCompany({ ...company, language: e.target.value })}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="fr">French</option>
              </select>
              <ChevronDown className="chevron" size={16} />
            </div>
          </div>
        </div>
      </Section>

      <Section icon={Bell} title="Notification Preferences">
        <Toggle
          checked={notifs.email}
          onChange={v => setNotifs({ ...notifs, email: v })}
          label="Email Alerts"
          description="Receive email alerts for critical inventory events"
        />
        <Toggle
          checked={notifs.snapshot}
          onChange={v => setNotifs({ ...notifs, snapshot: v })}
          label="Daily Inventory Snapshot"
          description="A daily digest of your inventory status sent at 8 AM"
        />
        <Toggle
          checked={notifs.sms}
          onChange={v => setNotifs({ ...notifs, sms: v })}
          label="SMS Alerts"
          description="Get SMS messages for urgent stock level warnings"
        />
        <Toggle
          checked={notifs.lowStock}
          onChange={v => setNotifs({ ...notifs, lowStock: v })}
          label="Low Stock Warnings"
          description="Alert when any SKU drops below its minimum threshold"
        />
        <Toggle
          checked={notifs.expiry}
          onChange={v => setNotifs({ ...notifs, expiry: v })}
          label="Expiry Alerts"
          description="Notify 15 days before any batch expires"
        />
      </Section>

      <Section icon={Warehouse} title="Warehouse Defaults">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Default Warehouse</label>
            <div className="select-wrap" style={{ position: 'relative' }}>
              <select className="form-input" style={{ paddingRight: '36px' }}>
                <option>Warehouse A (Primary)</option>
                <option>Warehouse B</option>
                <option>Warehouse C</option>
              </select>
              <ChevronDown className="chevron" size={16} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Low Stock Threshold</label>
            <input className="form-input" type="number" defaultValue={10} />
          </div>
        </div>
      </Section>

      <Section icon={Shield} title="Security">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Session Timeout (minutes)</label>
            <input className="form-input" type="number" defaultValue={60} />
          </div>
          <div className="form-group">
            <label className="form-label">2FA Enforcement</label>
            <div className="select-wrap" style={{ position: 'relative' }}>
              <select className="form-input" style={{ paddingRight: '36px' }}>
                <option>Admins Only</option>
                <option>All Users</option>
                <option>Disabled</option>
              </select>
              <ChevronDown className="chevron" size={16} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default SystemSettings;

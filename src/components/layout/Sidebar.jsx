import React, { useState } from 'react';
import { 
  LayoutGrid, Package, Layers, Activity, ShoppingCart, Truck, 
  ClipboardCheck, BarChart2, Users, Settings, ChevronDown, Key, 
  ChevronRight, Box, MoveDiagonal, GitMerge, Combine
} from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
  const [openGroups, setOpenGroups] = useState({
    Overview: true,
    Products: true,
    Inventory: false,
    Operations: false,
    Admin: false
  });

  const toggleGroup = (groupName) => {
    setOpenGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const menuGroups = [
    {
      name: 'Overview',
      items: [
        { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
        { id: 'analytics', icon: BarChart2, label: 'Analytics' },
      ]
    },
    {
      name: 'Products',
      items: [
        { id: 'sku', icon: Package, label: 'SKU Management' },
        { id: 'bundles', icon: Combine, label: 'Bundles & Recipes' },
        { id: 'conversions', icon: GitMerge, label: 'SKU Conversions' },
      ]
    },
    {
      name: 'Inventory',
      items: [
        { id: 'inventory', icon: Layers, label: 'Inventory View' },
        { id: 'zones', icon: Box, label: 'Zones & Bins' },
      ]
    },
    {
      name: 'Operations',
      items: [
        { id: 'movement', icon: Activity, label: 'Stock Movement' },
        { id: 'po', icon: ShoppingCart, label: 'Purchase Orders', badge: 3 },
        { id: 'transfers', icon: Truck, label: 'Transfers' },
        { id: 'audit', icon: ClipboardCheck, label: 'Audit & Approvals' },
      ]
    },
    {
      name: 'Admin',
      items: [
        { id: 'users', icon: Users, label: 'Users & Roles' },
        { id: 'settings', icon: Settings, label: 'System Settings' },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">INVENTORY<span className="logo-accent">360</span></div>
      </div>
      
      <div className="sidebar-scrollable">
        <nav className="sidebar-menu">
          {menuGroups.map((group, groupIndex) => (
            <div key={group.name} className="menu-group" style={{ '--animation-order': groupIndex + 1 }}>
              <button 
                className="group-title" 
                onClick={() => toggleGroup(group.name)}
              >
                <span>{group.name}</span>
                <ChevronRight 
                  size={14} 
                  className={`group-chevron ${openGroups[group.name] ? 'open' : ''}`} 
                />
              </button>
              
              <div className={`group-items ${openGroups[group.name] ? 'expanded' : 'collapsed'}`}>
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <a 
                      key={item.id}
                      href="#" 
                      className={`menu-item ${activeView === item.id ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); setActiveView(item.id); }}
                    >
                      <Icon className="menu-icon" />
                      <span>{item.label}</span>
                      {item.badge && <span className="menu-badge">{item.badge}</span>}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="command-hint" onClick={() => {
            const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
            window.dispatchEvent(event);
        }}>
          <Key size={14} style={{marginRight: '6px'}}/> <span>Cmd + K</span> to search
        </button>
        <div className="user-profile">
          <div className="user-avatar">SM</div>
          <div className="user-name">Sasha Merkel<div className="user-role">Admin</div></div>
          <button className="btn-icon-only" onClick={() => setActiveView('settings')} title="System Settings">
            <Settings className="user-action" size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Bell, Warehouse, Check } from 'lucide-react';

const warehouses = [
  { id: 'wh-a', label: 'Warehouse A', tag: 'Primary' },
  { id: 'wh-b', label: 'Warehouse B', tag: '' },
  { id: 'wh-c', label: 'Warehouse C', tag: 'New' },
];

const Header = ({ setIsCommandPaletteOpen }) => {
  const [selected, setSelected] = useState(warehouses[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header reveal-animation" style={{ '--animation-order': 1 }}>
      <div className="header-search" onClick={() => setIsCommandPaletteOpen(true)}>
        <Search size={18} className="search-icon" />
        <span className="search-placeholder">Search SKUs, POs, Transfers...</span>
        <div className="search-shortcut">Cmd K</div>
      </div>

      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        {/* Custom Warehouse Dropdown */}
        <div className="wh-dropdown" ref={dropdownRef}>
          <button
            className={`wh-trigger ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Warehouse size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <span className="wh-label">{selected.label}</span>
            {selected.tag && <span className="wh-tag">{selected.tag}</span>}
            <ChevronDown size={15} className={`wh-chevron ${isOpen ? 'rotated' : ''}`} />
          </button>

          {isOpen && (
            <div className="wh-menu">
              <div className="wh-menu-header">Select Warehouse</div>
              {warehouses.map((wh) => (
                <button
                  key={wh.id}
                  className={`wh-option ${selected.id === wh.id ? 'active' : ''}`}
                  onClick={() => { setSelected(wh); setIsOpen(false); }}
                >
                  <div className="wh-option-left">
                    <div className={`wh-dot ${selected.id === wh.id ? 'active' : ''}`} />
                    <span>{wh.label}</span>
                    {wh.tag && <span className="wh-tag">{wh.tag}</span>}
                  </div>
                  {selected.id === wh.id && <Check size={15} style={{ color: 'var(--accent)' }} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

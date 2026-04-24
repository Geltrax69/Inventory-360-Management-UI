import React, { useEffect, useRef } from 'react';
import { Search, Package, ShoppingCart, Truck, X } from 'lucide-react';

const CommandPalette = ({ close, setActiveView }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [close]);

  const handleAction = (view) => {
    setActiveView(view);
    close();
  };

  return (
    <div className="command-palette-overlay" onClick={close}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <div className="command-header">
          <Search size={20} className="command-icon" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search SKUs, POs, actions... (e.g., 'Create PO')" 
            className="command-input"
          />
          <button className="command-close" onClick={close}><X size={16} /></button>
        </div>
        <div className="command-body">
          <div className="command-group">
            <div className="command-group-title">Quick Actions</div>
            <div className="command-item" onClick={() => handleAction('sku')}>
              <Package size={16} /> <span>Create new SKU</span>
            </div>
            <div className="command-item" onClick={() => handleAction('po')}>
              <ShoppingCart size={16} /> <span>Create Purchase Order</span>
            </div>
            <div className="command-item" onClick={() => handleAction('transfers')}>
              <Truck size={16} /> <span>New Transfer Request</span>
            </div>
          </div>
          <div className="command-group">
            <div className="command-group-title">Recent Searches</div>
            <div className="command-item">
              <span>MacBook Air M2 (SKU-1092)</span>
            </div>
            <div className="command-item">
              <span>PO-2026-042</span>
            </div>
          </div>
        </div>
        <div className="command-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;

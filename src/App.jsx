import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ExecutiveDashboard from './components/dashboard/ExecutiveDashboard';
import SkuManagement from './components/views/SkuManagement';
import InventoryView from './components/views/InventoryView';
import StockMovement from './components/views/StockMovement';
import PurchaseOrders from './components/views/PurchaseOrders';
import Transfers from './components/views/Transfers';
import Bundles from './components/views/Bundles';
import Conversions from './components/views/Conversions';
import AuditApprovals from './components/views/AuditApprovals';
import ZonesBins from './components/views/ZonesBins';
import Analytics from './components/views/Analytics';
import UsersRoles from './components/views/UsersRoles';
import SystemSettings from './components/views/SystemSettings';
import SkeletonView from './components/views/SkeletonView';
import CommandPalette from './components/layout/CommandPalette';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleViewChange = (view) => {
    if (view === activeView) return;
    setIsLoading(true);
    setActiveView(view);
    // Simulate network latency (400ms - 800ms)
    setTimeout(() => setIsLoading(false), Math.random() * 400 + 400);
  };

  const renderView = () => {
    if (isLoading) {
      return <SkeletonView type={activeView === 'dashboard' ? 'dashboard' : 'table'} />;
    }

    switch(activeView) {
      case 'dashboard': return <ExecutiveDashboard />;
      case 'sku': return <SkuManagement />;
      case 'inventory': return <InventoryView />;
      case 'movement': return <StockMovement />;
      case 'po': return <PurchaseOrders />;
      case 'transfers': return <Transfers />;
      case 'bundles': return <Bundles />;
      case 'conversions': return <Conversions />;
      case 'audit': return <AuditApprovals />;
      case 'zones': return <ZonesBins />;
      case 'analytics': return <Analytics />;
      case 'users': return <UsersRoles />;
      case 'settings': return <SystemSettings />;
      default: return (
        <div className="empty-state reveal-animation" style={{ '--animation-order': 1 }}>
          <div className="empty-state-icon">🚧</div>
          <h2>Module Under Construction</h2>
          <p>The {activeView} module is currently being built. Check back soon.</p>
        </div>
      );
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={handleViewChange} />
      <main className="main-content">
        <Header setIsCommandPaletteOpen={setIsCommandPaletteOpen} />
        {renderView()}
      </main>
      
      {isCommandPaletteOpen && (
        <CommandPalette 
          close={() => setIsCommandPaletteOpen(false)} 
          setActiveView={handleViewChange} 
        />
      )}
    </div>
  );
}

export default App;

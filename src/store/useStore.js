import { create } from 'zustand';
import { 
  initialSkus, initialInventory, initialMovements, 
  initialPOs, initialTransfers, initialBundles, 
  initialConversions, initialZones, initialUsers, initialAudits 
} from '../data/mockData';

const useStore = create((set) => ({
  // Data State
  skus: initialSkus,
  inventory: initialInventory,
  movements: initialMovements,
  pos: initialPOs,
  transfers: initialTransfers,
  bundles: initialBundles,
  conversions: initialConversions,
  zones: initialZones,
  users: initialUsers,
  audits: initialAudits,

  // UI State
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Actions
  addSku: (sku) => set((state) => ({ skus: [sku, ...state.skus] })),
  
  adjustInventory: (skuCode, qtyChange, reason) => set((state) => {
    // 1. Update Inventory Qty
    const newInventory = state.inventory.map(item => {
      if (item.sku === skuCode) {
        return { ...item, qty: Math.max(0, item.qty + qtyChange) };
      }
      return item;
    });

    // 2. Record Movement automatically
    const targetSku = state.skus.find(s => s.code === skuCode);
    const newMovement = {
      id: Date.now(),
      date: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ' (Just now)',
      ref: `ADJ-${Math.floor(Math.random() * 10000)}`,
      sku: skuCode,
      name: targetSku ? targetSku.name : 'Unknown Product',
      type: qtyChange >= 0 ? 'Inbound' : 'Outbound',
      qty: qtyChange,
      user: 'Sasha Merkel'
    };

    return { inventory: newInventory, movements: [newMovement, ...state.movements] };
  }),

  addMovement: (movement) => set((state) => ({ movements: [movement, ...state.movements] })),
  addPO: (po) => set((state) => ({ pos: [po, ...state.pos] })),
  addTransfer: (transfer) => set((state) => ({ transfers: [transfer, ...state.transfers] })),
  addBundle: (bundle) => set((state) => ({ bundles: [bundle, ...state.bundles] })),
  addConversion: (conversion) => set((state) => ({ conversions: [conversion, ...state.conversions] })),
  addZone: (zone) => set((state) => ({ zones: [zone, ...state.zones] })),
}));

export default useStore;

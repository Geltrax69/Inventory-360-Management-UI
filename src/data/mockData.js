// mockData.js — expanded with realistic Indian ERP data

export const initialSkus = [
  { id: 1,  code: 'SKU-1001', name: 'AirPods Pro Gen 2',      category: 'Electronics',  variants: 3, sellPrice: 24900,  costPrice: 18500, status: 'Active' },
  { id: 2,  code: 'SKU-1002', name: 'MacBook Air M2 (8GB)',    category: 'Computers',    variants: 4, sellPrice: 114900, costPrice: 88000, status: 'Active' },
  { id: 3,  code: 'SKU-1003', name: 'iPhone 15 Pro (128GB)',   category: 'Electronics',  variants: 5, sellPrice: 134900, costPrice: 98000, status: 'Active' },
  { id: 4,  code: 'SKU-1004', name: 'Magic Mouse 3',           category: 'Accessories',  variants: 2, sellPrice: 6900,   costPrice: 4200,  status: 'Active' },
  { id: 5,  code: 'SKU-1005', name: 'Apple Watch Series 9',    category: 'Wearables',    variants: 6, sellPrice: 41900,  costPrice: 31000, status: 'Active' },
  { id: 6,  code: 'SKU-1006', name: 'iPad Pro 12.9" M2',       category: 'Computers',    variants: 4, sellPrice: 112900, costPrice: 84000, status: 'Active' },
  { id: 7,  code: 'SKU-1007', name: 'HomePod Mini',            category: 'Audio',        variants: 2, sellPrice: 9900,   costPrice: 7200,  status: 'Active' },
  { id: 8,  code: 'SKU-1008', name: 'Apple TV 4K (3rd Gen)',   category: 'Electronics',  variants: 2, sellPrice: 18900,  costPrice: 13500, status: 'Active' },
  { id: 9,  code: 'SKU-1009', name: 'MacBook Pro 14" M3 Pro',  category: 'Computers',    variants: 3, sellPrice: 199900, costPrice: 158000,status: 'Active' },
  { id: 10, code: 'SKU-1010', name: 'iPhone 15 (128GB)',        category: 'Electronics',  variants: 4, sellPrice: 79900,  costPrice: 60000, status: 'Active' },
  { id: 11, code: 'SKU-1011', name: 'AirPods Max (USB-C)',      category: 'Audio',        variants: 5, sellPrice: 59900,  costPrice: 44000, status: 'Active' },
  { id: 12, code: 'SKU-1012', name: 'Magic Keyboard Touch ID', category: 'Accessories',  variants: 2, sellPrice: 11900,  costPrice: 8400,  status: 'Active' },
  { id: 13, code: 'SKU-1013', name: 'Apple Pencil 2nd Gen',    category: 'Accessories',  variants: 1, sellPrice: 11900,  costPrice: 8000,  status: 'Active' },
  { id: 14, code: 'SKU-1014', name: 'Mac mini M2',             category: 'Computers',    variants: 3, sellPrice: 69900,  costPrice: 52000, status: 'Active' },
  { id: 15, code: 'SKU-1015', name: 'iMac 24" M3',             category: 'Computers',    variants: 4, sellPrice: 159900, costPrice: 122000,status: 'Active' },
  { id: 16, code: 'SKU-1016', name: 'MagSafe Charger 15W',     category: 'Accessories',  variants: 1, sellPrice: 3900,   costPrice: 2200,  status: 'Active' },
  { id: 17, code: 'SKU-1017', name: 'USB-C Hub 7-in-1',        category: 'Accessories',  variants: 1, sellPrice: 4500,   costPrice: 2800,  status: 'Active' },
  { id: 18, code: 'SKU-1018', name: 'Apple Watch Ultra 2',     category: 'Wearables',    variants: 3, sellPrice: 89900,  costPrice: 68000, status: 'Active' },
  { id: 19, code: 'SKU-1019', name: 'iPad mini 6 (64GB)',      category: 'Computers',    variants: 3, sellPrice: 46900,  costPrice: 34000, status: 'Active' },
  { id: 20, code: 'SKU-1020', name: 'AirTag (4 Pack)',         category: 'Accessories',  variants: 1, sellPrice: 9900,   costPrice: 6500,  status: 'Active' },
  { id: 21, code: 'SKU-1021', name: 'Studio Display 27"',      category: 'Computers',    variants: 1, sellPrice: 159900, costPrice: 124000,status: 'Inactive' },
  { id: 22, code: 'SKU-1022', name: 'iPhone SE 3rd Gen',       category: 'Electronics',  variants: 3, sellPrice: 49900,  costPrice: 36000, status: 'Active' },
  { id: 23, code: 'SKU-1023', name: 'Apple Leather Case 15',   category: 'Accessories',  variants: 6, sellPrice: 5900,   costPrice: 3200,  status: 'Active' },
  { id: 24, code: 'SKU-1024', name: 'MacBook Air 15" M2',      category: 'Computers',    variants: 3, sellPrice: 134900, costPrice: 104000,status: 'Active' },
  { id: 25, code: 'SKU-1025', name: 'Apple Watch SE 2nd Gen',  category: 'Wearables',    variants: 4, sellPrice: 29900,  costPrice: 21000, status: 'Active' },
];

export const initialInventory = [
  { id: 1,  sku: 'SKU-1001', name: 'AirPods Pro Gen 2',      location: 'Warehouse A', bin: 'Zone 4, Bin 12', batch: 'B-2026-01', expiry: 'Dec 2027', qty: 142,  status: 'Sellable' },
  { id: 2,  sku: 'SKU-1002', name: 'MacBook Air M2',         location: 'Warehouse A', bin: 'Zone 4, Bin 22', batch: 'B-2026-02', expiry: 'Dec 2028', qty: 68,   status: 'Sellable' },
  { id: 3,  sku: 'SKU-1003', name: 'iPhone 15 Pro',          location: 'Warehouse B', bin: 'Zone 1, Bin 32', batch: 'B-2026-03', expiry: 'Dec 2028', qty: 210,  status: 'Sellable' },
  { id: 4,  sku: 'SKU-1004', name: 'Magic Mouse 3',          location: 'Warehouse A', bin: 'Zone 2, Bin 42', batch: 'B-2026-04', expiry: 'Dec 2029', qty: 568,  status: 'Sellable' },
  { id: 5,  sku: 'SKU-1005', name: 'Apple Watch Series 9',   location: 'Warehouse C', bin: 'Zone 5, Bin 52', batch: 'B-2026-05', expiry: 'Dec 2027', qty: 95,   status: 'Sellable' },
  { id: 6,  sku: 'SKU-1006', name: 'iPad Pro 12.9" M2',      location: 'Warehouse A', bin: 'Zone 3, Bin 11', batch: 'B-2026-06', expiry: 'Dec 2028', qty: 44,   status: 'Sellable' },
  { id: 7,  sku: 'SKU-1007', name: 'HomePod Mini',            location: 'Warehouse B', bin: 'Zone 2, Bin 19', batch: 'B-2026-07', expiry: 'Dec 2029', qty: 320,  status: 'Sellable' },
  { id: 8,  sku: 'SKU-1008', name: 'Apple TV 4K',            location: 'Warehouse B', bin: 'Zone 1, Bin 07', batch: 'B-2026-08', expiry: 'Dec 2029', qty: 180,  status: 'Sellable' },
  { id: 9,  sku: 'SKU-1009', name: 'MacBook Pro 14" M3 Pro', location: 'Warehouse A', bin: 'Zone 4, Bin 33', batch: 'B-2026-09', expiry: 'Dec 2028', qty: 30,   status: 'Sellable' },
  { id: 10, sku: 'SKU-1010', name: 'iPhone 15',              location: 'Warehouse C', bin: 'Zone 5, Bin 61', batch: 'B-2026-10', expiry: 'Dec 2028', qty: 410,  status: 'Sellable' },
  { id: 11, sku: 'SKU-1011', name: 'AirPods Max',            location: 'Warehouse A', bin: 'Zone 4, Bin 14', batch: 'B-2026-11', expiry: 'Dec 2027', qty: 55,   status: 'Sellable' },
  { id: 12, sku: 'SKU-1012', name: 'Magic Keyboard',         location: 'Warehouse A', bin: 'Zone 2, Bin 55', batch: 'B-2026-12', expiry: 'Dec 2029', qty: 290,  status: 'Sellable' },
  { id: 13, sku: 'SKU-1013', name: 'Apple Pencil 2nd Gen',   location: 'Warehouse B', bin: 'Zone 1, Bin 18', batch: 'B-2026-13', expiry: 'Dec 2029', qty: 500,  status: 'Sellable' },
  { id: 14, sku: 'SKU-1014', name: 'Mac mini M2',            location: 'Warehouse A', bin: 'Zone 3, Bin 22', batch: 'B-2026-14', expiry: 'Dec 2028', qty: 88,   status: 'Sellable' },
  { id: 15, sku: 'SKU-1015', name: 'iMac 24" M3',            location: 'Warehouse C', bin: 'Zone 6, Bin 02', batch: 'B-2026-15', expiry: 'Dec 2028', qty: 22,   status: 'Sellable' },
  { id: 16, sku: 'SKU-1016', name: 'MagSafe Charger 15W',    location: 'Warehouse A', bin: 'Zone 2, Bin 66', batch: 'B-2026-16', expiry: 'Dec 2030', qty: 1200, status: 'Sellable' },
  { id: 17, sku: 'SKU-1017', name: 'USB-C Hub 7-in-1',       location: 'Warehouse B', bin: 'Zone 1, Bin 44', batch: 'B-2026-17', expiry: 'Dec 2030', qty: 750,  status: 'Sellable' },
  { id: 18, sku: 'SKU-1018', name: 'Apple Watch Ultra 2',    location: 'Warehouse A', bin: 'Zone 4, Bin 08', batch: 'B-2026-18', expiry: 'Dec 2027', qty: 15,   status: 'Sellable' },
  { id: 19, sku: 'SKU-1019', name: 'iPad mini 6',            location: 'Warehouse B', bin: 'Zone 2, Bin 31', batch: 'B-2026-19', expiry: 'Dec 2028', qty: 145,  status: 'Sellable' },
  { id: 20, sku: 'SKU-1020', name: 'AirTag (4 Pack)',         location: 'Warehouse A', bin: 'Zone 2, Bin 77', batch: 'B-2026-20', expiry: 'Dec 2031', qty: 980,  status: 'Sellable' },
  { id: 21, sku: 'SKU-1021', name: 'Studio Display 27"',     location: 'Warehouse C', bin: 'Zone 6, Bin 11', batch: 'B-2026-21', expiry: 'Dec 2028', qty: 8,    status: 'Sellable' },
  { id: 22, sku: 'SKU-1022', name: 'iPhone SE 3rd Gen',      location: 'Warehouse B', bin: 'Zone 3, Bin 09', batch: 'B-2026-22', expiry: 'Dec 2028', qty: 275,  status: 'Sellable' },
  { id: 23, sku: 'SKU-1023', name: 'Apple Leather Case',     location: 'Warehouse A', bin: 'Zone 2, Bin 88', batch: 'B-2025-23', expiry: 'Jun 2026', qty: 340,  status: 'Sellable' },
  { id: 24, sku: 'SKU-1024', name: 'MacBook Air 15" M2',     location: 'Warehouse A', bin: 'Zone 4, Bin 44', batch: 'B-2026-24', expiry: 'Dec 2028', qty: 52,   status: 'Sellable' },
  { id: 25, sku: 'SKU-1025', name: 'Apple Watch SE 2',       location: 'Warehouse C', bin: 'Zone 5, Bin 73', batch: 'B-2026-25', expiry: 'Dec 2027', qty: 190,  status: 'Sellable' },
  { id: 26, sku: 'SKU-1004', name: 'Magic Mouse 3 (Damaged)',location: 'Warehouse A', bin: 'Zone D, Bin 01', batch: 'B-2026-04', expiry: 'Dec 2029', qty: 43,   status: 'Damaged' },
  { id: 27, sku: 'SKU-1003', name: 'iPhone 15 Pro (Q)',      location: 'Warehouse B', bin: 'Zone D, Bin 02', batch: 'B-2026-03', expiry: 'Dec 2028', qty: 12,   status: 'Quarantine' },
];

export const initialMovements = [
  { id: 1,  date: 'Today, 10:14 AM', ref: 'TRX-9912', sku: 'SKU-1003', name: 'iPhone 15 Pro',         type: 'Outbound', qty: -24,  user: 'Sasha Merkel' },
  { id: 2,  date: 'Today, 10:44 AM', ref: 'TRX-9913', sku: 'SKU-1001', name: 'AirPods Pro Gen 2',     type: 'Inbound',  qty: 60,   user: 'John Doe' },
  { id: 3,  date: 'Today, 11:02 AM', ref: 'TRX-9914', sku: 'SKU-1002', name: 'MacBook Air M2',        type: 'Outbound', qty: -10,  user: 'Priya Sharma' },
  { id: 4,  date: 'Today, 11:30 AM', ref: 'TRX-9915', sku: 'SKU-1004', name: 'Magic Mouse 3',         type: 'Inbound',  qty: 200,  user: 'John Doe' },
  { id: 5,  date: 'Today, 12:00 PM', ref: 'TRX-9916', sku: 'SKU-1010', name: 'iPhone 15',             type: 'Outbound', qty: -50,  user: 'Rahul Verma' },
  { id: 6,  date: 'Today, 12:15 PM', ref: 'TRX-9917', sku: 'SKU-1016', name: 'MagSafe Charger',       type: 'Inbound',  qty: 500,  user: 'Sasha Merkel' },
  { id: 7,  date: 'Yesterday, 4:10 PM', ref: 'TRX-9900', sku: 'SKU-1009', name: 'MacBook Pro 14"',    type: 'Outbound', qty: -5,   user: 'Priya Sharma' },
  { id: 8,  date: 'Yesterday, 3:00 PM', ref: 'TRX-9901', sku: 'SKU-1020', name: 'AirTag (4 Pack)',    type: 'Inbound',  qty: 300,  user: 'John Doe' },
  { id: 9,  date: 'Yesterday, 1:40 PM', ref: 'TRX-9902', sku: 'SKU-1005', name: 'Apple Watch S9',     type: 'Outbound', qty: -18,  user: 'Rahul Verma' },
  { id: 10, date: 'Yesterday, 11:00 AM', ref: 'TRX-9903', sku: 'SKU-1012', name: 'Magic Keyboard',   type: 'Inbound',  qty: 100,  user: 'Sasha Merkel' },
  { id: 11, date: 'Apr 22, 9:00 AM',   ref: 'TRX-9880', sku: 'SKU-1015', name: 'iMac 24" M3',        type: 'Outbound', qty: -3,   user: 'John Doe' },
  { id: 12, date: 'Apr 22, 10:30 AM',  ref: 'TRX-9881', sku: 'SKU-1007', name: 'HomePod Mini',       type: 'Inbound',  qty: 80,   user: 'Priya Sharma' },
];

export const initialPOs = [
  { id: 1, poId: 'PO-2026-001', vendor: 'Apple India Pvt. Ltd.', qty: 400,  status: 'Received', date: 'Apr 10, 2026' },
  { id: 2, poId: 'PO-2026-002', vendor: 'Apple India Pvt. Ltd.', qty: 800,  status: 'Shipped',  date: 'Apr 15, 2026' },
  { id: 3, poId: 'PO-2026-003', vendor: 'Reliance Digital',       qty: 200,  status: 'Draft',    date: 'Apr 18, 2026' },
  { id: 4, poId: 'PO-2026-004', vendor: 'Ingram Micro India',     qty: 1500, status: 'Shipped',  date: 'Apr 20, 2026' },
  { id: 5, poId: 'PO-2026-005', vendor: 'Redington India',        qty: 600,  status: 'Received', date: 'Apr 08, 2026' },
  { id: 6, poId: 'PO-2026-006', vendor: 'Apple India Pvt. Ltd.', qty: 250,  status: 'Draft',    date: 'Apr 22, 2026' },
  { id: 7, poId: 'PO-2026-007', vendor: 'Ingram Micro India',     qty: 900,  status: 'Received', date: 'Apr 05, 2026' },
  { id: 8, poId: 'PO-2026-008', vendor: 'Reliance Digital',       qty: 320,  status: 'Shipped',  date: 'Apr 23, 2026' },
];

export const initialTransfers = [
  { id: 1, transferId: 'TRF-881', source: 'Warehouse A', dest: 'Mumbai Retail',  qty: 12, status: 'In Transit' },
  { id: 2, transferId: 'TRF-882', source: 'Warehouse B', dest: 'Bangalore Store', qty: 24, status: 'In Transit' },
  { id: 3, transferId: 'TRF-883', source: 'Warehouse C', dest: 'Delhi HQ',        qty: 50, status: 'Completed' },
  { id: 4, transferId: 'TRF-884', source: 'Warehouse A', dest: 'Pune Outlet',     qty: 8,  status: 'Draft' },
  { id: 5, transferId: 'TRF-885', source: 'Warehouse B', dest: 'Chennai Store',   qty: 30, status: 'Completed' },
  { id: 6, transferId: 'TRF-886', source: 'Warehouse A', dest: 'Hyderabad Hub',   qty: 15, status: 'In Transit' },
];

export const initialBundles = [
  { id: 1, name: 'Starter Kit Pro',     code: 'BNDL-001', components: ['1x MacBook Air M2', '1x Magic Mouse 3'],            cost: 92200,  price: 119999 },
  { id: 2, name: 'Creative Studio Bundle', code: 'BNDL-002', components: ['1x MacBook Pro 14"', '1x Apple Pencil', '1x iPad Pro'], cost: 323900, price: 374999 },
  { id: 3, name: 'Office Essentials',   code: 'BNDL-003', components: ['1x Mac mini M2', '1x Magic Keyboard', '1x Magic Mouse'], cost: 82600,  price: 99999 },
  { id: 4, name: 'Mobile Power Pack',   code: 'BNDL-004', components: ['1x iPhone 15 Pro', '1x AirPods Pro', '1x MagSafe'],    cost: 141700, price: 169999 },
];

export const initialConversions = [
  { id: 1, source: 'Water Bottles (Pallet)',  sourceCode: 'SKU-W-PLT', path: '1 Pallet → 50 Cases', target: 'Water Bottles (Case)',  targetCode: 'SKU-W-CAS', ratio: '1 : 50' },
  { id: 2, source: 'AirTag Box (Bulk)',       sourceCode: 'SKU-1020B', path: '1 Bulk → 4 Units',    target: 'AirTag (4 Pack)',        targetCode: 'SKU-1020',  ratio: '1 : 4' },
  { id: 3, source: 'Charger (Master Carton)', sourceCode: 'SKU-1016C', path: '1 Carton → 20 Units', target: 'MagSafe Charger 15W',   targetCode: 'SKU-1016',  ratio: '1 : 20' },
];

export const initialZones = [
  { id: 1, name: 'Zone A - Electronics',  bins: 120, used: 4200, capacity: 5000, utilization: 84 },
  { id: 2, name: 'Zone B - Accessories',  bins: 200, used: 7500, capacity: 8000, utilization: 94 },
  { id: 3, name: 'Zone C - Large Items',  bins: 40,  used: 1950, capacity: 2000, utilization: 98 },
  { id: 4, name: 'Zone D - Quarantine',   bins: 10,  used: 100,  capacity: 500,  utilization: 20 },
  { id: 5, name: 'Zone E - Wearables',    bins: 60,  used: 2100, capacity: 3000, utilization: 70 },
  { id: 6, name: 'Zone F - Computers',    bins: 80,  used: 5800, capacity: 6500, utilization: 89 },
];

export const initialUsers = [
  { id: 1, name: 'Sasha Merkel',  role: 'Admin',        email: 'sasha@zeus.app',   status: 'Active' },
  { id: 2, name: 'John Doe',      role: 'Manager',      email: 'john@zeus.app',    status: 'Active' },
  { id: 3, name: 'Priya Sharma',  role: 'Warehouse Staff', email: 'priya@zeus.app', status: 'Active' },
  { id: 4, name: 'Rahul Verma',   role: 'Warehouse Staff', email: 'rahul@zeus.app', status: 'Active' },
  { id: 5, name: 'Anjali Singh',  role: 'Viewer',       email: 'anjali@zeus.app',  status: 'Inactive' },
];

export const initialAudits = [
  { id: 1, title: 'Price Adjustment: AirPods Pro', requestedBy: 'John Doe',    type: 'Price Update',   status: 'Pending' },
  { id: 2, title: 'Stock Count: Warehouse A Q2',    requestedBy: 'Priya Sharma',type: 'Physical Audit', status: 'In Progress' },
  { id: 3, title: 'Damaged Goods Write-Off',        requestedBy: 'Rahul Verma', type: 'Write-Off',      status: 'Pending' },
];

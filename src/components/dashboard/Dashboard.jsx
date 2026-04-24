import React from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const salesData1 = [
  { name: '1 Apr', value: 7000 },
  { name: '5 Apr', value: 7500 },
  { name: '10 Apr', value: 7200 },
  { name: '15 Apr', value: 8000 },
  { name: '20 Apr', value: 7800 },
  { name: '25 Apr', value: 9000 },
  { name: '30 Apr', value: 10000 },
];

const salesData2 = [
  { name: '1 Apr', value: 0 },
  { name: '5 Apr', value: 3000 },
  { name: '10 Apr', value: 8000 },
  { name: '15 Apr', value: 10000 },
  { name: '20 Apr', value: 4500 },
  { name: '25 Apr', value: 8000 },
  { name: '30 Apr', value: 5000 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-grid">
      {/* Left Column */}
      <div className="main-column">
        
        {/* Top Main Card */}
        <div className="card main-chart-card reveal-animation" style={{ '--animation-order': 2 }}>
          <div className="main-chart-info">
            <div className="card-title">This month your stores have sold</div>
            <div className="card-value gradient-text">$8619.86</div>
            <div className="card-subtitle">That's $1,780.24 more than this time last month!</div>
            
            <div className="chart-container">
              <div className="chart-label">All Outlets</div>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData1}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888', fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888', fontWeight: 500 }} dx={-10} domain={[0, 10000]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: 'var(--accent)', stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="main-chart-metrics">
            <div className="metric-item">
              <div className="card-title">Average Sale Value</div>
              <div className="card-value highlight">$48.68</div>
            </div>
            <div className="metric-item" style={{ marginBottom: 0 }}>
              <div className="card-title">Average Items per Sale</div>
              <div className="card-value highlight" style={{ marginBottom: '4px' }}>$2.8</div>
              <div className="card-subtitle small">0.95 items than last month</div>
            </div>
          </div>
        </div>

        {/* Bottom Main Card */}
        <div className="card reveal-animation" style={{ '--animation-order': 3 }}>
          <div className="sales-card-header">
            <div className="card-title" style={{ fontSize: '1.1rem' }}>Your Sales this Month</div>
            <button className="more-metrics-btn">
              <Plus size={14} style={{ marginRight: '4px' }} /> SHOW MORE RETAIL METRICS
            </button>
          </div>
          
          <div className="chart-container secondary-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData2}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888', fontWeight: 500 }} dx={-10} domain={[0, 10000]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="sales-metrics-grid">
            <div className="metric-item">
              <div className="card-title">Your Sales Targets</div>
              <div className="card-value">$800.80</div>
              <div className="set-target-link">Set a sales target</div>
            </div>
            <div className="metric-item">
              <div className="card-title">Average Sales Targets</div>
              <div className="card-value">$61.34</div>
              <div className="card-subtitle">$20.95 less than last month</div>
            </div>
            <div className="metric-item">
              <div className="card-title">Average Items per Sale</div>
              <div className="card-value">8</div>
              <div className="card-subtitle">0.08 more than last month</div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Right Column */}
      <div className="side-cards">
        {/* Transfer Card */}
        <div className="card reveal-animation interactive-card" style={{ '--animation-order': 4 }}>
          <div className="card-title" style={{ fontSize: '1.1rem' }}>Transfer</div>
          <div className="card-subtitle" style={{ color: 'var(--text-main)', opacity: 0.8 }}>You have 1 transfer waiting to be received</div>
          
          <div className="transfer-item">
            <div className="transfer-img">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
            </div>
            <div className="transfer-details">
              <h4>Beats Studio Pro <span className="transfer-qty">20 pcs</span></h4>
              <div className="transfer-path">
                Texas warehouse <ChevronRight size={14} className="path-icon" /> IT Dept.
              </div>
            </div>
          </div>
          
          <button className="view-btn">
            VIEW TRANSFER
            <div className="btn-hover-effect"></div>
          </button>
        </div>

        {/* Purchase Orders Card */}
        <div className="card reveal-animation interactive-card" style={{ '--animation-order': 5 }}>
          <div className="card-title" style={{ fontSize: '1.1rem' }}>Purchase Orders</div>
          <div className="card-subtitle" style={{ color: 'var(--text-main)', opacity: 0.8 }}>You have 6 dispatched orders waiting to be received</div>
          
          <div className="product-images">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="product-img-wrap" style={{ animationDelay: `${0.1 * i}s` }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
            ))}
          </div>
          
          <button className="view-btn">
            VIEW DISPATCHED ORDERS
            <div className="btn-hover-effect"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

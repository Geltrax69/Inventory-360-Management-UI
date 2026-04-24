import React from 'react';
import { AlertTriangle, Activity, Package } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const valueTrendData = [
  { name: 'Jan', value: 1200000 }, { name: 'Feb', value: 1350000 },
  { name: 'Mar', value: 1300000 }, { name: 'Apr', value: 1500000 },
  { name: 'May', value: 1800000 }, { name: 'Jun', value: 2100000 },
];
const movementData = [
  { name: 'Mon', inbound: 400, outbound: 240 }, { name: 'Tue', inbound: 300, outbound: 139 },
  { name: 'Wed', inbound: 200, outbound: 380 }, { name: 'Thu', inbound: 278, outbound: 390 },
  { name: 'Fri', inbound: 489, outbound: 480 }, { name: 'Sat', inbound: 239, outbound: 280 },
  { name: 'Sun', inbound: 349, outbound: 430 },
];
const topSellingData = [
  { name: 'AirPods Pro', sales: 4000 }, { name: 'MacBook Air', sales: 3000 },
  { name: 'iPhone 15', sales: 2000 }, { name: 'iPad Pro', sales: 2780 },
  { name: 'Apple Watch', sales: 1890 },
];

const KpiCard = ({ title, value, trend, trendValue, icon: Icon, delay }) => (
  <div className="card kpi-card reveal-animation" style={{ '--animation-order': delay }}>
    <div className="kpi-header">
      <span className="kpi-title">{title}</span>
      <div className="kpi-icon-wrap"><Icon size={18} /></div>
    </div>
    <div className="kpi-value">{value}</div>
    <div className={`kpi-trend ${trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral'}`}>
      {trend === 'up' ? <ArrowUpRight size={14} /> : trend === 'down' ? <ArrowDownRight size={14} /> : null}
      <span>{trendValue}</span> vs last month
    </div>
  </div>
);

const ExecutiveDashboard = () => {
  return (
    <div className="dashboard-content">
      <div className="kpi-grid">
        <KpiCard title="Total Inventory Value" value="₹1.74 Cr" trend="up" trendValue="+12%" icon={Activity} delay={1} />
        <KpiCard title="Inventory Health" value="92/100" trend="up" trendValue="+5%" icon={Activity} delay={2} />
        <KpiCard title="Dead Stock Value" value="₹37.5L" trend="down" trendValue="-2%" icon={AlertTriangle} delay={3} />
        <KpiCard title="Stock Turnover" value="4.2x" trend="up" trendValue="+0.4x" icon={Package} delay={4} />
      </div>

      <div className="charts-grid-main">
        <div className="card reveal-animation" style={{ '--animation-order': 5 }}>
          <div className="card-header"><h3 className="card-title">Inventory Value Trend</h3></div>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={valueTrendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dx={-10} tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
                <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card reveal-animation" style={{ '--animation-order': 6 }}>
          <div className="card-header"><h3 className="card-title">Stock Movement</h3></div>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={movementData}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--text-main)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--text-main)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
                <Area type="monotone" dataKey="inbound" stackId="1" stroke="var(--text-main)" fill="url(#colorIn)" />
                <Area type="monotone" dataKey="outbound" stackId="1" stroke="var(--text-muted)" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="charts-grid-secondary">
        <div className="card reveal-animation" style={{ '--animation-order': 7 }}>
          <div className="card-header"><h3 className="card-title">Top Selling SKUs</h3></div>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSellingData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-main)', fontWeight: 500 }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
                <Bar dataKey="sales" fill="var(--accent)" radius={[0, 4, 4, 0]} barSize={18}>
                  {topSellingData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={i === 0 ? 'var(--accent)' : 'var(--text-sidebar)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card reveal-animation" style={{ '--animation-order': 8 }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="card-title">Critical Alerts</h3>
            <span className="badge-danger pulse">4 Action Required</span>
          </div>

          <div className="alert-row danger">
            <div style={{ background: 'rgba(233,78,78,0.12)', color: 'var(--danger)', padding: '10px', borderRadius: '10px', marginRight: '14px', flexShrink: 0 }}>
              <AlertTriangle size={16} />
            </div>
            <div>
              <div className="font-medium" style={{ fontSize: '14px', marginBottom: '2px' }}>Low Stock: MacBook Air M2</div>
              <div className="text-muted" style={{ fontSize: '12px' }}>Only 3 units remaining in Zone A</div>
            </div>
          </div>

          <div className="alert-row warning">
            <div style={{ background: 'rgba(239,184,56,0.12)', color: 'var(--warning)', padding: '10px', borderRadius: '10px', marginRight: '14px', flexShrink: 0 }}>
              <AlertTriangle size={16} />
            </div>
            <div>
              <div className="font-medium" style={{ fontSize: '14px', marginBottom: '2px' }}>Expiring Soon: Screen Protectors</div>
              <div className="text-muted" style={{ fontSize: '12px' }}>Batch #4928 expires in 12 days</div>
            </div>
          </div>

          <div className="alert-row info">
            <div style={{ background: 'rgba(88,166,255,0.12)', color: '#58a6ff', padding: '10px', borderRadius: '10px', marginRight: '14px', flexShrink: 0 }}>
              <Activity size={16} />
            </div>
            <div>
              <div className="font-medium" style={{ fontSize: '14px', marginBottom: '2px' }}>Overstock Alert</div>
              <div className="text-muted" style={{ fontSize: '12px' }}>AirPods Max is 40% above target</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;

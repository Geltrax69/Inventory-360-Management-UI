import React from 'react';
import { BarChart2, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, LineChart, Line, CartesianGrid } from 'recharts';

const Analytics = () => {
  const performanceData = [
    { name: 'Jan', value: 85 }, { name: 'Feb', value: 88 },
    { name: 'Mar', value: 92 }, { name: 'Apr', value: 84 },
    { name: 'May', value: 95 }, { name: 'Jun', value: 98 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Accessories', value: 300 },
    { name: 'Wearables', value: 300 },
    { name: 'Audio', value: 200 },
  ];

  return (
    <div className="view-container reveal-animation" style={{ '--animation-order': 1 }}>
      <div className="view-header">
        <div>
          <h2 className="view-title">Analytics</h2>
          <p className="view-subtitle">Deep dive into performance metrics and forecasting</p>
        </div>
        <div className="view-actions">
          <button className="btn-secondary"><Download size={16} /> Export PDF</button>
        </div>
      </div>

      <div className="charts-grid-main">
        <div className="card reveal-animation" style={{ '--animation-order': 2 }}>
          <div className="card-header">
            <h3 className="card-title">Fulfillment Rate Trend</h3>
            <span className="badge-success"><TrendingUp size={14} style={{display:'inline'}}/> +4.2%</span>
          </div>
          <div className="chart-container" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dx={-10} domain={[80, 100]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Line type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: 'var(--bg-sidebar)' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card reveal-animation" style={{ '--animation-order': 3 }}>
          <div className="card-header">
            <h3 className="card-title">Holding Costs by Category</h3>
          </div>
          <div className="chart-container" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="value" fill="var(--text-main)" radius={[4, 4, 0, 0]} barSize={40}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--danger)' : 'var(--text-sidebar)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

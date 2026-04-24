import React from 'react';

const SkeletonView = ({ type }) => {
  if (type === 'dashboard') {
    return (
      <div className="dashboard-content" style={{ padding: '32px 48px' }}>
        <div className="kpi-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div className="skeleton" style={{ height: '14px', width: '60%', borderRadius: '4px' }} />
                <div className="skeleton" style={{ height: '32px', width: '32px', borderRadius: '8px' }} />
              </div>
              <div className="skeleton" style={{ height: '32px', width: '40%', borderRadius: '6px', marginBottom: '12px' }} />
              <div className="skeleton" style={{ height: '12px', width: '50%', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
        <div className="charts-grid-main">
          <div className="card">
            <div className="card-header">
               <div className="skeleton" style={{ height: '20px', width: '30%', borderRadius: '4px' }} />
            </div>
            <div className="skeleton" style={{ height: '260px', width: '100%', borderRadius: '12px' }} />
          </div>
          <div className="card">
            <div className="card-header">
               <div className="skeleton" style={{ height: '20px', width: '40%', borderRadius: '4px' }} />
            </div>
            <div className="skeleton" style={{ height: '260px', width: '100%', borderRadius: '12px' }} />
          </div>
        </div>
      </div>
    );
  }

  // Default table-based skeleton
  return (
    <div className="view-container">
      <div className="view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div style={{ width: '50%' }}>
          <div className="skeleton" style={{ height: '36px', width: '40%', marginBottom: '8px', borderRadius: '6px' }} />
          <div className="skeleton" style={{ height: '16px', width: '60%', borderRadius: '4px' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="skeleton" style={{ height: '36px', width: '100px', borderRadius: '10px' }} />
          <div className="skeleton" style={{ height: '36px', width: '120px', borderRadius: '10px' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
         <div className="skeleton" style={{ height: '40px', width: '400px', borderRadius: '10px' }} />
         <div className="skeleton" style={{ height: '40px', width: '100px', borderRadius: '10px' }} />
      </div>

      <div className="table-container">
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '20px' }}>
           {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className="skeleton" style={{ height: '14px', flex: 1, borderRadius: '4px' }} />
           ))}
        </div>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '20px', alignItems: 'center' }}>
             <div style={{ flex: 1 }}>
               <div className="skeleton" style={{ height: '16px', width: '80%', marginBottom: '8px', borderRadius: '4px' }} />
               <div className="skeleton" style={{ height: '12px', width: '50%', borderRadius: '4px' }} />
             </div>
             <div className="skeleton" style={{ height: '16px', flex: 1, borderRadius: '4px' }} />
             <div className="skeleton" style={{ height: '24px', flex: 1, borderRadius: '12px' }} />
             <div className="skeleton" style={{ height: '16px', flex: 1, borderRadius: '4px' }} />
             <div className="skeleton" style={{ height: '32px', flex: 1, borderRadius: '8px', maxWidth: '80px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonView;

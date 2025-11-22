import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/analytics/dashboard');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error:', error);
      setStats({
        totalSales: 0,
        totalProcurement: 0,
        profit: 0,
        lowStockCount: 0,
        salesCount: 0,
        procurementCount: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <div className="loading-text">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="brand-logo">GC</div>
            <div className="brand-text">
              <h1>GCDL</h1>
              <p>Management System</p>
            </div>
          </div>
          
          <div className="navbar-user">
            <div className="user-info">
              <div className="user-name">{user?.full_name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back, {user?.full_name}! Here's what's happening with your business today.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card" style={{'--stat-color': '#10b981'}}>
            <div className="stat-header">
              <div className="stat-info">
                <h3>💰 Total Sales</h3>
                <div className="stat-value">{formatCurrency(stats?.totalSales)}</div>
              </div>
              <div className="stat-icon icon-green">📈</div>
            </div>
            <div className="stat-footer">+12.5% from last month</div>
          </div>

          <div className="stat-card" style={{'--stat-color': '#3b82f6'}}>
            <div className="stat-header">
              <div className="stat-info">
                <h3>🛒 Procurement</h3>
                <div className="stat-value">{formatCurrency(stats?.totalProcurement)}</div>
              </div>
              <div className="stat-icon icon-blue">📦</div>
            </div>
            <div className="stat-footer">{stats?.procurementCount} orders processed</div>
          </div>

          <div className="stat-card" style={{'--stat-color': '#8b5cf6'}}>
            <div className="stat-header">
              <div className="stat-info">
                <h3>💎 Net Profit</h3>
                <div className="stat-value">{formatCurrency(stats?.profit)}</div>
              </div>
              <div className="stat-icon icon-purple">💰</div>
            </div>
            <div className="stat-footer">Excellent margin performance</div>
          </div>

          <div className="stat-card" style={{'--stat-color': '#ef4444'}}>
            <div className="stat-header">
              <div className="stat-info">
                <h3>⚠️ Low Stock</h3>
                <div className="stat-value">{stats?.lowStockCount}</div>
              </div>
              <div className="stat-icon icon-red">📊</div>
            </div>
            <div className="stat-footer">Items need restocking</div>
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
            <p className="section-description">Access key features and manage your operations</p>
          </div>

          <div className="action-grid">
            <div className="action-card" onClick={() => toast.info('Procurement module coming soon!')}>
              <div className="action-icon">🛒</div>
              <h3 className="action-title">Procurement</h3>
              <p className="action-description">Record new purchases and manage suppliers</p>
            </div>

            <div className="action-card" onClick={() => toast.info('Sales module coming soon!')}>
              <div className="action-icon">💰</div>
              <h3 className="action-title">Sales</h3>
              <p className="action-description">Process transactions and generate receipts</p>
            </div>

            <div className="action-card" onClick={() => toast.info('Stock module coming soon!')}>
              <div className="action-icon">📦</div>
              <h3 className="action-title">Stock</h3>
              <p className="action-description">Monitor inventory and track levels</p>
            </div>

            <div className="action-card" onClick={() => toast.info('Credit module coming soon!')}>
              <div className="action-icon">💳</div>
              <h3 className="action-title">Credit Sales</h3>
              <p className="action-description">Manage credit and track payments</p>
            </div>

            <div className="action-card" onClick={() => toast.info('Analytics module coming soon!')}>
              <div className="action-icon">📊</div>
              <h3 className="action-title">Analytics</h3>
              <p className="action-description">View reports and business insights</p>
            </div>

            <div className="action-card" onClick={() => toast.info('Reports module coming soon!')}>
              <div className="action-icon">📄</div>
              <h3 className="action-title">Reports</h3>
              <p className="action-description">Generate PDF and Excel reports</p>
            </div>
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">Business Metrics</h2>
          </div>

          <div className="quick-stats">
            <div className="quick-stat-item">
              <div className="quick-stat-label">Sales Transactions</div>
              <div className="quick-stat-value">{stats?.salesCount || 0}</div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-label">Purchase Orders</div>
              <div className="quick-stat-value">{stats?.procurementCount || 0}</div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-label">Active Branches</div>
              <div className="quick-stat-value">2</div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-label">Product Types</div>
              <div className="quick-stat-value">6</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
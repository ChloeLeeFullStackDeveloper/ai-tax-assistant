import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaxFormWizard from './pages/TaxFormWizard';
import TaxReportPage from './pages/TaxReportPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import TaxAssistantPage from './pages/TaxAssistantPage';
function App() {
  return (
    <Router>
      <div className="p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tax Prep AI</h1>
          <nav className="space-x-4">
            <Link to="/">Dashboard</Link>
            <Link to="/tax-wizard">Enter Tax Info</Link>
            <Link to="/tax-report">Tax Report</Link>
            <Link to="/history">History</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tax-wizard" element={<TaxFormWizard />} />
          <Route path="/tax-report" element={<TaxReportPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/assistant" element={<TaxAssistantPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

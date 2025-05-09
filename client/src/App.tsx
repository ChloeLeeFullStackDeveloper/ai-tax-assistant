import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TaxFormWizard from './pages/TaxFormWizard';
import TaxReportPage from './pages/TaxReportPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import TaxAssistantPage from './pages/TaxAssistantPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider, useAuth } from './components/AuthContext';
import Navbar from './components/Navbar'; 


function App() {
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return <>{user ? children : <Navigate to="/auth" />}</>;
  };
  
  return (
    <Router>
      <AuthProvider>
        <div className="p-4">
          <Navbar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tax-wizard" element={<TaxFormWizard />} />
            <Route path="/tax-report" element={<TaxReportPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/assistant" element={<ProtectedRoute><TaxAssistantPage /></ProtectedRoute>} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

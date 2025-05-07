import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaxAssistantPage from './pages/TaxAssistantPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow py-4 mb-6">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-700">AI Tax Prep Tool</h1>
            <nav className="space-x-4">
              <Link to="/" className="text-blue-600 hover:underline">Home</Link>
              <Link to="/history" className="text-blue-600 hover:underline">History</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<TaxAssistantPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

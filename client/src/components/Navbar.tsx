import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-blue-600 font-bold text-xl">Tax Prep AI</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/tax-info" className="hover:text-blue-600">Enter Tax Info</Link>
        <Link to="/tax-report" className="hover:text-blue-600">Tax Report</Link>
      </div>
    </nav>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('Logged out successfully');
    } catch (err) {
      alert(`Logout failed: ${(err as any).message}`);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow">
      <h1 className="text-2xl font-bold text-gray-800">Tax Prep AI</h1>
      <div className="flex items-center gap-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link to="/tax-wizard" className="text-blue-600 hover:underline">
          Enter Tax Info
        </Link>
        <Link to="/tax-report" className="text-blue-600 hover:underline">
          Tax Report
        </Link>
        <Link to="/history" className="text-blue-600 hover:underline">
          History
        </Link>

        {user ? (
          <>
            <span className="text-sm text-gray-700">👋 {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

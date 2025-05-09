import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';

const AuthPage: React.FC = () => {
  const { signup, login } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        await login(email, password);
        alert('Logged in successfully!');
      } else {
        await signup(email, password);
        alert('Account created!');
      }
    } catch (error: any) {
      alert(`Auth failed: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white border border-gray-300 rounded-lg p-8 shadow">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Tax Prep AI</h1>
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isLoginMode ? 'Login' : 'Signup'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLoginMode ? 'Login' : 'Signup'}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        {isLoginMode ? (
          <>
            Don’t have an account?{' '}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsLoginMode(false)}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsLoginMode(true)}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

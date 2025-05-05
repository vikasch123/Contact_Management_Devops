import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (email === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }
    
    // Show success message (since we're not actually logging in)
    setError(null);
    alert('Login would be processed here in a real app.\nSince this is a frontend-only demo, no actual authentication occurs.');
    
    // Clear form
    setUser({
      email: '',
      password: ''
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-indigo-100 p-3 rounded-full">
          <LogIn className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Account Login</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            className="form-input"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="w-full btn btn-primary">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
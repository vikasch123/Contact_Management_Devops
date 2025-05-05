import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (name === '' || email === '' || password === '') {
      setError('Please enter all fields');
      return;
    }
    
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    
    // Show success message (since we're not actually registering)
    setError(null);
    alert('Registration would be processed here in a real app.\nSince this is a frontend-only demo, no actual registration occurs.');
    
    // Clear form
    setUser({
      name: '',
      email: '',
      password: '',
      password2: ''
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-indigo-100 p-3 rounded-full">
          <UserPlus className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Account Register</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            className="form-input"
            required
          />
        </div>
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
        <div className="mb-4">
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
            minLength={6}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={password2}
            onChange={onChange}
            className="form-input"
            required
            minLength={6}
          />
        </div>
        <button type="submit" className="w-full btn btn-primary">
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
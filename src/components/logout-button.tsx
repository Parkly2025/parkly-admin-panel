// src/components/LogoutButton.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action to clear the authentication state
    dispatch(logout());
    // Optionally, clear any authentication tokens stored in localStorage, cookies, etc.
    // localStorage.removeItem('authToken');
    
    // Navigate to the login page
    navigate('/login', { replace: true });
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
      Logout
    </button>
  );
};

import { useState, useEffect } from 'react';

const ACCESS_PASSWORD = import.meta.env?.VITE_ACCESS_PASSWORD || '8888';
const AUTH_STORAGE_KEY = 'invoice_doubler_auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputCode === ACCESS_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, inputCode);
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('通行碼錯誤');
      setInputCode('');
      if (navigator.vibrate) navigator.vibrate(200);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    inputCode,
    setInputCode,
    errorMsg,
    isLoading,
    login,
    logout,
  };
};

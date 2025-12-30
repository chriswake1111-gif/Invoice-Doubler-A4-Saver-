import React, { useState, useEffect } from 'react';
import DropZone from './components/DropZone';
import A4Preview from './components/A4Preview';
import Toolbar from './components/Toolbar';
import { ImageSettings, DEFAULT_SETTINGS } from './types';
import { Scissors, Lock, ArrowRight, AlertCircle } from 'lucide-react';

// Get password from environment variable or default to '8888'
// Use optional chaining for import.meta.env to prevent runtime errors if env is undefined
const ACCESS_PASSWORD = import.meta.env?.VITE_ACCESS_PASSWORD || '8888';
const AUTH_STORAGE_KEY = 'invoice_doubler_auth';

const App: React.FC = () => {
  // --- Auth State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // --- App State ---
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [settings, setSettings] = useState<ImageSettings>(DEFAULT_SETTINGS);

  // Check login status on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // --- Auth Handlers ---
  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputCode === ACCESS_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, inputCode);
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('通行碼錯誤');
      setInputCode('');
      // Vibrate if on mobile
      if (navigator.vibrate) navigator.vibrate(200);
    }
  };

  // --- App Handlers ---
  const handleImageLoad = (src: string) => {
    setImageSrc(src);
    setSettings(DEFAULT_SETTINGS);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClear = () => {
    if (confirm("確定要移除目前的圖片嗎？")) {
      setImageSrc(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setImageSrc(null);
  };

  // Global paste listener
  useEffect(() => {
    if (!isAuthenticated) return; // Only listen if logged in

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const blob = item.getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                setImageSrc(event.target.result as string);
              }
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isAuthenticated]);

  // Prevent flash of content
  if (isLoading) return null;

  // --- Render Lock Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-slate-100 animate-fade-in text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Lock size={32} strokeWidth={1.5} />
          </div>
          
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            需要權限
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            此工具僅供內部使用，請輸入通行碼。
          </p>

          <form onSubmit={handleLogin} className="relative">
            <input
              type="password" // Use type="tel" or "number" if you want numeric keypad on mobile, but password is safer visually
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="請輸入通行碼"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-lg tracking-widest outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all mb-4"
              autoFocus
            />
            
            <button
              type="submit"
              disabled={!inputCode}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              進入系統 <ArrowRight size={16} />
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-500 text-sm animate-bounce">
              <AlertCircle size={14} />
              {errorMsg}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-slate-300 text-[10px] tracking-[0.2em] uppercase font-medium">
              Made by ChrisChiu
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Main App ---
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header - Hidden on Print */}
      {!imageSrc && (
        <header className="p-6 text-center no-print flex flex-col items-center relative">
          {/* Logout Button (Small, top right) */}
          <button 
            onClick={handleLogout}
            className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 text-xs uppercase tracking-wider transition-colors"
          >
            登出
          </button>

          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center justify-center gap-2">
            <Scissors className="text-blue-600" />
            出貨單排版小幫手
          </h1>
          <p className="text-slate-500 mt-2">
            省紙模式：自動將一張截圖變為 A4 兩張 (上下對齊)
          </p>
          
          {/* Minimalist Footer / Credits */}
          <p className="text-slate-400 text-[10px] mt-6 font-medium tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity select-none cursor-default">
            Made by ChrisChiu
          </p>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 pb-32 print:p-0 print:m-0">
        
        {!imageSrc ? (
          <DropZone onImageLoad={handleImageLoad} />
        ) : (
          <div className="w-full max-w-4xl animate-fade-in print:w-auto print:max-w-none">
             <div className="mb-4 text-center no-print text-sm text-slate-500 bg-yellow-50 border border-yellow-200 p-2 rounded-lg inline-block w-full">
                💡 提示：使用下方工具列調整<b>縮放</b>與<b>位置</b>，將多餘的螢幕畫面隱藏。
             </div>
             
             {/* The A4 Container Wrapper */}
             <div className="w-full overflow-auto flex justify-center bg-slate-200/50 p-4 rounded-xl border border-slate-300 print:bg-transparent print:p-0 print:border-none print:overflow-visible">
               <div className="scale-[0.6] md:scale-[0.8] lg:scale-100 origin-top transition-transform print:scale-100 print:transform-none">
                  <A4Preview imageSrc={imageSrc} settings={settings} />
               </div>
             </div>
          </div>
        )}

      </main>

      {/* Footer / Controls */}
      <Toolbar 
        settings={settings} 
        setSettings={setSettings} 
        onPrint={handlePrint}
        onClear={handleClear}
        hasImage={!!imageSrc}
      />

    </div>
  );
};

export default App;
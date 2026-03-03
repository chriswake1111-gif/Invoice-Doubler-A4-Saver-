import React, { useState } from 'react';
import DropZone from './components/DropZone';
import A4Preview from './components/A4Preview';
import Toolbar from './components/Toolbar';
import LockScreen from './components/LockScreen';
import { ImageSettings, DEFAULT_SETTINGS } from './types';
import { Scissors } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { usePasteImage } from './hooks/usePasteImage';

const App: React.FC = () => {
  // --- Hooks ---
  const {
    isAuthenticated,
    inputCode,
    setInputCode,
    errorMsg,
    isLoading,
    login,
    logout,
  } = useAuth();

  // --- App State ---
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [settings, setSettings] = useState<ImageSettings>(DEFAULT_SETTINGS);

  // --- Event Listeners ---
  usePasteImage(setImageSrc, isAuthenticated);

  // --- Handlers ---
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
    logout();
    setImageSrc(null);
  };

  // Prevent flash of content
  if (isLoading) return null;

  // --- Render Lock Screen ---
  if (!isAuthenticated) {
    return (
      <LockScreen
        inputCode={inputCode}
        setInputCode={setInputCode}
        errorMsg={errorMsg}
        onLogin={login}
      />
    );
  }

  // --- Render Main App ---
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header - Hidden on Print */}
      {!imageSrc && (
        <header className="p-6 text-center no-print flex flex-col items-center relative">
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
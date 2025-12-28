import React, { useState, useEffect, useCallback } from 'react';
import DropZone from './components/DropZone';
import A4Preview from './components/A4Preview';
import Toolbar from './components/Toolbar';
import { ImageSettings, DEFAULT_SETTINGS } from './types';
import { Scissors } from 'lucide-react';

const App: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [settings, setSettings] = useState<ImageSettings>(DEFAULT_SETTINGS);

  const handleImageLoad = (src: string) => {
    setImageSrc(src);
    // Reset settings slightly when new image loads, but maybe keep some preferences?
    // For now, reset to default ensures clean state.
    setSettings(DEFAULT_SETTINGS);
  };

  const handlePrint = () => {
    // Determine if we are likely on a mobile device or a browser that might block print
    // Simple window.print() is usually sufficient.
    window.print();
  };

  const handleClear = () => {
    if (confirm("確定要移除目前的圖片嗎？")) {
      setImageSrc(null);
    }
  };

  // Global paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // If we already have an image, we might want to ask or just replace.
      // Let's replace for speed.
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header - Hidden on Print */}
      {!imageSrc && (
        <header className="p-6 text-center no-print">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center justify-center gap-2">
            <Scissors className="text-blue-600" />
            出貨單排版小幫手
          </h1>
          <p className="text-slate-500 mt-2">
            省紙模式：自動將一張截圖變為 A4 兩張 (上下對齊)
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
               {/* 
                 CRITICAL FIX: 
                 remove scale and transform during print. 
                 The parent wrapper might have transforms, so we reset them with print:transform-none 
               */}
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
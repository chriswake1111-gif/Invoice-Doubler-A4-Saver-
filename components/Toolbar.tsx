import React from 'react';
import { ImageSettings, DEFAULT_SETTINGS } from '../types';
import { Printer, RefreshCw, Trash2, ZoomIn, Move, Sun, ArrowUpFromLine } from 'lucide-react';

interface ToolbarProps {
  settings: ImageSettings;
  setSettings: React.Dispatch<React.SetStateAction<ImageSettings>>;
  onPrint: () => void;
  onClear: () => void;
  hasImage: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ settings, setSettings, onPrint, onClear, hasImage }) => {
  
  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const updateSetting = (key: keyof ImageSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!hasImage) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-50 no-print flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
      
      {/* Controls Group */}
      <div className="flex flex-1 gap-6 items-center overflow-x-auto w-full md:w-auto pb-2 md:pb-0 px-2">
        
        {/* Scale / Zoom */}
        <div className="flex flex-col gap-1 min-w-[120px]">
          <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold uppercase tracking-wider">
            <ZoomIn size={14} /> 縮放 (寬度)
          </div>
          <input
            type="range"
            min="50"
            max="200"
            value={settings.zoom}
            onChange={(e) => updateSetting('zoom', Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Position Y */}
        <div className="flex flex-col gap-1 min-w-[120px]">
          <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold uppercase tracking-wider">
            <Move size={14} /> 上下位置
          </div>
          <input
            type="range"
            min="-200"
            max="200"
            value={settings.y}
            onChange={(e) => updateSetting('y', Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

         {/* Gap */}
         <div className="flex flex-col gap-1 min-w-[120px]">
          <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold uppercase tracking-wider">
            <ArrowUpFromLine size={14} /> 中間間距
          </div>
          <input
            type="range"
            min="0"
            max="150"
            value={settings.gap}
            onChange={(e) => updateSetting('gap', Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Enhancement */}
        <div className="flex flex-col gap-1 min-w-[120px]">
          <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold uppercase tracking-wider">
            <Sun size={14} /> 對比度
          </div>
          <input
            type="range"
            min="50"
            max="150"
            value={settings.contrast}
            onChange={(e) => updateSetting('contrast', Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={handleReset}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          title="重置設定"
        >
          <RefreshCw size={20} />
        </button>
        <button 
          onClick={onClear}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          title="清除圖片"
        >
          <Trash2 size={20} />
        </button>
        <button 
          onClick={onPrint}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Printer size={20} />
          列印出貨單
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
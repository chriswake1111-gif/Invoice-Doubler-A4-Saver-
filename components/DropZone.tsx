import React, { useRef, useState } from 'react';
import { Upload, ClipboardPaste, ImagePlus } from 'lucide-react';

interface DropZoneProps {
  onImageLoad: (dataUrl: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onImageLoad }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageLoad(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handlePaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        if (item.types.some(type => type.startsWith('image/'))) {
          const blob = await item.getType(item.types.find(type => type.startsWith('image/'))!);
          const file = new File([blob], "pasted-image.png", { type: blob.type });
          processFile(file);
          return;
        }
      }
      alert("剪貼簿中沒有圖片，請先 Print Screen 或複製圖片");
    } catch (err) {
      // Fallback for older browsers or permission issues: tell user to Ctrl+V
      alert("請直接按下 Ctrl+V 貼上圖片");
    }
  };

  return (
    <div 
      className={`
        w-full max-w-2xl mx-auto mt-20 p-12 border-4 border-dashed rounded-3xl text-center transition-all duration-300
        ${isDragging ? 'border-blue-500 bg-blue-50 scale-105' : 'border-slate-300 bg-white hover:border-slate-400'}
      `}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 p-4 rounded-full text-blue-600">
          <ImagePlus size={48} />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-3">
        將 Print Screen 圖片貼上這裡
      </h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        直接按下 <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-sm font-sans font-semibold text-slate-700">Ctrl + V</kbd> 貼上截圖，或將檔案拖拉至此處。
        <br/><span className="text-xs text-slate-400 mt-2 block">系統將自動排版為 A4 一式兩份</span>
      </p>

      <div className="flex justify-center gap-4">
        <button 
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-900 transition-colors"
        >
          <Upload size={18} />
          上傳圖片
        </button>
        <button 
          onClick={handlePaste}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <ClipboardPaste size={18} />
          貼上圖片
        </button>
      </div>

      <input 
        type="file" 
        ref={inputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default DropZone;
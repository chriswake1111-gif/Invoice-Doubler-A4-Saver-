import React from 'react';
import { ImageSettings } from '../types';

interface A4PreviewProps {
  imageSrc: string;
  settings: ImageSettings;
}

const A4Preview: React.FC<A4PreviewProps> = ({ imageSrc, settings }) => {
  // A4 dimensions in mm: 210mm x 297mm

  // Inline styles for the image manipulation
  const imageStyle: React.CSSProperties = {
    width: `${settings.zoom}%`,
    transform: `translate(${settings.x}px, ${settings.y}px)`,
    filter: `brightness(${settings.brightness}%) contrast(${settings.contrast}%)`,
    maxWidth: 'none', // Allow it to exceed container if zoomed
    display: 'block',
    objectPosition: 'top center', // 自動對齊上方
  };

  return (
    <div className="print-container bg-white shadow-2xl mx-auto relative flex flex-col items-center overflow-hidden">
      {/* Top Half */}
      <div
        className="w-full flex-1 overflow-hidden relative border-b border-dashed border-slate-100 no-print-border"
      >
        <div className="w-full h-full flex justify-center items-start overflow-hidden">
          <img
            src={imageSrc}
            alt="Invoice Top"
            className="object-cover transition-all duration-200 ease-out select-none"
            style={imageStyle}
            draggable={false}
          />
        </div>
        <div className="absolute top-2 left-2 bg-slate-100 text-slate-400 text-[10px] px-2 py-0.5 rounded opacity-50 no-print pointer-events-none font-medium uppercase tracking-wider">
          上半部 (Original)
        </div>
      </div>

      {/* Divider Gap & Center Line */}
      <div
        style={{ height: `${settings.gap}px` }}
        className="w-full flex-shrink-0 bg-white relative flex items-center justify-center no-print-border"
      >
        {/* The Visual Guide Line - Center of the gap */}
        <div className="w-full border-t border-dashed border-slate-300 no-print relative">
          <span className="absolute left-1/2 -top-2 -translate-x-1/2 bg-white px-3 text-[9px] text-slate-400 font-bold tracking-[0.2em] uppercase whitespace-nowrap">
            Center / Cut Line
          </span>
        </div>
      </div>

      {/* Bottom Half */}
      <div
        className="w-full flex-1 overflow-hidden relative"
      >
        <div className="w-full h-full flex justify-center items-start overflow-hidden">
          <img
            src={imageSrc}
            alt="Invoice Bottom"
            className="object-cover transition-all duration-200 ease-out select-none"
            style={imageStyle}
            draggable={false}
          />
        </div>

        {/* Duplicate Stamp */}
        {settings.showStamp && (
          <div className="absolute bottom-12 right-12 z-10 pointer-events-none animate-in fade-in zoom-in duration-300">
            <div className="relative border-[4px] border-red-600/80 px-4 py-1 rounded-sm rotate-[-12deg] flex items-center justify-center">
              {/* Wavy border effect using multiple shadows or pseudo-elements */}
              <div className="absolute inset-0 border-[1px] border-red-600/30 scale-110 rounded-sm"></div>
              <span className="text-3xl font-black text-red-600/80 tracking-[0.4em] translate-x-1 drop-shadow-[1px_1px_rgba(220,38,38,0.2)]">
                副本
              </span>
            </div>
          </div>
        )}

        <div className="absolute bottom-2 left-2 bg-slate-100 text-slate-400 text-[10px] px-2 py-0.5 rounded opacity-50 no-print pointer-events-none font-medium uppercase tracking-wider">
          下半部 (Copy)
        </div>
      </div>
    </div>
  );
};

export default A4Preview;
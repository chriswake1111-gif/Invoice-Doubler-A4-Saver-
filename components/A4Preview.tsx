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
  };

  return (
    <div className="print-container bg-white shadow-2xl mx-auto relative flex flex-col items-center overflow-hidden">
        {/* We use a strict aspect ratio for on-screen preview if needed, but the fixed width/height in CSS handles A4 logic */}
        
        {/* Top Half */}
        <div 
          className="w-full flex-1 overflow-hidden relative border-b border-dashed border-slate-200 no-print-border" 
        >
          <div className="w-full h-full flex justify-center items-center overflow-hidden">
             <img 
               src={imageSrc} 
               alt="Invoice Top" 
               className="object-contain transition-all duration-200 ease-out select-none"
               style={imageStyle}
               draggable={false}
             />
          </div>
          <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded opacity-50 no-print pointer-events-none">
            上半部 (Top)
          </div>
        </div>

        {/* Divider Gap (Visual only on screen, spacing in print) */}
        <div style={{ height: `${settings.gap}px` }} className="w-full flex-shrink-0 bg-white"></div>

        {/* Bottom Half */}
        <div 
          className="w-full flex-1 overflow-hidden relative"
        >
          <div className="w-full h-full flex justify-center items-center overflow-hidden">
             <img 
               src={imageSrc} 
               alt="Invoice Bottom" 
               className="object-contain transition-all duration-200 ease-out select-none"
               style={imageStyle}
               draggable={false}
             />
          </div>
          <div className="absolute bottom-2 left-2 bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded opacity-50 no-print pointer-events-none">
            下半部 (Copy)
          </div>
        </div>
    </div>
  );
};

export default A4Preview;
import React from 'react';
import { X, ScanLine, Download } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
  onScanClick?: () => void; // Optional action to switch to scanner
  title?: string;
  description?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, onClose, onScanClick, title, description }) => {
  if (!isOpen || !imageUrl) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Download failed", e);
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-sm w-full animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-gray-800">{title || 'QR Code'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Image Container */}
        <div className="p-6 flex flex-col items-center justify-center bg-gray-50">
          <img 
            src={imageUrl} 
            alt="QR Display" 
            className="w-64 h-64 object-contain rounded-lg shadow-lg border-4 border-white"
          />
          {(description === undefined || description !== '') && (
             <p className="mt-4 text-sm text-gray-500 text-center">
               {description || 'Quét mã này để kết nối'}
             </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t flex gap-3">
          <button 
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            <Download size={18} />
            <span>Lưu</span>
          </button>
          
          {onScanClick && (
            <button 
              onClick={() => {
                onClose();
                onScanClick();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-blue-200 shadow-lg"
            >
              <ScanLine size={18} />
              <span>Quét Mã</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
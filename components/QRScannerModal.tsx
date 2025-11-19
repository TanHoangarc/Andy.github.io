import React, { useEffect, useRef, useState } from 'react';
import { X, Camera, AlertCircle } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose, label }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (!isOpen) return;
      setError(null);
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsStreaming(true);
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Không thể truy cập camera. Vui lòng cấp quyền.");
      }
    };

    if (isOpen) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsStreaming(false);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 animate-fade-in">
      <div className="relative w-full max-w-md h-full flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 text-white bg-black bg-opacity-50 absolute top-0 w-full z-10">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Camera size={20} /> {label}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Camera Viewport */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
          {!error ? (
            <>
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover" 
                playsInline 
                muted 
              />
              {/* Scan Overlay */}
              <div className="relative z-10 w-64 h-64 border-2 border-white/50 rounded-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-green-500"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-green-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-green-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-green-500"></div>
                <div className="w-full h-1 bg-green-500 absolute top-0 animate-[scan_2s_infinite]"></div>
              </div>
              <p className="absolute bottom-20 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                Di chuyển camera đến mã QR
              </p>
            </>
          ) : (
            <div className="text-white flex flex-col items-center p-8 text-center">
              <AlertCircle size={48} className="text-red-500 mb-4" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-6 bg-black text-white text-center">
           <p className="text-xs text-gray-400">Tính năng đang chạy thử nghiệm</p>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 1; }
          50% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default QRScannerModal;
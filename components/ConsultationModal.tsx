import React, { useState } from 'react';
import { X, Send, Package, Anchor, Box, Container } from 'lucide-react';
import { Translation } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: Translation['consultationForm'];
  zaloLink: string;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose, translations, zaloLink }) => {
  const [formData, setFormData] = useState({
    goodsType: '',
    pol: '',
    pod: '',
    volume: ''
  });
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `
📢 *YÊU CẦU BÁO GIÁ (QUOTATION REQUEST)*
---------------------------
📦 *${translations.goodsType}:* ${formData.goodsType}
🚩 *${translations.pol}:* ${formData.pol}
🏁 *${translations.pod}:* ${formData.pod}
📊 *${translations.volume}:* ${formData.volume}
---------------------------
Mong nhận được phản hồi sớm!
    `.trim();

    try {
      await navigator.clipboard.writeText(message);
      setIsCopied(true);
      
      // Show copied feedback briefly then open Zalo
      setTimeout(() => {
        window.open(zaloLink, '_blank');
        setIsCopied(false);
        // onClose(); // Optional: keep open or close
      }, 1000);
      
    } catch (err) {
      console.error("Clipboard failed", err);
      window.open(zaloLink, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in p-4">
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8b004f] to-[#b20066] p-4 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Container size={20} />
            {translations.title}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto no-scrollbar">
          
          {/* Goods Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Package size={16} className="text-blue-600" /> {translations.goodsType}
            </label>
            <input
              required
              type="text"
              name="goodsType"
              value={formData.goodsType}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ex: Garments, Furniture, etc."
            />
          </div>

          {/* POL */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Anchor size={16} className="text-blue-600" /> {translations.pol}
            </label>
            <input
              required
              type="text"
              name="pol"
              value={formData.pol}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ex: Cat Lai, Hai Phong..."
            />
          </div>

          {/* POD */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Anchor size={16} className="text-red-600" /> {translations.pod}
            </label>
            <input
              required
              type="text"
              name="pod"
              value={formData.pod}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ex: Los Angeles, Tokyo..."
            />
          </div>

          {/* Volume */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Box size={16} className="text-green-600" /> {translations.volume}
            </label>
            <input
              required
              type="text"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ex: 1x20DC, 5 CBM..."
            />
          </div>

          {/* Status Message */}
          {isCopied && (
             <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm text-center animate-pulse border border-green-200">
               {translations.alertCopied}
             </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#0068FF] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#0056d6] transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            <Send size={20} />
            {translations.submit}
          </button>
          
          <p className="text-xs text-gray-400 text-center mt-2">
            * Thông tin sẽ được copy và chuyển hướng đến Zalo chat
          </p>
        </form>
      </div>
    </div>
  );
};

export default ConsultationModal;
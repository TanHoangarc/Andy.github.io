import React, { useState } from 'react';
import { Phone, Share2, Download, ScanLine, Link2, Home, Briefcase, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { DEFAULT_ASSETS } from './constants';
import { Language, UserProfile, Project } from './types';
import ImageModal from './components/ImageModal';
import QRScannerModal from './components/QRScannerModal';
import ConsultationModal from './components/ConsultationModal';

interface AppProps {
  data: UserProfile;
}

type TabView = 'home' | 'projects';

const App: React.FC<AppProps> = ({ data }) => {
  const [lang, setLang] = useState<Language>('vi');
  const [activeTab, setActiveTab] = useState<TabView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = data.content[lang];

  // State for View QR Modal
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [activeQrUrl, setActiveQrUrl] = useState<string | null>(null);
  const [activeQrTitle, setActiveQrTitle] = useState<string>('');
  const [activeQrDesc, setActiveQrDesc] = useState<string | undefined>(undefined);
  const [activeQrScanEnabled, setActiveQrScanEnabled] = useState(true);

  // State for Scan Camera Modal
  const [scannerOpen, setScannerOpen] = useState(false);

  // State for Consultation Modal
  const [consultationOpen, setConsultationOpen] = useState(false);

  const handleSwitchLang = (l: Language) => setLang(l);

  const handleOpenQr = (url: string, title: string, desc?: string, enableScan: boolean = true) => {
    setActiveQrUrl(url);
    setActiveQrTitle(title);
    setActiveQrDesc(desc);
    setActiveQrScanEnabled(enableScan);
    setQrModalOpen(true);
  };

  const handleSocialClick = (link: typeof data.socialLinks[0]) => {
    if (link.qrImage) {
      handleOpenQr(link.qrImage, link.label);
    } else if (link.href) {
      window.open(link.href, '_blank');
    }
  };

  const downloadVCard = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${data.content.en.title}
N:${data.content.en.title};;;;
TEL;TYPE=CELL:${data.phoneContact}
EMAIL:contact@longhoanglogistics.com
ORG:Long Hoang Logistics
TITLE:${data.content.en.subtitle}
URL:https://www.longhoanglogistics.com
NOTE:${data.content.vi.description[1]}
END:VCARD
    `.trim();
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.title,
          text: t.subtitle,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert('Link đã được copy vào bộ nhớ tạm!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const renderHome = () => (
    <div className="animate-fade-in">
      {/* Avatar Section */}
      <div className="relative inline-block mb-2 group">
        <div className="w-[240px] h-[240px] rounded-full border-4 border-white shadow-2xl overflow-hidden mx-auto bg-gray-200 relative z-10">
          <img 
            src={data.assets.avatar} 
            alt="Avatar" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            onClick={() => handleOpenQr(data.assets.avatar, t.title, '', false)}
          />
        </div>
        {/* QR Code Trigger Button */}
        <button 
          onClick={() => handleOpenQr(data.qrImages.main, 'Personal QR')}
          className="absolute bottom-2 right-4 z-20 bg-white p-2 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
        >
            <img src={data.qrImages.main} alt="QR Small" className="w-14 h-14 object-contain" />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-full shadow-sm">
              <ScanLine size={12} />
            </div>
        </button>
      </div>

      {/* Identity */}
      <h1 className="text-2xl font-bold text-gray-800 mt-4">{t.title}</h1>
      <p className="text-[#357] font-medium mb-6">{t.subtitle}</p>

      {/* Primary Action */}
      <a 
        href={`tel:${data.phoneContact}`} 
        className="flex items-center justify-center gap-3 w-full bg-[#8b004f] text-white py-3.5 px-6 rounded-full shadow-lg hover:bg-[#700040] transition active:scale-95 font-bold text-lg mb-6"
      >
        <Phone className="animate-pulse" size={24} />
        <span>{data.phoneContact}</span>
      </a>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button 
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-gray-100/80 backdrop-blur hover:bg-white py-3 rounded-xl text-gray-700 font-medium shadow-sm transition"
        >
          <Share2 size={18} /> {t.share}
        </button>
        <button 
          onClick={downloadVCard}
          className="flex items-center justify-center gap-2 bg-gray-100/80 backdrop-blur hover:bg-white py-3 rounded-xl text-gray-700 font-medium shadow-sm transition"
        >
          <Download size={18} /> {t.saveContact}
        </button>
      </div>

      {/* Video Section */}
      <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-6 bg-black">
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/J0MAmvy7y8k?si=MqncRvvtpViXuCQT" 
              title="YouTube video player" 
              allowFullScreen
            ></iframe>
          </div>
      </div>
      
      <button 
        onClick={() => setConsultationOpen(true)}
        className="bg-[#0033cc] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-800 transition mb-8 hover:shadow-blue-500/30 w-full"
      >
        {t.consultButton}
      </button>

      {/* Info Box */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-left shadow-sm mb-6 border border-white/50">
        <ul className="space-y-2 text-gray-800 text-sm leading-relaxed">
          {t.description.map((line, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Roles */}
      <div className="space-y-3 mb-8">
        {t.roles.map((role, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-[#f0fff0] p-3 rounded-xl border border-green-100 shadow-sm">
            <img src={data.assets.roleIcon} alt="Role" className="w-10 h-10 rounded-full border border-gray-200" />
            <span className="text-sm font-semibold text-gray-700 flex-1 text-left">{role}</span>
            <Link2 size={16} className="text-gray-400" />
          </div>
        ))}
      </div>

      {/* Social Grid */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-20">
        {data.socialLinks.map((link) => (
          <button 
            key={link.id}
            onClick={() => handleSocialClick(link)}
            className="flex flex-col items-center group"
          >
            <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:-translate-y-1 overflow-hidden">
              <img src={link.iconUrl} alt={link.label} className="w-10 h-10 object-contain" />
            </div>
            <span className="text-xs font-medium text-gray-700">{link.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => {
    if (selectedProject) {
      // Detail View
      return (
        <div className="animate-slide-up text-left mb-24 pt-4">
          <button 
            onClick={() => setSelectedProject(null)}
            className="flex items-center text-gray-600 mb-4 hover:text-[#0033cc] transition bg-white/50 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
            <span className="font-medium">{t.backToProjects}</span>
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
            {selectedProject.title}
          </h2>

          <div className="w-full h-64 rounded-2xl overflow-hidden shadow-md mb-6">
            <img src={selectedProject.thumbnail} alt={selectedProject.title} className="w-full h-full object-cover" />
          </div>

          <div className="bg-white/80 backdrop-blur p-5 rounded-xl border border-gray-100 shadow-sm mb-6">
             <p className="text-gray-700 leading-relaxed whitespace-pre-line">
               {selectedProject.description}
             </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ImageIcon size={18} /> Hình ảnh chi tiết
            </h3>
            {selectedProject.images.length > 0 ? (
              selectedProject.images.map((img, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-sm">
                  <img src={img} alt={`Project detail ${index}`} className="w-full h-auto" />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">Chưa có hình ảnh bổ sung.</p>
            )}
          </div>
        </div>
      );
    }

    // List View
    return (
      <div className="animate-fade-in mb-24 pt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.projectsTitle}</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.projects && data.projects.map((proj) => (
            <button 
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all group text-left flex flex-col h-full"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src={proj.thumbnail} 
                  alt={proj.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                 <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight mb-1">
                   {proj.title}
                 </h3>
                 <div className="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100 flex items-center gap-1">
                    Xem chi tiết <ChevronLeft size={12} className="rotate-180" />
                 </div>
              </div>
            </button>
          ))}
          {(!data.projects || data.projects.length === 0) && (
            <div className="col-span-2 text-center text-gray-500 py-8">
              Không có dự án nào để hiển thị.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5]">
      
      <div className="container max-w-md mx-auto bg-[#B2F2BB] min-h-screen sm:min-h-[calc(100vh-40px)] sm:my-5 sm:rounded-[30px] shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* TOP NAVIGATION */}
        <div className="bg-white/95 backdrop-blur z-30 flex items-center justify-between px-4 h-14 shadow-sm shrink-0 relative">
            {/* Tabs */}
            <div className="flex flex-1 justify-center gap-6 h-full">
                <button 
                    onClick={() => {
                      setActiveTab('home');
                      setSelectedProject(null);
                    }}
                    className={`h-full flex flex-col justify-center px-2 text-sm font-bold uppercase tracking-wide transition-colors relative ${activeTab === 'home' ? 'text-[#8b004f]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <div className="flex items-center gap-2">
                       <Home size={18} /> Home
                    </div>
                    {activeTab === 'home' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8b004f] rounded-t-full"></div>}
                </button>
                <button 
                    onClick={() => setActiveTab('projects')}
                    className={`h-full flex flex-col justify-center px-2 text-sm font-bold uppercase tracking-wide transition-colors relative ${activeTab === 'projects' ? 'text-[#8b004f]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <div className="flex items-center gap-2">
                        <Briefcase size={18} /> Project
                    </div>
                    {activeTab === 'projects' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8b004f] rounded-t-full"></div>}
                </button>
            </div>

            {/* Language Switcher - Integrated */}
            <div className="flex gap-2 absolute right-4">
                <button 
                  onClick={() => handleSwitchLang('vi')}
                  className={`w-7 h-5 rounded overflow-hidden transition-transform hover:scale-110 ${lang === 'vi' ? 'ring-1 ring-green-500' : 'opacity-60 grayscale'}`}
                >
                  <img src={DEFAULT_ASSETS.flagVi} alt="Vietnamese" className="w-full h-full object-cover" />
                </button>
                <button 
                  onClick={() => handleSwitchLang('en')}
                  className={`w-7 h-5 rounded overflow-hidden transition-transform hover:scale-110 ${lang === 'en' ? 'ring-1 ring-green-500' : 'opacity-60 grayscale'}`}
                >
                  <img src={DEFAULT_ASSETS.flagEn} alt="English" className="w-full h-full object-cover" />
                </button>
            </div>
        </div>

        {/* Scrollable Content Wrapper */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {/* Cover Image Section - Always visible but scrolls with content if needed, or fixed? 
                Current design: Header fixed, Cover is top of scroll view.
            */}
            <div className="w-full h-48 relative shrink-0">
              <img 
                src={data.assets.cover} 
                alt="Cover Logistics" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#B2F2BB] via-[#B2F2BB]/60 to-transparent"></div>
            </div>

            {/* Main Content Area */}
            <div className="px-6 pb-6 text-center relative z-10 -mt-24 flex-1">
              {activeTab === 'home' ? renderHome() : renderProjects()}
            </div>
        </div>

      </div>

      {/* Modals */}
      <ImageModal 
        isOpen={qrModalOpen} 
        imageUrl={activeQrUrl} 
        onClose={() => setQrModalOpen(false)} 
        onScanClick={activeQrScanEnabled ? () => setScannerOpen(true) : undefined}
        title={activeQrTitle}
        description={activeQrDesc}
      />

      <QRScannerModal 
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        label={t.scanQr}
      />

      <ConsultationModal 
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        translations={t.consultationForm}
        zaloLink={`https://zalo.me/${data.zaloContact}`}
      />
    </div>
  );
};

export default App;
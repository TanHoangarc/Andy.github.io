import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Admin from './Admin';
import { DEFAULT_PROFILE } from './constants';
import { UserProfile } from './types';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const Root = () => {
  const [view, setView] = useState<'app' | 'admin'>('app');
  const [profileData, setProfileData] = useState<UserProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Đánh dấu component đã mount để ẩn loader (nếu cần xử lý thủ công)
    setMounted(true);

    const params = new URLSearchParams(window.location.search);
    
    // Check for Admin Mode
    if (params.get('admin') === 'true') {
      setView('admin');
      document.title = 'NCV Admin Dashboard';
      return;
    }

    // Check for Specific User ID
    const userId = params.get('id');
    if (userId) {
      const stored = localStorage.getItem('ncv_cards_db');
      if (stored) {
        const profiles = JSON.parse(stored) as UserProfile[];
        const found = profiles.find(p => p.id === userId);
        if (found) {
          setProfileData(found);
          document.title = found.content.vi.title;
        }
      }
    }
  }, []);

  // Fallback an toàn nếu có lỗi render
  if (!profileData) return null;

  if (view === 'admin') {
    return <Admin />;
  }

  return <App data={profileData} />;
};

console.log("Starting app...");

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
  console.log("App rendered successfully");
} catch (error) {
  console.error("Error rendering app:", error);
  // Hiển thị lỗi ra màn hình nếu quá trình render thất bại
  rootElement.innerHTML = `<div style="padding: 20px; color: red; text-align: center;">
    <h3>Có lỗi xảy ra khi tải ứng dụng</h3>
    <p>${error instanceof Error ? error.message : String(error)}</p>
  </div>`;
}
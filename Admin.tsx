import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { DEFAULT_PROFILE } from './constants';
import { Trash2, Edit, Eye, Plus, Save, ArrowLeft } from 'lucide-react';

// Mock storage helpers
const STORAGE_KEY = 'ncv_cards_db';

const getProfiles = (): UserProfile[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Seed with default
    const initial = [DEFAULT_PROFILE];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const saveProfiles = (profiles: UserProfile[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

const Admin: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [editForm, setEditForm] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    setProfiles(getProfiles());
  }, []);

  const handleCreateNew = () => {
    const newProfile: UserProfile = {
      ...DEFAULT_PROFILE,
      id: Date.now().toString(),
      name: 'New User',
      content: {
        ...DEFAULT_PROFILE.content,
        vi: { ...DEFAULT_PROFILE.content.vi, title: 'Tên Mới' }
      }
    };
    setEditForm(newProfile);
    setEditingId(newProfile.id);
  };

  const handleEdit = (profile: UserProfile) => {
    setEditForm(profile);
    setEditingId(profile.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa card này?')) {
      const updated = profiles.filter(p => p.id !== id);
      setProfiles(updated);
      saveProfiles(updated);
    }
  };

  const handleSave = () => {
    let updated: UserProfile[];
    if (profiles.some(p => p.id === editForm.id)) {
      updated = profiles.map(p => p.id === editForm.id ? editForm : p);
    } else {
      updated = [...profiles, editForm];
    }
    setProfiles(updated);
    saveProfiles(updated);
    setEditingId(null);
    alert('Đã lưu thành công!');
  };

  // Helper to update deep nested state
  const updateForm = (field: string, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const updateContent = (lang: 'vi' | 'en', field: string, value: any) => {
    setEditForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [lang]: {
          ...prev.content[lang],
          [field]: value
        }
      }
    }));
  };

  const updateAsset = (field: string, value: string) => {
    setEditForm(prev => ({
        ...prev,
        assets: { ...prev.assets, [field]: value }
    }));
  };

  if (editingId) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <button onClick={() => setEditingId(null)} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} className="mr-2" /> Quay lại
            </button>
            <h2 className="text-2xl font-bold">Chỉnh sửa: {editForm.name}</h2>
            <button onClick={handleSave} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              <Save size={20} className="mr-2" /> Lưu lại
            </button>
          </div>

          <div className="space-y-6 h-[80vh] overflow-y-auto pr-2">
            {/* General Settings */}
            <section className="space-y-4">
              <h3 className="font-bold text-lg text-gray-800">Cài đặt chung</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tên quản lý (Admin Name)</label>
                  <input type="text" value={editForm.name} onChange={e => updateForm('name', e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Số điện thoại (Gọi)</label>
                  <input type="text" value={editForm.phoneContact} onChange={e => updateForm('phoneContact', e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700">Số Zalo (Nhận báo giá)</label>
                   <input type="text" value={editForm.zaloContact} onChange={e => updateForm('zaloContact', e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
                </div>
              </div>
            </section>

            {/* Images */}
            <section className="space-y-4 border-t pt-4">
              <h3 className="font-bold text-lg text-gray-800">Hình ảnh (Links)</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                  <input type="text" value={editForm.assets.avatar} onChange={e => updateAsset('avatar', e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ảnh bìa (Cover) URL</label>
                  <input type="text" value={editForm.assets.cover} onChange={e => updateAsset('cover', e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
                </div>
              </div>
            </section>

            {/* Content VI */}
            <section className="space-y-4 border-t pt-4">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <img src={DEFAULT_PROFILE.assets.flagVi} className="w-6 h-4" alt="" /> Nội dung Tiếng Việt
              </h3>
              <div className="space-y-3">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Tên hiển thị</label>
                    <input type="text" value={editForm.content.vi.title} onChange={e => updateContent('vi', 'title', e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 p-2" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Chức danh</label>
                    <input type="text" value={editForm.content.vi.subtitle} onChange={e => updateContent('vi', 'subtitle', e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 p-2" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả (Mỗi dòng cách nhau bởi dấu phẩy)</label>
                    <textarea 
                      value={editForm.content.vi.description.join('\n')} 
                      onChange={e => updateContent('vi', 'description', e.target.value.split('\n'))} 
                      className="mt-1 w-full rounded-md border border-gray-300 p-2 h-24" 
                    />
                 </div>
              </div>
            </section>

             {/* Content EN */}
             <section className="space-y-4 border-t pt-4">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <img src={DEFAULT_PROFILE.assets.flagEn} className="w-6 h-4" alt="" /> English Content
              </h3>
              <div className="space-y-3">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Display Name</label>
                    <input type="text" value={editForm.content.en.title} onChange={e => updateContent('en', 'title', e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 p-2" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input type="text" value={editForm.content.en.subtitle} onChange={e => updateContent('en', 'subtitle', e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 p-2" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Description (Split by newline)</label>
                    <textarea 
                      value={editForm.content.en.description.join('\n')} 
                      onChange={e => updateContent('en', 'description', e.target.value.split('\n'))} 
                      className="mt-1 w-full rounded-md border border-gray-300 p-2 h-24" 
                    />
                 </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý NCV Cards</h1>
          <button 
            onClick={handleCreateNew}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            <Plus size={20} className="mr-2" /> Tạo Card Mới
          </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số ĐT</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profiles.map(profile => (
                <tr key={profile.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={profile.assets.avatar} alt="" className="h-10 w-10 rounded-full object-cover border" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                    <div className="text-sm text-gray-500">{profile.content.vi.subtitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {profile.phoneContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => window.open(`?id=${profile.id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900 p-1" 
                        title="Xem"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEdit(profile)}
                        className="text-indigo-600 hover:text-indigo-900 p-1" 
                        title="Sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(profile.id)}
                        className="text-red-600 hover:text-red-900 p-1" 
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {profiles.length === 0 && (
            <div className="p-8 text-center text-gray-500">Chưa có card nào. Hãy tạo mới!</div>
          )}
        </div>
        <div className="mt-4 text-center text-gray-500 text-sm">
            Dữ liệu được lưu trên trình duyệt này (Local Storage).
        </div>
      </div>
    </div>
  );
};

export default Admin;

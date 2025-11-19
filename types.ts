export type Language = 'vi' | 'en';

export interface ConsultationFormTrans {
  title: string;
  goodsType: string;
  pol: string;
  pod: string;
  volume: string;
  submit: string;
  alertCopied: string;
}

export interface Translation {
  title: string;
  subtitle: string;
  description: string[];
  consultButton: string;
  roles: string[];
  saveContact: string;
  share: string;
  scanQr: string;
  close: string;
  consultationForm: ConsultationFormTrans;
  projectsTitle: string; // New
  backToProjects: string; // New
}

export interface SocialLink {
  id: string;
  iconUrl: string;
  label: string;
  href?: string;
  qrImage?: string;
  isAction?: boolean;
}

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  images: string[]; // List of detailed images
}

export interface ContentData {
  vi: Translation;
  en: Translation;
}

// New Interface for a complete User Profile stored in DB
export interface UserProfile {
  id: string;
  name: string; // Internal reference name
  assets: {
    avatar: string;
    avatarQr: string;
    cover: string;
    roleIcon: string;
    flagVi?: string;
    flagEn?: string;
  };
  qrImages: {
    main: string;
    wechat?: string;
    vcb?: string;
    whatsapp?: string;
  };
  socialLinks: SocialLink[];
  projects: Project[]; // New field for projects
  content: ContentData;
  zaloContact: string; // Phone number for Zalo logic
  phoneContact: string; // Phone number for Call button
}
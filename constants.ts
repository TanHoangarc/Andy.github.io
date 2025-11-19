import { UserProfile } from './types';

export const DEFAULT_ASSETS = {
  avatar: "https://i.ibb.co/4RKTydDT/Andy.jpg",
  avatarQr: "https://i.ibb.co/P76k1ZV/Andy.jpg",
  cover: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  roleIcon: "https://i.ibb.co/VY0kfHdv/Logo-Nhon-My-700x700-2-150x150.png",
  flagVi: "https://flagcdn.com/w40/vn.png",
  flagEn: "https://flagcdn.com/w40/us.png",
};

export const DEFAULT_QR_IMAGES = {
  main: "https://i.ibb.co/P76k1ZV/Andy.jpg",
  wechat: "https://i.ibb.co/QFSCgkCP/Andy-Wechat.jpg",
  vcb: "https://i.ibb.co/wNnkr6ts/Andy-Vcb.jpg",
  whatsapp: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/84972133680" 
};

export const DEFAULT_SOCIAL_LINKS = [
  {
    id: 'zalo',
    label: 'Zalo',
    iconUrl: "https://i.ibb.co/d4nRhVQV/Zalo.png",
    href: "https://zalo.me/0972133680"
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    iconUrl: "https://i.ibb.co/XxqRB3Qg/Whatsapp.png",
    href: "https://wa.me/0972133680",
    qrImage: DEFAULT_QR_IMAGES.whatsapp
  },
  {
    id: 'wechat',
    label: 'WeChat',
    iconUrl: "https://i.ibb.co/Zz41gSrk/Wechat.png",
    href: "#",
    qrImage: DEFAULT_QR_IMAGES.wechat
  },
  {
    id: 'email',
    label: 'Email',
    iconUrl: "https://i.ibb.co/nqyMXyNM/Email.png",
    href: "mailto:sales1@longhoanglogistics.com"
  },
  {
    id: 'map',
    label: 'Địa Chỉ',
    iconUrl: "https://i.ibb.co/7dTZHSwV/Map.png",
    href: "https://maps.app.goo.gl/ZSVFYotTCuGWNQmW8"
  },
  {
    id: 'website',
    label: 'Website',
    iconUrl: "https://i.ibb.co/Gf69QR4R/Website.png",
    href: "https://www.longhoanglogistics.com"
  },
  {
    id: 'profile',
    label: 'Profile',
    iconUrl: "https://i.ibb.co/VY01h09d/Profile.png",
    href: "https://drive.google.com/file/d/1wyPCBaCLTiUx3aWMwIX3X1WryfnTL-Lp/view?usp=drive_link"
  },
  {
    id: 'facebook',
    label: 'Facebook',
    iconUrl: "https://i.ibb.co/67VF7N5R/Facebook.png",
    href: "https://www.facebook.com/share/1BtMe8vCaB/?mibextid=wwXIfr"
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    iconUrl: "https://i.ibb.co/cStFGVqG/Tiktok.png",
    href: "https://www.tiktok.com/@hoangkimberry"
  },
  {
    id: 'instagram',
    label: 'Instagram',
    iconUrl: "https://i.ibb.co/39gCrw9n/Instagram.png",
    href: "https://www.instagram.com/hoangkimberry"
  },
  {
    id: 'momo',
    label: 'Momo',
    iconUrl: "https://i.ibb.co/KpRgSv04/Momo.png",
    href: "https://nhantien.momo.vn/hoangkimberry"
  },
  {
    id: 'vcb',
    label: 'VCB',
    iconUrl: "https://i.ibb.co/WNDG8rdx/Vietcombank.png",
    href: "#",
    qrImage: DEFAULT_QR_IMAGES.vcb
  },
];

const SAMPLE_PROJECTS = [
  {
    id: 'p1',
    title: 'Vận chuyển siêu trường siêu trọng',
    thumbnail: 'https://images.unsplash.com/photo-1605218427360-69603f64ec80?auto=format&fit=crop&w=800&q=80',
    description: 'Dự án vận chuyển máy móc thiết bị hạng nặng cho nhà máy nhiệt điện. Đảm bảo an toàn tuyệt đối và đúng tiến độ.',
    images: [
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'p2',
    title: 'Air Freight - Hàng xuất khẩu',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    description: 'Xử lý lô hàng xuất khẩu bằng đường hàng không đi thị trường EU/US với thời gian gấp.',
    images: [
      'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'p3',
    title: 'Kho bãi và phân phối',
    thumbnail: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
    description: 'Giải pháp kho bãi thông minh và hệ thống phân phối hàng hóa toàn quốc.',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const DEFAULT_PROFILE: UserProfile = {
  id: 'default',
  name: 'Lâm Ngọc Vũ (Default)',
  phoneContact: '+84972133680',
  zaloContact: '0972133680',
  assets: DEFAULT_ASSETS,
  qrImages: DEFAULT_QR_IMAGES,
  socialLinks: DEFAULT_SOCIAL_LINKS,
  projects: SAMPLE_PROJECTS,
  content: {
    vi: {
      title: "Lâm Ngọc Vũ",
      subtitle: "Leader Business Development",
      description: [
        "Kinh nghiệm nhiều năm trong lĩnh vực Logistics.",
        "Chuyên về FCL, LCL và vận chuyển hàng không.",
        "Cung cấp trọn gói dịch vụ: Tư vấn – Báo giá – Đặt chỗ – Theo dõi lô hàng.",
        "Cam kết giao hàng đúng tiến độ, tối ưu chi phí.",
        "Sẵn sàng hỗ trợ 24/7."
      ],
      consultButton: "Đăng Ký Tư Vấn",
      roles: ["Leader Team Sale 1 – Công ty Long Hoàng Logistics"],
      saveContact: "Lưu Danh bạ",
      share: "Chia sẻ",
      scanQr: "Quét mã",
      close: "Đóng",
      projectsTitle: "Dự Án Tiêu Biểu",
      backToProjects: "Quay lại danh sách",
      consultationForm: {
        title: "Yêu Cầu Báo Giá",
        goodsType: "Loại Hàng hóa",
        pol: "Cảng đi (POL)",
        pod: "Cảng đến (POD)",
        volume: "Khối lượng (Volume)",
        submit: "Báo Giá Qua Zalo",
        alertCopied: "Nội dung đã được copy! Vui lòng dán vào cuộc trò chuyện Zalo."
      }
    },
    en: {
      title: "Mr. Andy",
      subtitle: "Leader Business Development",
      description: [
        "Many years of experience in the Logistics industry.",
        "Specialized in FCL, LCL, and Air Freight.",
        "Providing end-to-end services: Consulting – Quotation – Booking – Shipment Tracking.",
        "Committed to on-time delivery and cost optimization.",
        "Available 24/7 for support."
      ],
      consultButton: "Register for Consultation",
      roles: ["Leader Team Sale 1 – Long Hoang Logistics Company"],
      saveContact: "Save Contact",
      share: "Share",
      scanQr: "Scan QR",
      close: "Close",
      projectsTitle: "Featured Projects",
      backToProjects: "Back to Projects",
      consultationForm: {
        title: "Request Quotation",
        goodsType: "Type of Goods",
        pol: "Port of Loading",
        pod: "Port of Discharge",
        volume: "Volume",
        submit: "Get Quote via Zalo",
        alertCopied: "Content copied! Please paste into Zalo chat."
      }
    }
  }
};
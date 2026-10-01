import type { MetricItem } from './types'

export const highlightsData = {
  title: 'Dấu ấn',
  titleHighlight: 'Công nghệ',
  subtitle: 'Sự bứt phá của hệ sinh thái Khánh Hòa qua những cột mốc thực tế.',
  metrics: [
    { value: '60+', label: 'Gian Hàng Doanh Nghiệp', color: 'text-blue-600' },
    { value: '10+', label: 'Gian Hàng F&B', color: 'text-amber-500' },
    { value: '2.000', label: 'm² Không Gian Triển Lãm', color: 'text-cyan-600' },
    { value: '100%', label: 'Trải Nghiệm Thực Tế', color: 'text-lime-600' },
  ] as MetricItem[],
  demographics: {
    badge: 'GIẢI PHÁP & MÔ HÌNH',
    title: 'Ứng Dụng Công Nghệ Số, AI, Robotics',
    items: [
      { label: 'Mô hình ROBOT (Nhà hàng, khách sạn, KCN)', percent: '35%', color: 'bg-cyan-400' },
      { label: 'Giải pháp Chuyển đổi số (VR, AR, Metaverse)', percent: '30%', color: 'bg-blue-400' },
      { label: 'Mô hình Giáo dục & Lập trình (STEM, Drone)', percent: '20%', color: 'bg-indigo-400' },
      { label: 'Khu vui chơi & Photobooth công nghệ cao', percent: '15%', color: 'bg-lime-400' },
    ],
  },
  cards: {
    anniversaryBadge: 'MÔ HÌNH',
    anniversaryTitle: 'ROBOT',
    anniversaryDesc: 'Phục vụ doanh nghiệp, y tế, đời sống',
    globalReachBadge: 'THỰC TẾ ẢO',
    globalReachValue: '3D',
    globalReachLabel: 'Giải pháp VR, AR, 360, Digital Twin',
    buyersBadge: 'CÔNG NGHỆ',
    buyersValue: 'AI',
    buyersLabel: 'Tích hợp Trí tuệ Nhân tạo thông minh',
    demoBadge: 'TRÌNH DIỄN LẬP TRÌNH',
    demoBrand: 'DROPTICS & STEM',
    demoTitle: 'Trải nghiệm lập trình & Điều khiển Drone',
  },
}

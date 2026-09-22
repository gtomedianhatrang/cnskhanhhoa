import type { MetricItem } from './types'

export const highlightsData = {
  title: 'DẤU ẤN LỊCH SỬ & THÀNH TỰU',
  subtitle: 'CỘT MỐC VÀ HÀNH TRÌNH ĐỒNG HÀNH',
  metrics: [
    { value: '160K+', label: 'Lượt Khách Tham Dự', color: 'text-lime-600' },
    { value: '3800+', label: 'Đơn Vị Triển Lãm', color: 'text-blue-600' },
    { value: '1700+', label: 'Diễn Giả Chuyên Gia', color: 'text-cyan-600' },
    { value: '1600+', label: 'Báo Chí & Truyền Thông', color: 'text-amber-500' },
  ] as MetricItem[],
  demographics: {
    badge: 'CƠ CẤU ĐỐI TƯỢNG',
    title: 'Thành Phần Tham Dự',
    items: [
      { label: 'C-Level & Lãnh đạo Cấp cao', percent: '68%', color: 'bg-cyan-400' },
      { label: 'Nhà sáng lập & Giám đốc Công nghệ (CTO)', percent: '24%', color: 'bg-blue-400' },
      { label: 'Nhà Đầu tư & Quỹ Mạo hiểm', percent: '8%', color: 'bg-amber-400' },
    ],
    footerText: 'Số liệu kiểm định chính thức',
  },
  cards: {
    anniversaryBadge: 'KỶ NIỆM',
    anniversaryTitle: '5 NĂM',
    anniversaryDesc: 'Định hình tương lai công nghệ số Châu Á',
    globalReachBadge: 'TẦM VÓC QUỐC TẾ',
    globalReachValue: '30%',
    globalReachLabel: 'Đơn vị Triển lãm Quốc tế',
    buyersBadge: 'CHẤT LƯỢNG KẾT NỐI',
    buyersValue: '68%',
    buyersLabel: 'Người mua & Đối tác Chuyên nghiệp',
    demoBadge: 'TRÌNH DIỄN TRỰC TIẾP',
    demoBrand: 'CNS KHÁNH HÒA ROBOTICS',
    demoTitle: 'Ứng Dụng Thực Thể AI Thông Minh',
  },
}

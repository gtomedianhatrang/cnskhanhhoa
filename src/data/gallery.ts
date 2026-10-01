import type { GalleryItem } from './types'

export const galleryData = {
  tagline: 'Khoảnh khắc',
  title: 'Thư viện',
  titleHighlight: 'hình ảnh',
  subtitle: 'Hình ảnh nổi bật về các hoạt động trưng bày, trình diễn và trải nghiệm công nghệ số xuyên suốt chuỗi sự kiện Ngày hội Công nghệ số tỉnh Khánh Hòa năm 2025.',
  categories: [
    { id: 'all', label: 'Tất cả hình ảnh', count: 19 },
    { id: 'keynote', label: 'Lễ Khai Mạc & Sự Kiện', count: 4 },
    { id: 'expo', label: 'Triển lãm & Trải nghiệm', count: 15 },
  ],
  items: [
    {
      id: 'g-1',
      title: 'Lãnh đạo phát biểu chỉ đạo',
      category: 'keynote',
      categoryLabel: 'PHÁT BIỂU',
      image: '/gallery/2025/lanh-dao-phat-bieu.png',
      description: 'Đại diện lãnh đạo phát biểu chỉ đạo và định hướng phát triển chuyển đổi số.',
      aspect: 'landscape'
    },
    {
      id: 'g-2',
      title: 'Trải nghiệm công nghệ Thực tế ảo (VR)',
      category: 'expo',
      categoryLabel: 'TRẢI NGHIỆM',
      image: '/gallery/2025/trai-nghiem-vr.png',
      description: 'Các bạn sinh viên hào hứng trải nghiệm các thiết bị công nghệ mới nhất tại gian hàng.',
      aspect: 'landscape'
    },
    {
      id: 'g-3',
      title: 'Khách tham quan tìm hiểu giải pháp số',
      category: 'expo',
      categoryLabel: 'TRIỂN LÃM',
      image: '/gallery/2025/tham-quan-gian-hang-cong-nghe.png',
      description: 'Người dân tham quan và nghe tư vấn tại các gian hàng giải pháp công nghệ chuyển đổi số.',
      aspect: 'landscape'
    },
    {
      id: 'g-4',
      title: 'Chương trình nghệ thuật khai mạc',
      category: 'keynote',
      categoryLabel: 'SỰ KIỆN',
      image: '/gallery/2025/van-nghe-truyen-thong.png',
      description: 'Tiết mục văn nghệ mang đậm dấu ấn văn hóa truyền thống kết hợp tinh thần đổi mới sáng tạo.',
      aspect: 'landscape'
    },
    {
      id: 'g-5',
      title: 'Nghi thức bấm nút khai mạc Ngày hội',
      category: 'keynote',
      categoryLabel: 'LỄ KHAI MẠC',
      image: '/gallery/2025/nghi-thuc-bam-nut.png',
      description: 'Các đại biểu lãnh đạo thực hiện nghi thức bấm nút chính thức khai mạc Ngày hội.',
      aspect: 'landscape'
    },
    {
      id: 'g-6',
      title: 'Cắt băng khai mạc không gian triển lãm',
      category: 'keynote',
      categoryLabel: 'LỄ KHAI MẠC',
      image: '/gallery/2025/cat-bang-trien-lam.png',
      description: 'Đại biểu cắt băng khai trương không gian triển lãm công nghệ tại Khối A.',
      aspect: 'landscape'
    },
    {
      id: 'g-7',
      title: 'Tham quan gian hàng MobiFone 5G',
      category: 'expo',
      categoryLabel: 'TRIỂN LÃM',
      image: '/gallery/2025/tham-quan-gian-hang-mobifone.png',
      description: 'Lãnh đạo tham quan và trải nghiệm sản phẩm tại gian hàng MobiFone.',
      aspect: 'landscape'
    },
    {
      id: 'g-8',
      title: 'Trải nghiệm thiết bị thông minh',
      category: 'expo',
      categoryLabel: 'TRẢI NGHIỆM',
      image: '/gallery/2025/trai-nghiem-thiet-bi-nhan-dien.png',
      description: 'Trải nghiệm hệ thống nhận diện và thiết bị chuyển đổi số trực tiếp tại sự kiện.',
      aspect: 'landscape'
    },
    {
      id: 'g-9',
      title: 'Gian hàng Y tế thông minh',
      category: 'expo',
      categoryLabel: 'TRIỂN LÃM',
      image: '/gallery/2025/gian-hang-y-te-thong-minh.png',
      description: 'Mô hình Kiosk Y tế tự động tại gian hàng Sở Y tế - Bệnh viện Đa khoa.',
      aspect: 'portrait'
    },
    {
      id: 'g-10',
      title: 'Trải nghiệm Photobooth tương tác',
      category: 'expo',
      categoryLabel: 'TRẢI NGHIỆM',
      image: '/gallery/2025/chup-anh-photobooth-2.png',
      description: 'Các em nhỏ thích thú với khu vực chụp ảnh lưu niệm ứng dụng công nghệ.',
      aspect: 'landscape'
    },
    {
      id: 'g-11',
      title: 'Giới thiệu giải pháp an toàn thông tin',
      category: 'expo',
      categoryLabel: 'TRIỂN LÃM',
      image: '/gallery/2025/tham-quan-gian-hang-fpt.png',
      description: 'Khách hàng được tư vấn về hệ thống chống giả mạo số và xác thực điện tử.',
      aspect: 'landscape'
    },
    {
      id: 'g-12',
      title: 'Trưng bày sách về Chuyển đổi số',
      category: 'expo',
      categoryLabel: 'TRẢI NGHIỆM',
      image: '/gallery/2025/trung-bay-sach-chuyen-doi-so.png',
      description: 'Không gian giới thiệu các ấn phẩm về công nghệ số và trí tuệ nhân tạo.',
      aspect: 'landscape'
    },
    {
      id: 'g-13',
      title: 'Giải pháp lưu trữ và điện toán đám mây',
      category: 'expo',
      categoryLabel: 'TRIỂN LÃM',
      image: '/gallery/2025/gian-hang-giai-phap-dam-may.png',
      description: 'Giới thiệu các hạ tầng Cloud Server và dịch vụ lưu trữ hiện đại.',
      aspect: 'landscape'
    },
    {
      id: 'g-14',
      title: 'Tham quan thiết bị số',
      category: 'expo',
      categoryLabel: 'TRẢI NGHIỆM',
      image: '/gallery/2025/trai-nghiem-thiet-bi-so.png',
      description: 'Các đại biểu và chuyên gia tìm hiểu về phần cứng công nghệ mới.',
      aspect: 'landscape'
    },
    {
      id: 'g-15',
      title: 'Trình diễn Robot dịch vụ',
      category: 'expo',
      categoryLabel: 'TRẢI NGHIỆM',
      image: '/gallery/2025/trinh-dien-robot-thong-minh.png',
      description: 'Các mô hình robot thông minh phục vụ trong đời sống và y tế.',
      aspect: 'portrait'
    },
    {
      id: 'g-16',
      title: 'Phỏng vấn trực tiếp tại gian hàng truyền thông',
      category: 'expo',
      categoryLabel: 'SỰ KIỆN',
      image: '/gallery/2025/phong-van-truc-tiep-ktv.png',
      description: 'Hoạt động truyền thông, phỏng vấn trực tiếp tại không gian Ngày hội.',
      aspect: 'landscape'
    },
    {
      id: 'g-17',
      title: 'Thiếu nhi thích thú trải nghiệm kính VR',
      category: 'expo',
      categoryLabel: 'TRẢI NGHIỆM',
      image: '/gallery/2025/tre-em-trai-nghiem-vr.png',
      description: 'Các bạn nhỏ được làm quen với công nghệ thực tế ảo thông qua các trò chơi.',
      aspect: 'landscape'
    },
    {
      id: 'g-18',
      title: 'Không gian thực tế ảo AR/VR',
      category: 'expo',
      categoryLabel: 'TRẢI NGHIỆM',
      image: '/gallery/2025/thanh-nien-trai-nghiem-vr.png',
      description: 'Người dân và thanh niên trải nghiệm các ứng dụng VR miễn phí.',
      aspect: 'landscape'
    },
    {
      id: 'g-19',
      title: 'Lễ bế mạc và trao giải',
      category: 'keynote',
      categoryLabel: 'LỄ BẾ MẠC',
      image: '/gallery/2025/be-mac-su-kien.png',
      description: 'Lễ tổng kết, trao chứng nhận cho các đơn vị và doanh nghiệp tham gia Ngày hội.',
      aspect: 'landscape'
    }
  ] as GalleryItem[]
}

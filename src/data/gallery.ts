import type { GalleryItem } from './types'

export const galleryData = {
  title: 'THƯ VIỆN HÌNH ẢNH',
  titleHighlight: 'SỰ KIỆN & TRIỂN LÃM',
  subtitle: 'Những khoảnh khắc ấn tượng, công nghệ đột phá và không gian kết nối đỉnh cao tại Ngày hội Công nghệ số',
  categories: [
    { id: 'all', label: 'Tất Cả' },
    { id: 'keynote', label: 'Lễ Khai Mạc & Keynote' },
    { id: 'robotics', label: 'AI & Robotics' },
    { id: 'forum', label: 'Tọa Đàm & Hội Thảo' },
    { id: 'expo', label: 'Khu Vực Triển Lãm' },
    { id: 'networking', label: 'Giao Thương & Gala' },
  ],
  items: [
    {
      id: 'g-1',
      title: 'Toàn cảnh Lễ Khai Mạc tại Sân khấu chính Grand Keynote',
      category: 'keynote',
      categoryLabel: 'LỄ KHAI MẠC',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
      description: 'Hơn 2.000 đại biểu, chuyên gia và lãnh đạo cấp cao tham dự phiên khai mạc trang trọng.',
      aspect: 'landscape'
    },
    {
      id: 'g-2',
      title: 'Trình diễn Robot hình người tích hợp AI thế hệ mới',
      category: 'robotics',
      categoryLabel: 'AI & ROBOTICS',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
      description: 'Robot tương tác thời gian thực với quan khách và biểu diễn các thao tác kỹ thuật chính xác.',
      aspect: 'portrait'
    },
    {
      id: 'g-3',
      title: 'Không gian Triển lãm Công nghệ Đô thị Thông minh 40.000m²',
      category: 'expo',
      categoryLabel: 'TRIỂN LÃM',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000',
      description: 'Khu vực trưng bày các giải pháp IoT, cảm biến thông minh và bản đồ số quy hoạch.',
      aspect: 'landscape'
    },
    {
      id: 'g-4',
      title: 'Tọa đàm bàn tròn: Tương lai Trung tâm Dữ liệu Xanh',
      category: 'forum',
      categoryLabel: 'TỌA ĐÀM',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000',
      description: 'Các chuyên gia quốc tế thảo luận về hạ tầng đám mây và tối ưu năng lượng cho AI.',
      aspect: 'square'
    },
    {
      id: 'g-5',
      title: 'Trải nghiệm Kính thực tế ảo Apple Vision Pro & VR Hub',
      category: 'robotics',
      categoryLabel: 'AI & ROBOTICS',
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1000',
      description: 'Khách tham quan trực tiếp trải nghiệm mô hình 3D thực tế ảo tăng cường không gian số.',
      aspect: 'square'
    },
    {
      id: 'g-6',
      title: 'Phiên kết nối Doanh nghiệp Quốc tế B2B Matchmaking Hub',
      category: 'networking',
      categoryLabel: 'GIAO THƯƠNG B2B',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000',
      description: 'Đàm phán thương mại và ký kết hơn 30 biên bản ghi nhớ hợp tác chuyển giao công nghệ.',
      aspect: 'portrait'
    },
    {
      id: 'g-7',
      title: 'Sân khấu Chung kết Cuộc thi Khởi nghiệp Đổi mới Sáng tạo',
      category: 'keynote',
      categoryLabel: 'KHỞI NGHIỆP & AWARDS',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
      description: 'Top 50 startup công nghệ tranh tài thuyết trình trước hội đồng các quỹ đầu tư mạo hiểm hàng đầu.',
      aspect: 'landscape'
    },
    {
      id: 'g-8',
      title: 'Đêm tiệc Gala Dinner & Tôn vinh Sáng chế Công nghệ Tiên phong',
      category: 'networking',
      categoryLabel: 'GALA NIGHT',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1000',
      description: 'Không gian âm nhạc nghệ thuật và kết nối thân mật giữa các tập đoàn và nhà sáng lập.',
      aspect: 'landscape'
    }
  ] as GalleryItem[]
}

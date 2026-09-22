import type { GalleryItem } from './types'

export const galleryData = {
  title: 'THƯ VIỆN HÌNH ẢNH',
  titleHighlight: '',
  subtitle: 'Những khoảnh khắc đáng nhớ tại Ngày hội Công nghệ số Khánh Hòa.',
  
  years: [
    {
      id: '2024',
      year: '2024',
      title: 'Xem lại hình ảnh sự kiện 2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
      link: '#'
    },
    {
      id: '2023',
      year: '2023',
      title: 'Xem lại hình ảnh sự kiện 2023',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000',
      link: '#'
    },
    {
      id: '2022',
      year: '2022',
      title: 'Xem lại hình ảnh sự kiện 2022',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
      link: '#'
    }
  ],

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
    },
    {
      id: 'g-9',
      title: 'Trình diễn Ánh sáng Drone tại Quảng trường Trung tâm',
      category: 'keynote',
      categoryLabel: 'SỰ KIỆN',
      image: 'https://images.unsplash.com/photo-1506452814897-cb02cb5725db?auto=format&fit=crop&q=80&w=1000',
      description: 'Hàng trăm drone xếp hình biểu tượng công nghệ số trên bầu trời đêm.',
      aspect: 'landscape'
    },
    {
      id: 'g-10',
      title: 'Khu gian hàng Giáo dục số thông minh',
      category: 'expo',
      categoryLabel: 'TRIỂN LÃM',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000',
      description: 'Học sinh sinh viên trực tiếp thao tác với thiết bị học tập sử dụng AR.',
      aspect: 'portrait'
    },
    {
      id: 'g-11',
      title: 'Hội thảo: An toàn Thông tin Không gian số',
      category: 'forum',
      categoryLabel: 'TỌA ĐÀM',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
      description: 'Chuyên gia bảo mật chia sẻ các phương pháp phòng chống mã độc và ransomware mới.',
      aspect: 'square'
    },
    {
      id: 'g-12',
      title: 'Khách tham quan trải nghiệm Cánh tay Robot Công nghiệp',
      category: 'robotics',
      categoryLabel: 'AI & ROBOTICS',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
      description: 'Mô phỏng tự động hóa dây chuyền sản xuất lắp ráp linh kiện điện tử tốc độ cao.',
      aspect: 'landscape'
    },
    {
      id: 'g-13',
      title: 'Phiên thảo luận Đầu tư Công nghệ Blockchain',
      category: 'forum',
      categoryLabel: 'TỌA ĐÀM',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000',
      description: 'Các nhà phân tích kinh tế phân tích xu hướng và ứng dụng của hợp đồng thông minh.',
      aspect: 'landscape'
    },
    {
      id: 'g-14',
      title: 'Gian hàng Khởi nghiệp Nông nghiệp thông minh',
      category: 'expo',
      categoryLabel: 'TRIỂN LÃM',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1000',
      description: 'Mô hình giám sát chất lượng đất và tưới tiêu tự động qua cảm biến IoT.',
      aspect: 'square'
    },
    {
      id: 'g-15',
      title: 'Lễ bế mạc và trao giải Cuộc thi Sáng tạo Công nghệ',
      category: 'keynote',
      categoryLabel: 'LỄ BẾ MẠC',
      image: 'https://images.unsplash.com/photo-1561489422-45de3d015e3e?auto=format&fit=crop&q=80&w=1000',
      description: 'Trao thưởng cho 3 dự án xuất sắc nhất có tính ứng dụng thực tiễn cao.',
      aspect: 'landscape'
    },
    {
      id: 'g-16',
      title: 'Giao lưu ký kết đối tác công nghệ chiến lược',
      category: 'networking',
      categoryLabel: 'GIAO THƯƠNG B2B',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=1000',
      description: 'Đại diện các doanh nghiệp chính thức bắt tay hợp tác cùng phát triển nền tảng số.',
      aspect: 'portrait'
    }
  ] as GalleryItem[]
}

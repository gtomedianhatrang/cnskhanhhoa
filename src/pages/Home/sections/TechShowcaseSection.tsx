import React from 'react'

const showcaseData = [
  { 
    id: '01', 
    title: 'KHÔNG GIAN DOANH NGHIỆP', 
    image: '/showcase/gian-hang-doanh-nghiep.png', 
    desc: 'Không gian triển lãm chuyên nghiệp với các gian hàng tiêu chuẩn. Nơi hội tụ các giải pháp công nghệ tiên tiến, tạo cơ hội giao thương và kết nối đối tác chiến lược.' 
  },
  { 
    id: '02', 
    title: 'ROBOT TỰ HÀNH & LOGISTICS', 
    image: '/showcase/robot-tu-hanh-logistics.png', 
    desc: 'Trình diễn giải pháp kho vận thông minh với robot AGV/AMR. Trải nghiệm quy trình tự động hóa bốc xếp và điều phối hàng hóa bằng công nghệ hiện đại.' 
  },
  { 
    id: '03', 
    title: 'GIÁO DỤC LẬP TRÌNH STEM', 
    image: '/showcase/lap-trinh-robot-stem.png', 
    desc: 'Khu vực sáng tạo dành riêng cho học sinh, sinh viên. Trực tiếp tham gia lắp ráp, lập trình và điều khiển các mô hình robot thông minh.' 
  },
  { 
    id: '04', 
    title: 'MÔ HÌNH DU LỊCH THỰC TẾ ẢO', 
    image: '/showcase/trai-nghiem-du-lich-so.png', 
    desc: 'Khám phá các điểm đến du lịch nổi tiếng thông qua kính VR/AR và công nghệ bản đồ số 360, mang lại trải nghiệm tương tác không giới hạn.' 
  },
  {
    id: '05',
    title: 'MINI SHOWROOM ROBOT PHỤC VỤ',
    image: '/showcase/robot-phuc-vu.png',
    desc: 'Trưng bày robot phục vụ, robot giao hàng và robot lễ tân trong môi trường thực tế. Giúp khách tham quan trực tiếp trải nghiệm giải pháp tự động hóa cho ngành du lịch – dịch vụ qua không gian Nhà hàng/Khách sạn thu nhỏ.'
  }
]

export function TechShowcaseSection() {
  return (
    <section className="w-full py-24 bg-slate-50 relative overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header - Centered with Badge and Gradient Line */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 md:mb-28 px-6">
          <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold tracking-widest uppercase text-xs sm:text-sm mb-6 border border-blue-100/50 shadow-sm">Khu vực tham quan</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-6 leading-tight">
            QUY MÔ & KHÔNG GIAN TRIỂN LÃM
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-2xl">
            Trải nghiệm các giải pháp & mô hình công nghệ tiên tiến nhất từ các doanh nghiệp hàng đầu
          </p>
        </div>

        {/* Roadmap Layout */}
        <div className="relative w-full mx-auto">
          
          {/* Continuous Snake Line (Desktop Only) - Circuit Board Style */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-blue-300 -translate-x-1/2 z-0"></div>

          <div className="flex flex-col space-y-16 md:space-y-32">
            {showcaseData.map((item, idx) => {
              const isEven = idx % 2 !== 0; // 0 is odd in UI layout (left), 1 is even (right)

              return (
                <div key={item.id} className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch w-full">
                  {/* Center Dot (Glowing Circuit Node) */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 z-40"></div>

                  
                  {/* LEFT HALF */}
                  <div className="w-full md:w-1/2 flex items-center justify-start pr-0 md:pr-0">
                    {isEven ? (
                      // Image is on the left
                      <>
                        <div className="relative w-full max-w-md shrink-0 aspect-video md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white transform transition-transform duration-500 hover:scale-105 rotate-2 hover:rotate-0 z-20">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-blue-900/10 hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                        </div>
                      </>
                    ) : (
                      // Content is on the left
                      <>
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full max-w-lg relative group shrink-0 z-20">
                          <div className="text-6xl font-black text-slate-200 absolute -top-6 -right-2 z-0 tracking-tighter group-hover:text-blue-100 transition-colors">
                            {item.id}
                          </div>
                          <div className="relative z-10">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:block flex-1 h-[2px] bg-blue-300 z-10 relative">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 -ml-1 z-20"></div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* RIGHT HALF */}
                  <div className="w-full md:w-1/2 flex items-center justify-end pl-0 md:pl-0 mt-8 md:mt-0">
                    {isEven ? (
                      // Content is on the right
                      <>
                        <div className="hidden md:block flex-1 h-[2px] bg-blue-300 z-10 relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 -mr-1 z-20"></div>
                        </div>
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full max-w-lg relative group shrink-0 z-20">
                          <div className="text-6xl font-black text-slate-200 absolute -top-6 -right-2 z-0 tracking-tighter group-hover:text-blue-100 transition-colors">
                            {item.id}
                          </div>
                          <div className="relative z-10">
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Image is on the right
                      <>
                        <div className="relative w-full max-w-md shrink-0 aspect-video md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white transform transition-transform duration-500 hover:scale-105 -rotate-2 hover:rotate-0 z-20">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-blue-900/10 hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}

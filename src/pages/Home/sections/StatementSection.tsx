import { useState } from 'react'
import { siteData } from '@/data'
import { Layout, Type, Columns } from 'lucide-react'

export function StatementSection() {
  const { statement } = siteData
  const [styleIndex, setStyleIndex] = useState<1 | 2 | 3>(1)

  return (
    <section id="statement" className="relative py-20 md:py-28 bg-white scroll-mt-20 lg:scroll-mt-24 transition-colors duration-500">
      
      {/* Style Toggle Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-100 p-1.5 rounded-full shadow-sm z-10 border border-slate-200">
        <button 
          onClick={() => setStyleIndex(1)}
          className={`p-2 rounded-full transition-all duration-300 ${styleIndex === 1 ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
          title="Kiểu 1: Căn giữa lớn"
        >
          <Type className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setStyleIndex(2)}
          className={`p-2 rounded-full transition-all duration-300 ${styleIndex === 2 ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
          title="Kiểu 2: Chia đôi cột"
        >
          <Columns className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setStyleIndex(3)}
          className={`p-2 rounded-full transition-all duration-300 ${styleIndex === 3 ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
          title="Kiểu 3: Bảng khối nổi bật"
        >
          <Layout className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative">
        
        {/* STYLE 1: Original Centered Typography */}
        <div className={`transition-all duration-700 transform ${styleIndex === 1 ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 leading-relaxed tracking-tight text-justify [text-align-last:center]">
            {statement.textBefore}{' '}
            <span className="text-blue-600 font-black">{statement.sessionsHighlight}</span>{' '}
            {statement.textMiddle}{' '}
            <span className="font-display bg-prism-gradient font-black">{statement.eventName}</span>{' '}
            <span className="text-slate-800 font-bold">{statement.textAfter}</span>
          </h2>
        </div>

        {/* STYLE 2: Split Column Modern */}
        <div className={`transition-all duration-700 transform ${styleIndex === 2 ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none'}`}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-blue-600 to-cyan-400 rounded-full"></div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                <span className="font-display bg-prism-gradient">{statement.eventName}</span>
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-blue-600">{statement.sessionsHighlight}</span>
                <span className="text-lg font-bold text-slate-500 uppercase tracking-wider">Phiên hội thảo</span>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                {statement.textBefore} <span className="font-bold text-slate-900">chương trình chọn lọc đa lĩnh vực công nghệ hàng đầu</span>, sự kiện hướng tới mục tiêu <span className="text-blue-600 font-bold">kết nối công nghệ đột phá</span> với triển khai thực tế — thúc đẩy tăng trưởng khu vực thông qua đối thoại toàn cầu và đổi mới sáng tạo công nghệ sâu rộng.
              </p>
            </div>
          </div>
        </div>

        {/* STYLE 3: Elevated Glassmorphism Card */}
        <div className={`transition-all duration-700 transform ${styleIndex === 3 ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl bg-slate-50 border border-slate-100 shadow-2xl overflow-hidden group">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-200 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full blur-[80px] opacity-60 translate-y-1/3 -translate-x-1/4 group-hover:bg-cyan-200 transition-colors duration-700"></div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md text-blue-600 mb-8 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5Z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 leading-tight mb-8">
                <span className="font-display bg-prism-gradient">{statement.eventName}</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                {statement.textBefore} <span className="font-black text-blue-600 text-3xl mx-2">{statement.sessionsHighlight}</span> {statement.textMiddle} <span className="font-bold text-slate-900">{statement.textAfter}</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}



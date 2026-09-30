import { ArrowRight } from 'lucide-react'

export function RegistrationSection() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-6">
          ĐỒNG HÀNH CÙNG<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CHUYỂN ĐỔI SỐ</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Hãy đăng ký tham gia ngay hôm nay để không bỏ lỡ các hoạt động hấp dẫn, cơ hội giao thương và cập nhật những xu hướng công nghệ mới nhất tại Ngày hội Công nghệ số Khánh Hòa 2026.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-1">
            <span>Đăng ký tham gia ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full transition-all border border-slate-700 hover:border-slate-600">
            <span>Tải tài liệu sự kiện</span>
          </button>
        </div>
      </div>
    </section>
  )
}

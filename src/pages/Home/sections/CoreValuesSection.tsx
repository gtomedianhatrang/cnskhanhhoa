export function CoreValuesSection() {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden border-b border-slate-100">
      {/* Subtle Light Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(226,232,240,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(226,232,240,0.4)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Title Section */}
        <div className="flex flex-col items-center justify-center mb-16 md:mb-20 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
            ỨNG DỤNG TỰ ĐỘNG HÓA,<br />
            <span className="text-blue-600">
              ROBOTIC & TRÍ TUỆ NHÂN TẠO
            </span>
          </h2>
        </div>

        {/* 4 Pillars Grid - Clean Minimalist Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">

          {/* Pillar 1 */}
          <div className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-2xl mb-6 transition-all duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-black text-base sm:text-lg uppercase tracking-wide mb-2 group-hover:text-blue-700 transition-colors">Chuyển đổi số</h3>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Đổi mới - Bứt phá</p>
          </div>

          {/* Pillar 2 */}
          <div className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-2xl mb-6 transition-all duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-black text-base sm:text-lg uppercase tracking-wide mb-2 group-hover:text-blue-700 transition-colors">Kết nối</h3>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Hợp tác - Phát triển</p>
          </div>

          {/* Pillar 3 */}
          <div className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-2xl mb-6 transition-all duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-black text-base sm:text-lg uppercase tracking-wide mb-2 group-hover:text-blue-700 transition-colors">Trải nghiệm</h3>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Thông minh - Hiện đại</p>
          </div>

          {/* Pillar 4 */}
          <div className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-2xl mb-6 transition-all duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-black text-base sm:text-lg uppercase tracking-wide mb-2 group-hover:text-blue-700 transition-colors">Tương lai</h3>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Bền vững - Thịnh vượng</p>
          </div>

        </div>
      </div>
    </section>
  )
}

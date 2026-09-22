export interface PartnerTier {
  id: string
  title: string
  colorClass: string
  logos: { name: string; img: string }[]
}

export const partnersData = {
  title: 'ĐỐI TÁC',
  titleHighlight: 'ĐỒNG HÀNH',
  subtitle: 'Những đơn vị đồng hành cùng Ngày hội Công nghệ số Khánh Hòa',
  tiers: [
    {
      id: 'strategic',
      title: 'ĐỐI TÁC CHIẾN LƯỢC',
      colorClass: 'bg-blue-700 text-white',
      logos: [
        { name: 'Viettel', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Viettel_logo_2021.svg/512px-Viettel_logo_2021.svg.png' },
        { name: 'VNPT', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/VNPT_Logo.svg/512px-VNPT_Logo.svg.png' },
        { name: 'FPT', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/512px-FPT_logo_2010.svg.png' }
      ]
    },
    {
      id: 'gold',
      title: 'ĐỐI TÁC VÀNG',
      colorClass: 'bg-blue-500 text-white',
      logos: [
        { name: 'MobiFone', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/MobiFone_logo.svg/512px-MobiFone_logo.svg.png' },
        { name: 'CMC', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/CMC_Corporation_logo.svg/512px-CMC_Corporation_logo.svg.png' }
      ]
    },
    {
      id: 'silver',
      title: 'ĐỐI TÁC BẠC',
      colorClass: 'bg-slate-700 text-white',
      logos: [
        { name: 'VNG', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/VNG_logo.svg/512px-VNG_logo.svg.png' },
        { name: 'MISA', img: 'https://upload.wikimedia.org/wikipedia/vi/2/23/Logo_MISA_2019.png' }
      ]
    }
  ] as PartnerTier[]
}

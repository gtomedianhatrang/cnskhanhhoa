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
        { name: '', img: '' },
        { name: '', img: '' },
        { name: '', img: '' },
      ]
    },
    {
      id: 'gold',
      title: 'ĐỐI TÁC VÀNG',
      colorClass: 'bg-blue-500 text-white',
      logos: [
        { name: '', img: '' },
        { name: '', img: '' },
      ]
    },
    {
      id: 'silver',
      title: 'ĐỐI TÁC BẠC',
      colorClass: 'bg-slate-700 text-white',
      logos: [
        { name: '', img: '' },
        { name: '', img: '' },
      ]
    }
  ] as PartnerTier[]
}

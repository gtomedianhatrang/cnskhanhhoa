import type { NavItem } from './types'

export const headerData = {
  brandName: 'CNS KHÁNH HÒA',
  brandSub: 'CHI NHÁNH SÔNG CẦU / KHÁNH HÒA',
  nav: [
    { key: 'home' as const, label: 'TRANG CHỦ', targetId: 'home' },
    { key: 'about' as const, label: 'GIỚI THIỆU', targetId: 'statement' },
    { key: 'timeline' as const, label: 'LỊCH TRÌNH', targetId: 'timeline' },
    { key: 'speakers' as const, label: 'DIỄN GIẢ', targetId: 'speakers' },
    { key: 'news' as const, label: 'TIN TỨC', targetId: 'news' },
    { key: 'gallery' as const, label: 'THƯ VIỆN ẢNH', targetId: 'gallery' },
  ] as NavItem[],
}

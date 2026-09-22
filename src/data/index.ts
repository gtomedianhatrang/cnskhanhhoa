/**
 * Data Store trung tâm quản lý toàn bộ dữ liệu của website
 * Được tách thành các module riêng biệt trong thư mục src/data/ để dễ dàng bảo trì và chỉnh sửa.
 */

import { headerData } from './header'
import { heroData } from './hero'
import { statementData } from './statement'
import { quoteData } from './quote'
import { highlightsData } from './highlights'
import { timelineData } from './timeline'
import { speakersData } from './speakers'
import { galleryData } from './gallery'
import { newsData } from './news'
import { partnersData } from './partners'
import { footerData } from './footer'

// Gom toàn bộ data vào siteData
export const siteData = {
  header: headerData,
  hero: heroData,
  statement: statementData,
  quoteBanner: quoteData,
  highlights: highlightsData,
  timeline: timelineData,
  speakers: speakersData,
  gallery: galleryData,
  releases: newsData,
  partners: partnersData,
  footer: footerData,
}

// Re-export toàn bộ types
export * from './types'

// Re-export từng module riêng biệt để có thể import trực tiếp khi cần
export * from './header'
export * from './hero'
export * from './statement'
export * from './quote'
export * from './highlights'
export * from './timeline'
export * from './speakers'
export * from './gallery'
export * from './news'
export * from './footer'

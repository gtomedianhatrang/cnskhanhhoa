export interface SpeakerItem {
  id: string
  name: string
  role: string
  company: string
  topic: string
  image: string
  category: string
  time: string
  hall: string
  isKeynote?: boolean
}

export interface TimelineSession {
  time: string
  title: string
  speaker?: string
  speakerRole?: string
  location: string
  stage?: string
  stageDotColor?: string
  period?: 'AM' | 'PM' | 'NIGHT'
  tag: string
  tagColor: string
  categoryType?: string
  description?: string
}

export interface TimelineDay {
  id: string
  dayNumber: string
  date: string
  dateFull?: string
  label: string
  sublabel?: string
  theme: string
  sessions: TimelineSession[]
}

export interface NewsItem {
  id: string
  category: string
  date: string
  title: string
  snippet: string
  image: string
  readTime: string
  author: string
  link?: string
  content: string[]
}

export interface MetricItem {
  value: string
  label: string
  color: string
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  categoryLabel: string
  image: string
  description?: string
  aspect?: 'landscape' | 'portrait' | 'square'
}

export interface NavItem {
  key: 'home' | 'about' | 'timeline' | 'speakers' | 'gallery' | 'news'
  label: string
  targetId: string
}

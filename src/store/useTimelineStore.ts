import { create } from 'zustand'
import type { TimelineSession } from '@/data/types'

interface TimelineState {
  selectedDateId: string // 'all' | 'day-1' | 'day-2' | 'day-3' | 'day-4'
  selectedStage: string // 'all' | 'theatre' | 'stage-a' ...
  searchQuery: string
  activeModalSession: TimelineSession | null
  bookmarkedSessions: string[]
  currentPage: number
  setSelectedDateId: (id: string) => void
  setSelectedStage: (stage: string) => void
  setSearchQuery: (query: string) => void
  setActiveModalSession: (session: TimelineSession | null) => void
  toggleBookmark: (sessionTitle: string) => void
  setCurrentPage: (page: number) => void
  resetFilters: () => void
}

export const useTimelineStore = create<TimelineState>((set) => ({
  selectedDateId: 'all',
  selectedStage: 'all',
  searchQuery: '',
  activeModalSession: null,
  bookmarkedSessions: [],
  currentPage: 1,

  setSelectedDateId: (id: string) => 
    set({ selectedDateId: id, currentPage: 1 }),

  setSelectedStage: (stage: string) => 
    set({ selectedStage: stage, currentPage: 1 }),

  setSearchQuery: (query: string) => 
    set({ searchQuery: query, currentPage: 1 }),

  setActiveModalSession: (session: TimelineSession | null) => 
    set({ activeModalSession: session }),

  toggleBookmark: (sessionTitle: string) => 
    set((state) => ({
      bookmarkedSessions: state.bookmarkedSessions.includes(sessionTitle)
        ? state.bookmarkedSessions.filter((title) => title !== sessionTitle)
        : [...state.bookmarkedSessions, sessionTitle],
    })),

  setCurrentPage: (page: number) => 
    set({ currentPage: page }),

  resetFilters: () => 
    set({ selectedDateId: 'all', selectedStage: 'all', searchQuery: '', currentPage: 1 }),
}))

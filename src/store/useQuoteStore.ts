import { create } from 'zustand'

interface QuoteState {
  activeQuoteIndex: number
  setActiveQuoteIndex: (index: number) => void
  nextQuote: (totalQuotes: number) => void
  prevQuote: (totalQuotes: number) => void
}

export const useQuoteStore = create<QuoteState>((set) => ({
  activeQuoteIndex: 0,

  setActiveQuoteIndex: (index: number) => 
    set({ activeQuoteIndex: index }),

  nextQuote: (totalQuotes: number) => 
    set((state) => ({ 
      activeQuoteIndex: (state.activeQuoteIndex + 1) % totalQuotes 
    })),

  prevQuote: (totalQuotes: number) => 
    set((state) => ({ 
      activeQuoteIndex: (state.activeQuoteIndex - 1 + totalQuotes) % totalQuotes 
    })),
}))

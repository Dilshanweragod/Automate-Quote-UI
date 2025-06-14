import { create } from 'zustand';
import { Quote, Project, MediaAssets, VoiceSettings, MusicSettings } from '../types';

interface AppState {
  currentProject: Project | null;
  projects: Project[];
  quotes: Quote[];
  mediaAssets: MediaAssets[];
  voiceSettings: VoiceSettings;
  musicSettings: MusicSettings;
  isProcessing: boolean;
  
  // Actions
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addQuote: (quote: Quote) => void;
  updateQuote: (id: string, updates: Partial<Quote>) => void;
  deleteQuote: (id: string) => void;
  generateQuotes: (count: number, category: string) => void;
  
  setVoiceSettings: (settings: VoiceSettings) => void;
  setMusicSettings: (settings: MusicSettings) => void;
  setProcessing: (processing: boolean) => void;
  
  addMediaAsset: (asset: MediaAssets) => void;
  updateMediaAsset: (quoteId: string, updates: Partial<MediaAssets>) => void;
}

const motivationalQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "success" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", category: "life" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "dreams" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "inspiration" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "motivation" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "opportunity" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "belief" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "action" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown", category: "mindset" }
];

export const useStore = create<AppState>((set, get) => ({
  currentProject: null,
  projects: [],
  quotes: [],
  mediaAssets: [],
  voiceSettings: {
    voice: 'neural-voice-1',
    speed: 1.0,
    pitch: 1.0,
    language: 'en-US'
  },
  musicSettings: {
    genre: 'ambient',
    mood: 'inspirational',
    duration: 60,
    fadeIn: true,
    fadeOut: true
  },
  isProcessing: false,

  setCurrentProject: (project) => set({ currentProject: project }),
  
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, project],
    currentProject: project
  })),
  
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p),
    currentProject: state.currentProject?.id === id 
      ? { ...state.currentProject, ...updates } 
      : state.currentProject
  })),
  
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(p => p.id !== id),
    currentProject: state.currentProject?.id === id ? null : state.currentProject
  })),
  
  addQuote: (quote) => set((state) => ({ 
    quotes: [...state.quotes, quote] 
  })),
  
  updateQuote: (id, updates) => set((state) => ({
    quotes: state.quotes.map(q => q.id === id ? { ...q, ...updates } : q)
  })),
  
  deleteQuote: (id) => set((state) => ({
    quotes: state.quotes.filter(q => q.id !== id)
  })),
  
  generateQuotes: (count, category) => {
    const filteredQuotes = category === 'all' 
      ? motivationalQuotes 
      : motivationalQuotes.filter(q => q.category === category);
    
    const newQuotes: Quote[] = [];
    for (let i = 0; i < count; i++) {
      const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      newQuotes.push({
        id: `quote-${Date.now()}-${i}`,
        text: randomQuote.text,
        author: randomQuote.author,
        category: randomQuote.category,
        createdAt: new Date(),
        status: 'draft'
      });
    }
    
    set((state) => ({ quotes: [...state.quotes, ...newQuotes] }));
  },
  
  setVoiceSettings: (settings) => set({ voiceSettings: settings }),
  setMusicSettings: (settings) => set({ musicSettings: settings }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  
  addMediaAsset: (asset) => set((state) => ({
    mediaAssets: [...state.mediaAssets, asset]
  })),
  
  updateMediaAsset: (quoteId, updates) => set((state) => ({
    mediaAssets: state.mediaAssets.map(a => 
      a.quoteId === quoteId ? { ...a, ...updates } : a
    )
  }))
}));
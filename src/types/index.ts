export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  createdAt: Date;
  status: 'draft' | 'processing' | 'ready' | 'completed';
}

export interface MediaAssets {
  quoteId: string;
  videoUrl?: string;
  voiceUrl?: string;
  musicUrl?: string;
  canvaDesignId?: string;
  downloadFolder?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  quotes: Quote[];
  createdAt: Date;
  status: 'active' | 'completed' | 'archived';
}

export interface VoiceSettings {
  voice: string;
  speed: number;
  pitch: number;
  language: string;
}

export interface MusicSettings {
  genre: string;
  mood: string;
  duration: number;
  fadeIn: boolean;
  fadeOut: boolean;
}
// API Integration utilities for external services

export interface APIConfig {
  openaiApiKey?: string;
  canvaApiKey?: string;
  elevenLabsApiKey?: string;
  youtubeApiKey?: string;
}

// OpenAI Text-to-Speech API
export const generateVoiceOver = async (text: string, voice: string, apiKey: string) => {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: voice,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate voice over');
  }

  return response.blob();
};

// ElevenLabs API (Alternative TTS)
export const generateVoiceOverElevenLabs = async (text: string, voiceId: string, apiKey: string) => {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate voice over with ElevenLabs');
  }

  return response.blob();
};

// Canva API for bulk design creation
export const createCanvaDesign = async (quote: string, author: string, apiKey: string) => {
  // Note: This is a simplified example. Real Canva API integration would be more complex
  const response = await fetch('https://api.canva.com/v1/designs', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      design_type: 'Instagram_Post_Square',
      title: `Quote: ${quote.substring(0, 50)}...`,
      // Add template and content configuration here
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create Canva design');
  }

  return response.json();
};

// YouTube Music Library API (for background music)
export const searchYouTubeMusicLibrary = async (query: string, apiKey: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Failed to search YouTube Music Library');
  }

  return response.json();
};

// File download utility
export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Create organized folder structure
export const createFolderStructure = (projectName: string, quotes: any[]) => {
  // This would create a structured folder system for downloads
  const structure = {
    projectName,
    folders: {
      videos: `${projectName}/videos/`,
      voiceTracks: `${projectName}/voice-tracks/`,
      backgroundMusic: `${projectName}/background-music/`,
      rawQuotes: `${projectName}/raw-quotes/`,
      exports: `${projectName}/exports/`,
    },
    files: quotes.map((quote, index) => ({
      quoteId: quote.id,
      videoFile: `${projectName}/videos/quote_${index + 1}.mp4`,
      voiceFile: `${projectName}/voice-tracks/voice_${index + 1}.mp3`,
      musicFile: `${projectName}/background-music/music_${index + 1}.mp3`,
      textFile: `${projectName}/raw-quotes/quote_${index + 1}.txt`,
    })),
  };

  return structure;
};

// Batch processing utility
export const processBatch = async (
  quotes: any[],
  config: {
    includeVoice: boolean;
    includeMusic: boolean;
    voiceSettings: any;
    musicSettings: any;
    apiKeys: APIConfig;
  },
  onProgress: (progress: number) => void
) => {
  const results = [];
  
  for (let i = 0; i < quotes.length; i++) {
    const quote = quotes[i];
    const result: any = { quoteId: quote.id };

    try {
      // Generate voice over if enabled
      if (config.includeVoice && config.apiKeys.openaiApiKey) {
        const voiceBlob = await generateVoiceOver(
          quote.text,
          config.voiceSettings.voice,
          config.apiKeys.openaiApiKey
        );
        result.voiceBlob = voiceBlob;
      }

      // Create Canva design if enabled
      if (config.apiKeys.canvaApiKey) {
        const design = await createCanvaDesign(
          quote.text,
          quote.author,
          config.apiKeys.canvaApiKey
        );
        result.canvaDesign = design;
      }

      // Search for background music if enabled
      if (config.includeMusic && config.apiKeys.youtubeApiKey) {
        const musicSearch = await searchYouTubeMusicLibrary(
          `${config.musicSettings.genre} ${config.musicSettings.mood} instrumental`,
          config.apiKeys.youtubeApiKey
        );
        result.musicOptions = musicSearch.items;
      }

      results.push(result);
      onProgress(((i + 1) / quotes.length) * 100);
    } catch (error) {
      console.error(`Error processing quote ${quote.id}:`, error);
      result.error = error.message;
      results.push(result);
    }
  }

  return results;
};
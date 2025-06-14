import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Download, Settings, Volume2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const musicGenres = [
  'ambient', 'cinematic', 'uplifting', 'inspirational', 'corporate', 
  'emotional', 'motivational', 'peaceful', 'energetic', 'dramatic'
];

const musicMoods = [
  'inspirational', 'calm', 'upbeat', 'emotional', 'powerful',
  'serene', 'triumphant', 'hopeful', 'contemplative', 'dynamic'
];

export const BackgroundMusic: React.FC = () => {
  const { quotes, musicSettings, setMusicSettings, setProcessing } = useStore();
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handleMusicSettingsChange = (key: string, value: any) => {
    setMusicSettings({ ...musicSettings, [key]: value });
  };

  const handleQuoteSelection = (quoteId: string) => {
    setSelectedQuotes(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const handleSelectAll = () => {
    if (selectedQuotes.length === quotes.length) {
      setSelectedQuotes([]);
    } else {
      setSelectedQuotes(quotes.map(q => q.id));
    }
  };

  const handleGenerateMusic = async () => {
    if (selectedQuotes.length === 0) {
      toast.error('Please select at least one quote');
      return;
    }

    setProcessing(true);
    toast.loading('Generating background music...', { id: 'music-generation' });

    try {
      // Simulate API call to generate background music
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      toast.success(`Generated ${selectedQuotes.length} background tracks!`, { id: 'music-generation' });
      setSelectedQuotes([]);
    } catch (error) {
      toast.error('Failed to generate background music', { id: 'music-generation' });
    } finally {
      setProcessing(false);
    }
  };

  const handlePlayPreview = (quoteId: string) => {
    if (isPlaying === quoteId) {
      setIsPlaying(null);
    } else {
      setIsPlaying(quoteId);
      // Simulate audio playback
      setTimeout(() => setIsPlaying(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-slate-600" />
          <h2 className="text-2xl font-bold text-slate-900">Background Music Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Genre
            </label>
            <select
              value={musicSettings.genre}
              onChange={(e) => handleMusicSettingsChange('genre', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {musicGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Mood
            </label>
            <select
              value={musicSettings.mood}
              onChange={(e) => handleMusicSettingsChange('mood', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {musicMoods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Duration (seconds)
            </label>
            <input
              type="number"
              min="15"
              max="300"
              value={musicSettings.duration}
              onChange={(e) => handleMusicSettingsChange('duration', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fade In
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={musicSettings.fadeIn}
                onChange={(e) => handleMusicSettingsChange('fadeIn', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600">Enable</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fade Out
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={musicSettings.fadeOut}
                onChange={(e) => handleMusicSettingsChange('fadeOut', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600">Enable</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {selectedQuotes.length === quotes.length ? 'Deselect All' : 'Select All'}
            </button>
            <span className="text-sm text-slate-600">
              {selectedQuotes.length} of {quotes.length} quotes selected
            </span>
          </div>
          
          <button
            onClick={handleGenerateMusic}
            disabled={selectedQuotes.length === 0}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Music className="w-4 h-4" />
            <span>Generate Background Music</span>
          </button>
        </div>
      </div>

      {/* Quotes List */}
      <div className="space-y-4">
        {quotes.map((quote, index) => (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl border-2 p-6 transition-all ${
              selectedQuotes.includes(quote.id)
                ? 'border-purple-500 bg-purple-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedQuotes.includes(quote.id)}
                onChange={() => handleQuoteSelection(quote.id)}
                className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      quote.status === 'completed' ? 'bg-green-100 text-green-800' :
                      quote.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      quote.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {quote.status}
                    </span>
                    <span className="ml-2 text-xs text-slate-500 capitalize">
                      {quote.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePlayPreview(quote.id)}
                      className="p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      {isPlaying === quote.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                    <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <blockquote className="text-slate-800 font-medium mb-2 leading-relaxed">
                  "{quote.text}"
                </blockquote>
                
                <footer className="text-sm text-slate-600 mb-3">
                  — {quote.author}
                </footer>
                
                <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span>Music: {musicSettings.genre} • {musicSettings.mood}</span>
                    <span>Duration: {musicSettings.duration}s</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {quotes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No quotes available</h3>
          <p className="text-slate-600">Generate some quotes first to add background music</p>
        </div>
      )}
    </div>
  );
};
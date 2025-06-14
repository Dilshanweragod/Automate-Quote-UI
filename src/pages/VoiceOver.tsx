import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Download, Settings, Volume2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const voices = [
  { id: 'neural-voice-1', name: 'Sarah - Professional', gender: 'Female', language: 'en-US' },
  { id: 'neural-voice-2', name: 'David - Energetic', gender: 'Male', language: 'en-US' },
  { id: 'neural-voice-3', name: 'Emma - Warm', gender: 'Female', language: 'en-GB' },
  { id: 'neural-voice-4', name: 'Michael - Confident', gender: 'Male', language: 'en-US' },
  { id: 'neural-voice-5', name: 'Olivia - Inspiring', gender: 'Female', language: 'en-AU' },
];

export const VoiceOver: React.FC = () => {
  const { quotes, voiceSettings, setVoiceSettings, setProcessing } = useStore();
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handleVoiceSettingsChange = (key: string, value: any) => {
    setVoiceSettings({ ...voiceSettings, [key]: value });
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

  const handleGenerateVoiceOvers = async () => {
    if (selectedQuotes.length === 0) {
      toast.error('Please select at least one quote');
      return;
    }

    setProcessing(true);
    toast.loading('Generating voice overs...', { id: 'voice-generation' });

    try {
      // Simulate API call to generate voice overs
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success(`Generated ${selectedQuotes.length} voice overs!`, { id: 'voice-generation' });
      setSelectedQuotes([]);
    } catch (error) {
      toast.error('Failed to generate voice overs', { id: 'voice-generation' });
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
      setTimeout(() => setIsPlaying(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-slate-600" />
          <h2 className="text-2xl font-bold text-slate-900">Voice Over Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Voice
            </label>
            <select
              value={voiceSettings.voice}
              onChange={(e) => handleVoiceSettingsChange('voice', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {voices.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Speed: {voiceSettings.speed}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voiceSettings.speed}
              onChange={(e) => handleVoiceSettingsChange('speed', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Pitch: {voiceSettings.pitch}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voiceSettings.pitch}
              onChange={(e) => handleVoiceSettingsChange('pitch', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Language
            </label>
            <select
              value={voiceSettings.language}
              onChange={(e) => handleVoiceSettingsChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="en-AU">English (AU)</option>
            </select>
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
            onClick={handleGenerateVoiceOvers}
            disabled={selectedQuotes.length === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>Generate Voice Overs</span>
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
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedQuotes.includes(quote.id)}
                onChange={() => handleQuoteSelection(quote.id)}
                className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
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
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                
                <footer className="text-sm text-slate-600">
                  — {quote.author}
                </footer>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {quotes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No quotes available</h3>
          <p className="text-slate-600">Generate some quotes first to create voice overs</p>
        </div>
      )}
    </div>
  );
};
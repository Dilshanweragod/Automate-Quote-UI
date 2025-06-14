import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, Play, Download, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Quote } from '../types';
import toast from 'react-hot-toast';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'success', label: 'Success' },
  { value: 'motivation', label: 'Motivation' },
  { value: 'life', label: 'Life' },
  { value: 'dreams', label: 'Dreams' },
  { value: 'inspiration', label: 'Inspiration' },
  { value: 'opportunity', label: 'Opportunity' },
  { value: 'belief', label: 'Belief' },
  { value: 'action', label: 'Action' },
  { value: 'mindset', label: 'Mindset' },
];

export const QuoteGenerator: React.FC = () => {
  const { quotes, generateQuotes, deleteQuote, updateQuote } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quotesToGenerate, setQuotesToGenerate] = useState(5);
  const [editingQuote, setEditingQuote] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  const handleGenerateQuotes = () => {
    generateQuotes(quotesToGenerate, selectedCategory);
    toast.success(`Generated ${quotesToGenerate} quotes!`);
  };

  const handleDeleteQuote = (id: string) => {
    deleteQuote(id);
    toast.success('Quote deleted successfully');
  };

  const handleEditQuote = (quote: Quote) => {
    setEditingQuote(quote.id);
    setEditText(quote.text);
    setEditAuthor(quote.author);
  };

  const handleSaveEdit = () => {
    if (editingQuote) {
      updateQuote(editingQuote, {
        text: editText,
        author: editAuthor,
      });
      setEditingQuote(null);
      setEditText('');
      setEditAuthor('');
      toast.success('Quote updated successfully');
    }
  };

  const handleCancelEdit = () => {
    setEditingQuote(null);
    setEditText('');
    setEditAuthor('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Quote Generator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Number of Quotes
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={quotesToGenerate}
              onChange={(e) => setQuotesToGenerate(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleGenerateQuotes}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Quotes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote, index) => (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            {editingQuote === quote.id ? (
              <div className="space-y-4">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  placeholder="Quote text..."
                />
                <input
                  type="text"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Author name..."
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-slate-600 text-white px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
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
                
                <blockquote className="text-slate-800 font-medium mb-4 leading-relaxed">
                  "{quote.text}"
                </blockquote>
                
                <footer className="text-sm text-slate-600 mb-4">
                  — {quote.author}
                </footer>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditQuote(quote)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuote(quote.id)}
                      className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {quotes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No quotes yet</h3>
          <p className="text-slate-600 mb-4">Generate your first batch of motivational quotes</p>
          <button
            onClick={handleGenerateQuotes}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Quotes
          </button>
        </div>
      )}
    </div>
  );
};
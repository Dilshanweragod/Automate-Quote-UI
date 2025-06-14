import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Mic, 
  Music, 
  Download, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Plus
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const stats = [
  { name: 'Total Quotes', value: '1,234', icon: FileText, change: '+12%', color: 'text-blue-600' },
  { name: 'Voice Overs', value: '891', icon: Mic, change: '+18%', color: 'text-green-600' },
  { name: 'Music Tracks', value: '456', icon: Music, change: '+8%', color: 'text-purple-600' },
  { name: 'Downloads', value: '2,345', icon: Download, change: '+23%', color: 'text-orange-600' },
];

const recentActivity = [
  { id: 1, action: 'Generated 10 success quotes', time: '2 hours ago', status: 'completed' },
  { id: 2, action: 'Created voice over for motivation batch', time: '4 hours ago', status: 'processing' },
  { id: 3, action: 'Downloaded media package', time: '6 hours ago', status: 'completed' },
  { id: 4, action: 'Added background music to 5 quotes', time: '8 hours ago', status: 'completed' },
];

export const Dashboard: React.FC = () => {
  const { projects, quotes } = useStore();
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate('/quotes');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to QuoteFlow</h1>
            <p className="text-blue-100 text-lg">
              Create stunning motivational content with AI-powered automation
            </p>
          </div>
          <button
            onClick={handleCreateProject}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Start Creating</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {activity.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/quotes')}
              className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <p className="font-medium text-slate-900">Generate Quotes</p>
              <p className="text-xs text-slate-600">Create new motivational quotes</p>
            </button>
            
            <button
              onClick={() => navigate('/voice')}
              className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Mic className="w-8 h-8 text-green-600 mb-2" />
              <p className="font-medium text-slate-900">Voice Over</p>
              <p className="text-xs text-slate-600">Add AI voice narration</p>
            </button>
            
            <button
              onClick={() => navigate('/music')}
              className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <Music className="w-8 h-8 text-purple-600 mb-2" />
              <p className="font-medium text-slate-900">Background Music</p>
              <p className="text-xs text-slate-600">Add ambient soundtracks</p>
            </button>
            
            <button
              onClick={() => navigate('/bulk')}
              className="p-4 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <Download className="w-8 h-8 text-orange-600 mb-2" />
              <p className="font-medium text-slate-900">Bulk Process</p>
              <p className="text-xs text-slate-600">Create multiple assets</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
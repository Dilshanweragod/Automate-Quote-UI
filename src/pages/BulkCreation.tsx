import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  FileText, 
  Mic, 
  Music, 
  Download, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Play
} from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

interface BatchJob {
  id: string;
  name: string;
  type: 'complete' | 'quotes-only' | 'voice-only' | 'music-only';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  quotesCount: number;
  createdAt: Date;
  completedAt?: Date;
}

export const BulkCreation: React.FC = () => {
  const { quotes, generateQuotes, setProcessing } = useStore();
  const [batchJobs, setBatchJobs] = useState<BatchJob[]>([]);
  const [batchConfig, setBatchConfig] = useState({
    name: '',
    type: 'complete' as const,
    quotesCount: 10,
    category: 'all',
    includeVoice: true,
    includeMusic: true,
    createFolders: true
  });

  const handleCreateBatch = async () => {
    if (!batchConfig.name.trim()) {
      toast.error('Please enter a batch name');
      return;
    }

    const newJob: BatchJob = {
      id: `batch-${Date.now()}`,
      name: batchConfig.name,
      type: batchConfig.type,
      status: 'pending',
      progress: 0,
      quotesCount: batchConfig.quotesCount,
      createdAt: new Date()
    };

    setBatchJobs(prev => [newJob, ...prev]);
    
    // Start processing
    await processBatchJob(newJob);
  };

  const processBatchJob = async (job: BatchJob) => {
    setBatchJobs(prev => prev.map(j => 
      j.id === job.id ? { ...j, status: 'processing' } : j
    ));

    setProcessing(true);
    toast.loading(`Processing batch: ${job.name}`, { id: job.id });

    try {
      // Simulate batch processing with progress updates
      const steps = [
        { name: 'Generating quotes', duration: 2000, progress: 25 },
        { name: 'Creating voice overs', duration: 3000, progress: 50 },
        { name: 'Adding background music', duration: 2500, progress: 75 },
        { name: 'Organizing files', duration: 1500, progress: 100 }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, step.duration));
        setBatchJobs(prev => prev.map(j => 
          j.id === job.id ? { ...j, progress: step.progress } : j
        ));
      }

      // Generate actual quotes
      generateQuotes(job.quotesCount, batchConfig.category);

      setBatchJobs(prev => prev.map(j => 
        j.id === job.id ? { 
          ...j, 
          status: 'completed', 
          completedAt: new Date() 
        } : j
      ));

      toast.success(`Batch completed: ${job.name}`, { id: job.id });
    } catch (error) {
      setBatchJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, status: 'failed' } : j
      ));
      toast.error(`Batch failed: ${job.name}`, { id: job.id });
    } finally {
      setProcessing(false);
    }
  };

  const getStatusIcon = (status: BatchJob['status'], progress: number) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return (
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 border-2 border-blue-200 rounded-full"></div>
            <div 
              className="absolute inset-0 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"
              style={{ 
                background: `conic-gradient(from 0deg, #3B82F6 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)` 
              }}
            ></div>
          </div>
        );
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Batch Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-6 h-6 text-slate-600" />
          <h2 className="text-2xl font-bold text-slate-900">Bulk Creation</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Batch Name
            </label>
            <input
              type="text"
              value={batchConfig.name}
              onChange={(e) => setBatchConfig({ ...batchConfig, name: e.target.value })}
              placeholder="e.g., Motivational Monday Batch"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Creation Type
            </label>
            <select
              value={batchConfig.type}
              onChange={(e) => setBatchConfig({ ...batchConfig, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="complete">Complete Package (Quotes + Voice + Music)</option>
              <option value="quotes-only">Quotes Only</option>
              <option value="voice-only">Voice Overs Only</option>
              <option value="music-only">Background Music Only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Number of Quotes
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={batchConfig.quotesCount}
              onChange={(e) => setBatchConfig({ ...batchConfig, quotesCount: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              value={batchConfig.category}
              onChange={(e) => setBatchConfig({ ...batchConfig, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="success">Success</option>
              <option value="motivation">Motivation</option>
              <option value="inspiration">Inspiration</option>
              <option value="life">Life</option>
              <option value="dreams">Dreams</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={batchConfig.createFolders}
              onChange={(e) => setBatchConfig({ ...batchConfig, createFolders: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">Create organized folders</span>
          </label>
        </div>
        
        <button
          onClick={handleCreateBatch}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Zap className="w-5 h-5" />
          <span>Start Batch Creation</span>
        </button>
      </div>

      {/* Batch Jobs */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Batch Jobs</h3>
        
        {batchJobs.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-lg font-medium text-slate-900 mb-2">No batch jobs yet</h4>
            <p className="text-slate-600">Create your first batch to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {batchJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-slate-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(job.status, job.progress)}
                    <div>
                      <h4 className="font-medium text-slate-900">{job.name}</h4>
                      <p className="text-sm text-slate-600">
                        {job.quotesCount} quotes • {job.type.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {job.status === 'completed' && (
                      <button className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    <span className="text-xs text-slate-500">
                      {job.status === 'completed' && job.completedAt
                        ? `Completed ${job.completedAt.toLocaleTimeString()}`
                        : `Created ${job.createdAt.toLocaleTimeString()}`
                      }
                    </span>
                  </div>
                </div>
                
                {job.status === 'processing' && (
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${job.progress}%` }}
                    ></div>
                  </div>
                )}
                
                {job.status === 'completed' && (
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{job.quotesCount} quotes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mic className="w-4 h-4" />
                      <span>{job.quotesCount} voice overs</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Music className="w-4 h-4" />
                      <span>{job.quotesCount} music tracks</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
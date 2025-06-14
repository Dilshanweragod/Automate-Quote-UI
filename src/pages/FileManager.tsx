import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, 
  File, 
  Download, 
  Trash2, 
  Share, 
  Eye,
  Music,
  Mic,
  FileText,
  Archive
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'video' | 'audio' | 'text' | 'archive';
  size: string;
  modified: Date;
  path: string;
  children?: FileItem[];
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Motivational Monday Batch',
    type: 'folder',
    size: '2.3 GB',
    modified: new Date('2024-01-15'),
    path: '/projects/motivational-monday',
    children: [
      {
        id: '1-1',
        name: 'Videos',
        type: 'folder',
        size: '1.8 GB',
        modified: new Date('2024-01-15'),
        path: '/projects/motivational-monday/videos',
        children: [
          {
            id: '1-1-1',
            name: 'success_quote_001.mp4',
            type: 'video',
            size: '45.2 MB',
            modified: new Date('2024-01-15'),
            path: '/projects/motivational-monday/videos/success_quote_001.mp4'
          },
          {
            id: '1-1-2',
            name: 'motivation_quote_002.mp4',
            type: 'video',
            size: '38.7 MB',
            modified: new Date('2024-01-15'),
            path: '/projects/motivational-monday/videos/motivation_quote_002.mp4'
          }
        ]
      },
      {
        id: '1-2',
        name: 'Voice Tracks',
        type: 'folder',
        size: '250 MB',
        modified: new Date('2024-01-15'),
        path: '/projects/motivational-monday/voice',
        children: [
          {
            id: '1-2-1',
            name: 'voice_001.mp3',
            type: 'audio',
            size: '12.5 MB',
            modified: new Date('2024-01-15'),
            path: '/projects/motivational-monday/voice/voice_001.mp3'
          }
        ]
      },
      {
        id: '1-3',
        name: 'Background Music',
        type: 'folder',
        size: '180 MB',
        modified: new Date('2024-01-15'),
        path: '/projects/motivational-monday/music',
        children: [
          {
            id: '1-3-1',
            name: 'ambient_001.mp3',
            type: 'audio',
            size: '8.9 MB',
            modified: new Date('2024-01-15'),
            path: '/projects/motivational-monday/music/ambient_001.mp3'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Success Stories Collection',
    type: 'folder',
    size: '1.8 GB',
    modified: new Date('2024-01-14'),
    path: '/projects/success-stories',
    children: []
  },
  {
    id: '3',
    name: 'Inspiration Quotes Archive.zip',
    type: 'archive',
    size: '890 MB',
    modified: new Date('2024-01-13'),
    path: '/downloads/inspiration-quotes-archive.zip'
  }
];

export const FileManager: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['1']);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-5 h-5 text-blue-500" />;
      case 'video':
        return <FileText className="w-5 h-5 text-green-500" />;
      case 'audio':
        return <Music className="w-5 h-5 text-purple-500" />;
      case 'archive':
        return <Archive className="w-5 h-5 text-orange-500" />;
      default:
        return <File className="w-5 h-5 text-slate-500" />;
    }
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const renderFileTree = (files: FileItem[], level: number = 0) => {
    return files.map((file, index) => (
      <div key={file.id}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors ${
            selectedFiles.includes(file.id) ? 'bg-blue-50 border border-blue-200' : ''
          }`}
          style={{ marginLeft: `${level * 20}px` }}
        >
          <input
            type="checkbox"
            checked={selectedFiles.includes(file.id)}
            onChange={() => toggleFileSelection(file.id)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          
          <div
            className="flex items-center space-x-2 flex-1 cursor-pointer"
            onClick={() => file.type === 'folder' && toggleFolder(file.id)}
          >
            {getFileIcon(file.type)}
            <span className="font-medium text-slate-900">{file.name}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <span>{file.size}</span>
            <span>{file.modified.toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-1 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors">
              <Share className="w-4 h-4" />
            </button>
            <button className="p-1 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
        
        {file.type === 'folder' && 
         expandedFolders.includes(file.id) && 
         file.children && 
         file.children.length > 0 && (
          <div className="mt-2">
            {renderFileTree(file.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Folder className="w-6 h-6 text-slate-600" />
            <h2 className="text-2xl font-bold text-slate-900">File Manager</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedFiles.length > 0 && (
              <>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Selected ({selectedFiles.length})</span>
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-600">
          <span>Projects</span>
          <span className="mx-2">/</span>
          <span className="text-slate-900">All Files</span>
        </nav>
      </div>

      {/* File Tree */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="space-y-2">
          {renderFileTree(mockFiles)}
        </div>
      </div>

      {/* Storage Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Total Projects</h3>
              <p className="text-2xl font-bold text-slate-900">12</p>
            </div>
          </div>
          <p className="text-sm text-slate-600">Active projects with media files</p>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Archive className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Storage Used</h3>
              <p className="text-2xl font-bold text-slate-900">8.2 GB</p>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-xs text-slate-600 mt-2">65% of 12.5 GB used</p>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Downloads</h3>
              <p className="text-2xl font-bold text-slate-900">247</p>
            </div>
          </div>
          <p className="text-sm text-slate-600">Files downloaded this month</p>
        </div>
      </div>
    </div>
  );
};
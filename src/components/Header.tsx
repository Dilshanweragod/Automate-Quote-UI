import React from 'react';
import { Bell, User, Settings, Download } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { currentProject, isProcessing } = useStore();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {currentProject ? currentProject.name : 'Motivation Quotes Generator'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {currentProject ? currentProject.description : 'Create engaging motivational content'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {isProcessing && (
            <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span className="text-sm font-medium">Processing...</span>
            </div>
          )}
          
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
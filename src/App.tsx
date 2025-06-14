import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { QuoteGenerator } from './pages/QuoteGenerator';
import { VoiceOver } from './pages/VoiceOver';
import { BackgroundMusic } from './pages/BackgroundMusic';
import { BulkCreation } from './pages/BulkCreation';
import { FileManager } from './pages/FileManager';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="quotes" element={<QuoteGenerator />} />
            <Route path="voice" element={<VoiceOver />} />
            <Route path="music" element={<BackgroundMusic />} />
            <Route path="bulk" element={<BulkCreation />} />
            <Route path="files" element={<FileManager />} />
            <Route path="downloads" element={<FileManager />} />
            <Route path="analytics" element={<Dashboard />} />
            <Route path="settings" element={<Dashboard />} />
          </Route>
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
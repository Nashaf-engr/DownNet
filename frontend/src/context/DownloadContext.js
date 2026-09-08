import React, { createContext, useContext, useState } from 'react';

const DownloadContext = createContext();

export function DownloadProvider({ children }) {
  const [downloads, setDownloads] = useState({});
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('downnetSettings');
    return saved ? JSON.parse(saved) : {
      defaultSavePath: '',
      autoDeleteAfterDays: 0,
      theme: 'dark'
    };
  });

  const addDownload = (id, data) => {
    setDownloads(prev => ({
      ...prev,
      [id]: data
    }));
  };

  const updateDownload = (id, data) => {
    setDownloads(prev => ({
      ...prev,
      [id]: { ...prev[id], ...data }
    }));
  };

  const removeDownload = (id) => {
    setDownloads(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('downnetSettings', JSON.stringify(updated));
  };

  return (
    <DownloadContext.Provider value={{
      downloads,
      addDownload,
      updateDownload,
      removeDownload,
      settings,
      updateSettings
    }}>
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownloadContext() {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownloadContext must be used within DownloadProvider');
  }
  return context;
}

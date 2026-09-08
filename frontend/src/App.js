import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/global.css';
import './styles/app.css';
import { DownloadProvider } from './context/DownloadContext';
import Header from './components/Header';
import URLInput from './components/URLInput';
import PlatformSelector from './components/PlatformSelector';
import FormatSelector from './components/FormatSelector';
import SaveLocationPicker from './components/SaveLocationPicker';
import DownloadButton from './components/DownloadButton';
import DownloadProgress from './components/DownloadProgress';
import DownloadHistory from './components/DownloadHistory';
import SettingsModal from './components/SettingsModal';

const API_BASE = 'http://localhost:5000/api';

function AppContent() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [format, setFormat] = useState('');
  const [quality, setQuality] = useState('');
  const [savePath, setSavePath] = useState(localStorage.getItem('lastSavePath') || '');
  const [platforms, setPlatforms] = useState([]);
  const [formats, setFormats] = useState({});
  const [downloading, setDownloading] = useState(false);
  const [downloadId, setDownloadId] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('downloadHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchPlatforms();
  }, []);

  useEffect(() => {
    if (platform) {
      fetchFormats(platform);
      setFormat('');
      setQuality('');
    }
  }, [platform]);

  useEffect(() => {
    if (downloadId) {
      const interval = setInterval(() => {
        checkDownloadStatus(downloadId);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [downloadId]);

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(`${API_BASE}/platforms`);
      setPlatforms(response.data.platforms);
    } catch (err) {
      setError('Failed to load platforms');
    }
  };

  const fetchFormats = async (selectedPlatform) => {
    try {
      const response = await axios.get(`${API_BASE}/formats/${selectedPlatform}`);
      setFormats(response.data);
    } catch (err) {
      setError('Failed to load formats');
    }
  };

  const checkDownloadStatus = async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/download/${id}`);
      setDownloadStatus(response.data);

      if (response.data.status === 'completed' || response.data.status === 'failed') {
        setDownloading(false);
        setDownloadId(null);

        const newEntry = {
          id,
          platform,
          url,
          format,
          quality,
          status: response.data.status,
          timestamp: new Date().toISOString(),
          result: response.data.result
        };

        const updated = [newEntry, ...history];
        setHistory(updated.slice(0, 50));
        localStorage.setItem('downloadHistory', JSON.stringify(updated.slice(0, 50)));
      }
    } catch (err) {
      console.error('Failed to check status');
    }
  };

  const handleDownload = async () => {
    if (!url || !platform || !format || !quality || !savePath) {
      setError('Please fill all fields');
      return;
    }

    setError('');
    setDownloading(true);
    setDownloadStatus(null);

    try {
      const response = await axios.post(`${API_BASE}/download`, {
        url,
        platform,
        format,
        quality,
        savePath
      });

      setDownloadId(response.data.download_id);
      localStorage.setItem('lastSavePath', savePath);
    } catch (err) {
      setError(err.response?.data?.error || 'Download failed');
      setDownloading(false);
    }
  };

  return (
    <div className="app">
      <Header onSettingsClick={() => setShowSettings(true)} />

      <main className="container">
        <div className="main-content">
          <div className="input-section">
            <URLInput
              url={url}
              setUrl={setUrl}
              error={error}
              setError={setError}
            />

            <PlatformSelector
              platforms={platforms}
              selected={platform}
              onChange={setPlatform}
            />

            {platform && (
              <>
                <FormatSelector
                  formats={formats}
                  selectedFormat={format}
                  onFormatChange={setFormat}
                  selectedQuality={quality}
                  onQualityChange={setQuality}
                />

                <SaveLocationPicker
                  savePath={savePath}
                  setSavePath={setSavePath}
                />
              </>
            )}

            {error && (
              <div className="error-message">
                <span>⚠️ {error}</span>
              </div>
            )}

            <DownloadButton
              onClick={handleDownload}
              loading={downloading}
              disabled={!url || !platform || !format || !quality || !savePath}
            />
          </div>

          <div className="right-panel">
            {downloadStatus && (
              <DownloadProgress status={downloadStatus} />
            )}

            {history.length > 0 && (
              <DownloadHistory history={history} />
            )}
          </div>
        </div>
      </main>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

function App() {
  return (
    <DownloadProvider>
      <AppContent />
    </DownloadProvider>
  );
}

export default App;

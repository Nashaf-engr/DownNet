import React from 'react';
import { Download, Settings } from 'lucide-react';
import './Header.css';

function Header({ onSettingsClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">
            <Download size={32} />
          </div>
          <div className="title-section">
            <h1>DownNet</h1>
            <p>Social Media Downloader</p>
          </div>
        </div>
        <div className="header-info">
          <p>Download videos, audios & posts from multiple platforms</p>
        </div>
        <button className="settings-btn" onClick={onSettingsClick} title="Settings">
          <Settings size={24} />
        </button>
      </div>
    </header>
  );
}

export default Header;

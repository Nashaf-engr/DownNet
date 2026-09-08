import React from 'react';
import {
  Youtube,
  Instagram,
  Music,
  Pin,
  MessageCircle,
  Music2
} from 'lucide-react';
import './PlatformSelector.css';

const iconMap = {
  youtube: Youtube,
  instagram: Instagram,
  tiktok: Music2,
  pinterest: Pin,
  threads: MessageCircle,
  spotify: Music
};

function PlatformSelector({ platforms, selected, onChange }) {
  return (
    <div className="platform-group">
      <label>Select Platform</label>
      <div className="platforms-grid">
        {platforms.map((platform) => {
          const Icon = iconMap[platform.id] || Music;
          return (
            <button
              key={platform.id}
              className={`platform-card ${selected === platform.id ? 'active' : ''}`}
              onClick={() => onChange(platform.id)}
            >
              <Icon size={24} />
              <span>{platform.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PlatformSelector;

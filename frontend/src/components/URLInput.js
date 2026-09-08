import React, { useState } from 'react';
import { Link, AlertCircle } from 'lucide-react';
import './URLInput.css';

function URLInput({ url, setUrl, error, setError }) {
  const [isValidating, setIsValidating] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="url-input-group">
      <label>Media URL</label>
      <div className="input-wrapper">
        <Link size={20} className="input-icon" />
        <input
          type="text"
          placeholder="Enter YouTube, Instagram, TikTok, Pinterest, Threads, or Spotify link"
          value={url}
          onChange={handleChange}
          className={`url-input ${error ? 'error' : ''}`}
        />
      </div>
      {url && (
        <p className="input-hint">
          Supports: YouTube • Instagram • TikTok • Pinterest • Threads • Spotify
        </p>
      )}
    </div>
  );
}

export default URLInput;

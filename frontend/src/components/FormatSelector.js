import React from 'react';
import { Settings } from 'lucide-react';
import './FormatSelector.css';

function FormatSelector({ formats, selectedFormat, onFormatChange, selectedQuality, onQualityChange }) {
  const formatTypes = Object.keys(formats);
  const qualities = selectedFormat ? formats[selectedFormat] : [];

  return (
    <div className="format-section">
      <div className="format-group">
        <label>Format Type</label>
        <div className="format-buttons">
          {formatTypes.map((type) => (
            <button
              key={type}
              className={`format-btn ${selectedFormat === type ? 'active' : ''}`}
              onClick={() => {
                onFormatChange(type);
                onQualityChange('');
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {selectedFormat && (
        <div className="quality-group">
          <label>Quality</label>
          <div className="quality-grid">
            {qualities.map((q) => (
              <button
                key={q}
                className={`quality-btn ${selectedQuality === q ? 'active' : ''}`}
                onClick={() => onQualityChange(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormatSelector;

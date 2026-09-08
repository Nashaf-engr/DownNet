import React, { useState } from 'react';
import { FolderOpen, Check } from 'lucide-react';
import './SaveLocationPicker.css';

function SaveLocationPicker({ savePath, setSavePath }) {
  const [showPath, setShowPath] = useState(false);

  const handleInputChange = (e) => {
    setSavePath(e.target.value);
  };

  const handleBrowse = () => {
    // In real scenario, this would use electron or file picker API
    // For web, we'll use the folder picker if available
    if (window.showDirectoryPicker) {
      window.showDirectoryPicker().then((handle) => {
        setSavePath(handle.name);
      }).catch(() => {
        setShowPath(!showPath);
      });
    } else {
      setShowPath(!showPath);
    }
  };

  return (
    <div className="save-location-group">
      <label>Save Location</label>
      <div className="path-input-wrapper">
        <FolderOpen size={20} className="path-icon" />
        <input
          type="text"
          placeholder="Enter save path or select folder"
          value={savePath}
          onChange={handleInputChange}
          className="path-input"
        />
        <button className="browse-btn" onClick={handleBrowse}>
          Browse
        </button>
      </div>
      {savePath && (
        <div className="path-preview">
          <Check size={16} />
          <span>Path: {savePath}</span>
        </div>
      )}
    </div>
  );
}

export default SaveLocationPicker;

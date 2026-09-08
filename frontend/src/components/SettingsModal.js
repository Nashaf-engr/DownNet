import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useDownloadContext } from '../context/DownloadContext';
import './SettingsModal.css';

function SettingsModal({ isOpen, onClose }) {
  const { settings, updateSettings } = useDownloadContext();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    updateSettings(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="settings-form">
          <div className="form-group">
            <label>Default Save Path</label>
            <input
              type="text"
              value={localSettings.defaultSavePath}
              onChange={e => handleChange('defaultSavePath', e.target.value)}
              placeholder="Enter default download path"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Auto-delete files after (days)</label>
            <input
              type="number"
              value={localSettings.autoDeleteAfterDays}
              onChange={e => handleChange('autoDeleteAfterDays', parseInt(e.target.value))}
              min="0"
              placeholder="0 = disabled"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Theme</label>
            <select
              value={localSettings.theme}
              onChange={e => handleChange('theme', e.target.value)}
              className="form-input"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;

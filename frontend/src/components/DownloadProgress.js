import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import './DownloadProgress.css';

function DownloadProgress({ status }) {
  const getStatusIcon = () => {
    if (status.status === 'completed') return <CheckCircle size={24} />;
    if (status.status === 'failed') return <AlertCircle size={24} />;
    return <Clock size={24} />;
  };

  const getStatusClass = () => {
    if (status.status === 'completed') return 'success';
    if (status.status === 'failed') return 'error';
    return 'pending';
  };

  return (
    <div className="download-progress">
      <div className={`progress-container ${getStatusClass()}`}>
        <div className="progress-header">
          <div className="status-icon">
            {getStatusIcon()}
          </div>
          <div className="progress-info">
            <h3>{status.platform.toUpperCase()}</h3>
            <p className="status-text">
              {status.status === 'completed' && '✓ Download Complete!'}
              {status.status === 'failed' && '✗ Download Failed'}
              {status.status === 'starting' && 'Preparing download...'}
              {status.status === 'downloading' && 'Downloading...'}
            </p>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${status.progress || 0}%` }}
            />
          </div>
          <span className="progress-percent">{status.progress || 0}%</span>
        </div>

        {status.result && status.result.filename && (
          <div className="result-info">
            <span className="label">File:</span>
            <span className="value">{status.result.filename}</span>
          </div>
        )}

        {status.result && status.result.error && (
          <div className="error-details">
            <span className="label">Error:</span>
            <span className="value">{status.result.error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DownloadProgress;

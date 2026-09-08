import React from 'react';
import { Download, Trash2, Check, X } from 'lucide-react';
import './DownloadHistory.css';

function DownloadHistory({ history }) {
  const getStatusIcon = (status) => {
    if (status === 'completed') return <Check size={16} className="icon-success" />;
    if (status === 'failed') return <X size={16} className="icon-error" />;
    return <Download size={16} className="icon-pending" />;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const clearHistory = () => {
    if (window.confirm('Clear download history?')) {
      localStorage.removeItem('downloadHistory');
      window.location.reload();
    }
  };

  return (
    <div className="download-history">
      <div className="history-header">
        <h3>Download History</h3>
        <button className="clear-btn" onClick={clearHistory} title="Clear history">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className={`history-item status-${item.status}`}>
            <div className="history-icon">
              {getStatusIcon(item.status)}
            </div>
            <div className="history-details">
              <div className="history-title">
                {item.platform.toUpperCase()} - {item.format}
              </div>
              <div className="history-url" title={item.url}>
                {item.url.substring(0, 60)}...
              </div>
              <div className="history-time">
                {formatDate(item.timestamp)}
              </div>
            </div>
            <div className="history-status">
              {item.status === 'completed' && <span className="badge success">✓ Complete</span>}
              {item.status === 'failed' && <span className="badge error">✗ Failed</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DownloadHistory;

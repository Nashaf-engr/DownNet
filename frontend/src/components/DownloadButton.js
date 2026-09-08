import React from 'react';
import { Download, Loader } from 'lucide-react';
import './DownloadButton.css';

function DownloadButton({ onClick, loading, disabled }) {
  return (
    <button
      className={`download-btn ${loading ? 'loading' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <Loader size={20} className="spinner" />
          <span>Downloading...</span>
        </>
      ) : (
        <>
          <Download size={20} />
          <span>Download</span>
        </>
      )}
    </button>
  );
}

export default DownloadButton;

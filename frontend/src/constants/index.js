// API endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Platform info
export const PLATFORMS = {
  youtube: { name: 'YouTube', icon: 'youtube', color: '#FF0000' },
  instagram: { name: 'Instagram', icon: 'instagram', color: '#E4405F' },
  tiktok: { name: 'TikTok', icon: 'tiktok', color: '#000000' },
  pinterest: { name: 'Pinterest', icon: 'pinterest', color: '#E60023' },
  threads: { name: 'Threads', icon: 'threads', color: '#000000' },
  spotify: { name: 'Spotify', icon: 'spotify', color: '#1DB954' }
};

// Download status
export const DOWNLOAD_STATUS = {
  STARTING: 'starting',
  DOWNLOADING: 'downloading',
  COMPLETED: 'completed',
  FAILED: 'failed',
  PAUSED: 'paused'
};

// Format types
export const FORMAT_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  IMAGE: 'image',
  POST: 'post'
};

// Quality presets
export const QUALITY_PRESETS = {
  VIDEO: ['1080p', '720p', '480p', '360p', '240p'],
  AUDIO: ['320kbps', '256kbps', '192kbps', '128kbps'],
  IMAGE: ['original', '1080p', '720p', '480p']
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_URL: 'Please enter a valid URL',
  INVALID_PLATFORM: 'Platform not supported',
  NO_SAVE_PATH: 'Please select a save location',
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  INVALID_FORMAT: 'Invalid format selected',
  INVALID_QUALITY: 'Invalid quality selected'
};

// Success messages
export const SUCCESS_MESSAGES = {
  DOWNLOAD_STARTED: 'Download started successfully',
  DOWNLOAD_COMPLETED: 'Download completed successfully',
  URL_VALIDATED: 'URL is valid'
};

// Timeouts (in ms)
export const TIMEOUTS = {
  URL_VALIDATION: 5000,
  PLATFORM_FETCH: 5000,
  DOWNLOAD_CHECK: 1000
};

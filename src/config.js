const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('REACT_APP_API_BASE_URL is not defined');
}

export default apiBaseUrl;
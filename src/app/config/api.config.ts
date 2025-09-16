// Detectar ambiente baseado na URL atual ou variável
const getCurrentEnvironment = (): 'dev' | 'staging' | 'local' => {
  const hostname = window.location.hostname;

  if (hostname.includes('syndication-thereafter-cement-junior')) {
    return 'staging';
  } else if (hostname.includes('graphs-semiconductor-thomson-beginning')) {
    return 'dev';
  } else {
    return 'local';
  }
};

const API_URLS = {
  dev: 'https://picking-santa-hunter-suggesting.trycloudflare.com',
  staging: 'https://calendar-chapter-read-pic.trycloudflare.com',
  local: 'http://localhost:8080'
};

export const API_CONFIG = {
  BASE_URL: API_URLS[getCurrentEnvironment()],

  ENDPOINTS: {
    CLIENTS: '/api/clients',
    DASHBOARD: '/api/dashboard',
    EXPENSES: '/api/expenses',
    PRODUCTS: '/api/products',
    REVENUES: '/api/revenues'
  }
};

export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}

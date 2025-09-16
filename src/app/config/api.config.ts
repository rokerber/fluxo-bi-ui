// Detectar ambiente baseado na URL atual ou variável
const getCurrentEnvironment = (): 'dev' | 'staging' | 'local' => {
  const hostname = window.location.hostname;

  if (hostname.includes('syndication-thereafter-cement-junior')) {
    return 'staging';
  } else if (hostname.includes('safer-rick-scenic-architect')) {
    return 'dev';
  } else {
    return 'local';
  }
};

const API_URLS = {
  dev: 'https://borough-pediatric-nomination-camp.trycloudflare.com',
  staging: 'https://anna-couples-proceed-consistently.trycloudflare.com',
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

// Detectar ambiente baseado na URL atual ou variável
const getCurrentEnvironment = (): 'dev' | 'staging' | 'local' => {
  const hostname = window.location.hostname;

  if (hostname.includes('syndication-thereafter-cement-junior')) {
    return 'staging';
  } else if (hostname.includes('washing-news-bedford-reviewer')) {
    return 'dev';
  } else {
    return 'local';
  }
};

const API_URLS = {
  dev: 'https://wise-hitachi-soc-outer.trycloudflare.com',
  staging: 'https://bool-buf-audience-telecom.trycloudflare.com',
  local: 'http://localhost:8181'
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

// Detectar ambiente baseado na URL atual ou variável
const getCurrentEnvironment = (): 'dev' | 'staging' | 'local' => {
  const hostname = window.location.hostname;

  if (hostname.includes('syndication-thereafter-cement-junior')) {
    return 'staging';
  } else if (hostname.includes('casual-alarm-lbs-oral')) {
    return 'dev';
  } else {
    return 'local';
  }
};

const API_URLS = {
  dev: 'https://assign-humidity-districts-apollo.trycloudflare.com',
  staging: 'https://sonic-enforcement-alpine-hydrocodone.trycloudflare.com',
  local: 'https://fluxo-bi-api.sp1.br.saveincloud.net.br'
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

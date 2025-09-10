interface SimpleClient {
  id: number;
  name: string;
}

interface SimpleProduct {
  id: number;
  name: string;
}

export interface Revenue {
  id: number;
  description: string;
  amount: number;
  revenueDate: string; // A data virá como string no formato 'YYYY-MM-DD'
  client: SimpleClient;
  product: SimpleProduct;
}

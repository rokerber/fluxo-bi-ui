export interface Expense {
  id: number;
  description: string;
  amount: number;
  dueDate: string;      // Data de Vencimento
  paymentDate: string | null; // Data de Pagamento (pode ser nula)
  paid: boolean;        // Status (pago/não pago)
}

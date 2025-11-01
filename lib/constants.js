
export const initialInvoiceData = {
  id: "INV-" + Date.now(),
  clientName: "",
  clientEmail: "",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  taxRate: 0,
  subtotal: 0,
  taxAmount: 0,
  total: 0,
  notes: "",
  items: [
    {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ],
};

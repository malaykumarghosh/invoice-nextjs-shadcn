export const selectInvoice = (state) => state.invoice;
export const selectItems = (state) => state.invoice.items;
export const selectTotals = (state) => ({
  subtotal: state.invoice.subtotal,
  taxAmount: state.invoice.taxAmount,
  total: state.invoice.total,
});

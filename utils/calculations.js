
/**
 * Calculate subtotal, tax, and total for invoice items.
 * @param {Array} items - Array of { quantity, rate, amount }
 * @param {number} taxRate - Tax percentage (e.g. 18 for 18%)
 * @returns {{ subtotal: number, taxAmount: number, total: number }}
 */
export function calculateTotals(items, taxRate = 0) {
  const subtotal = items.reduce((acc, item) => {
    const quantity =
      typeof item.quantity === "string"
        ? Number(item.quantity) || 0
        : item.quantity || 0;
    const rate =
      typeof item.rate === "string" ? Number(item.rate) || 0 : item.rate || 0;
    return acc + quantity * rate;
  }, 0);

  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  return { subtotal, taxAmount, total };
}

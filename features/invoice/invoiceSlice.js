
import { createSlice } from "@reduxjs/toolkit";
import { initialInvoiceData } from "@/lib/constants";
import { calculateTotals } from "@/utils/calculations";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialInvoiceData,
  reducers: {
    updateInvoice: (state, action) => {
      const updates = action.payload;
      Object.assign(state, updates);

      if (updates.items || updates.taxRate !== undefined) {
        const { subtotal, taxAmount, total } = calculateTotals(
          updates.items || state.items,
          updates.taxRate !== undefined ? updates.taxRate : state.taxRate
        );
        state.subtotal = subtotal;
        state.taxAmount = taxAmount;
        state.total = total;
      }
    },

    addItem: (state) => {
      const newItem = {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      };
      state.items.push(newItem);
    },

    removeItem: (state, action) => {
      const index = action.payload;
      if (state.items.length > 1) {
        state.items.splice(index, 1);
      }
    },

    updateItem: (state, action) => {
      const { index, field, value } = action.payload;
      const item = state.items[index];
      if (!item) return;

      item[field] = value;

      if (field === "quantity" || field === "rate") {
        const quantity =
          typeof item.quantity === "string"
            ? item.quantity === ""
              ? 0
              : Number(item.quantity)
            : item.quantity;
        const rate =
          typeof item.rate === "string"
            ? item.rate === ""
              ? 0
              : Number(item.rate)
            : item.rate;
        item.amount = quantity * rate;
      }

      const { subtotal, taxAmount, total } = calculateTotals(
        state.items,
        state.taxRate
      );
      state.subtotal = subtotal;
      state.taxAmount = taxAmount;
      state.total = total;
    },
  },
});

export const { updateInvoice, addItem, removeItem, updateItem } = invoiceSlice.actions;
export default invoiceSlice.reducer;

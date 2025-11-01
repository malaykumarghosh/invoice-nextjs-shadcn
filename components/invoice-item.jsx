"use client";

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "@/features/invoice/invoiceSlice";

export default function InvoiceItem({ item, index, canRemove }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (value) => {
    // Allow empty string temporarily, but convert to number for calculations
    if (value === "") {
      dispatch(updateItem({ index, field: "quantity", value: "" }));
    } else {
      const numValue = Number.parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        dispatch(updateItem({ index, field: "quantity", value: numValue }));
      }
    }
  };

  const handleQuantityBlur = () => {
    // If empty on blur, set to 1
    if (item.quantity === "" || item.quantity === 0) {
      dispatch(updateItem({ index, field: "quantity", value: 1 }));
    }
  };

  const handleRateChange = (value) => {
    // Allow empty string temporarily, but convert to number for calculations
    if (value === "") {
      dispatch(updateItem({ index, field: "rate", value: "" }));
    } else {
      const numValue = Number.parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        dispatch(updateItem({ index, field: "rate", value: numValue }));
      }
    }
  };

  const handleRateBlur = () => {
    // If empty on blur, set to 0
    if (item.rate === "") {
      dispatch(updateItem({ index, field: "rate", value: 0 }));
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4 border rounded-lg">
      <div className="col-span-5">
        <Label>Description</Label>
        <Input
          placeholder="Item description"
          value={item.description}
          onChange={(e) =>
            dispatch(updateItem({ index, field: "description", value: e.target.value }))
          }
        />
      </div>
      <div className="col-span-2">
        <Label>Quantity</Label>
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          onBlur={handleQuantityBlur}
        />
      </div>
      <div className="col-span-2">
        <Label>Rate ($)</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={item.rate}
          onChange={(e) => handleRateChange(e.target.value)}
          onBlur={handleRateBlur}
        />
      </div>
      <div className="col-span-2">
        <Label>Amount</Label>
        <div className="h-10 px-3 py-2 bg-gray-50 border rounded-md flex items-center">
          ${typeof item.amount === "number" ? item.amount.toFixed(2) : "0.00"}
        </div>
      </div>
      <div className="col-span-1 flex items-end">
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(removeItem(index))}
          disabled={!canRemove}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
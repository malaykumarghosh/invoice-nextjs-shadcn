"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { useSelector, useDispatch } from "react-redux";
import { updateInvoice } from "@/features/invoice/invoiceSlice";
import { selectInvoice } from "@/features/invoice/selectors";

export default function BasicDetails() {

  const invoice = useSelector(selectInvoice);
  const dispatch = useDispatch();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            value={invoice.invoiceNumber || ""}
            onChange={(e) => dispatch(updateInvoice({ invoiceNumber: e.target.value }))}
            id="invoiceNumber"
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            onChange={(e) => dispatch(updateInvoice({ date: e.target.value }))}
            value={invoice.date || ""}
          />
        </div>
      </CardContent>
    </Card>
  );
}
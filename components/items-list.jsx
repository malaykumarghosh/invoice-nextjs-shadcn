"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import InvoiceItem from "./invoice-item";

import { useSelector, useDispatch } from "react-redux";
import { addItem } from "@/features/invoice/invoiceSlice";
import { selectInvoice } from "@/features/invoice/selectors";

export default function ItemsList() {

  const invoice = useSelector(selectInvoice);
  const dispatch = useDispatch();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Invoice Items</CardTitle>
        <Button onClick={(e) => dispatch(addItem())} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {invoice.items.map((item, index) => (
          <InvoiceItem
            key={item.id}
            item={item}
            index={index}
            canRemove={invoice.items.length > 1}
          />
        ))}
      </CardContent>
    </Card>
  );
}

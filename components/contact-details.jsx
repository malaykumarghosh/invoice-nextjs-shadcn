"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useSelector, useDispatch } from "react-redux";
import { updateInvoice } from "@/features/invoice/invoiceSlice";
import { selectInvoice } from "@/features/invoice/selectors";

export default function ContactDetails() {
  
  const invoice = useSelector(selectInvoice);
  const dispatch = useDispatch();

  return (
    <Card>
      <CardHeader>
        <CardTitle>From & To</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-medium">From (Your Details)</h3>
          <div>
            <Label htmlFor="fromName">Name</Label>
            <Input
              id="fromName"
              value={invoice.fromName || ""}
              onChange={(e) => dispatch(updateInvoice({ fromName: e.target.value }))}
              placeholder="Your name or company"
            />
          </div>
          <div>
            <Label htmlFor="fromEmail">Email</Label>
            <Input
              id="fromEmail"
              value={invoice.fromEmail || ""}
              onChange={(e) => dispatch(updateInvoice({ fromEmail: e.target.value }))}
              placeholder="your@email.com"
              type="email"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">To (Client Details)</h3>
          <div>
            <Label htmlFor="toName">Name</Label>
            <Input
              id="toName"
              value={invoice.toName || ""}
              onChange={(e) => dispatch(updateInvoice({ toName: e.target.value }))}
              placeholder="Client name or company"
            />
          </div>
          <div>
            <Label htmlFor="toEmail">Email</Label>
            <Input
              value={invoice.toEmail || ""}
              onChange={(e) => dispatch(updateInvoice({ toEmail: e.target.value }))}
              id="toEmail"
              placeholder="client@email.com"
              type="email"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
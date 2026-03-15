import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Earnings" };

export default function EarningsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8">Earnings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <DollarSign className="h-6 w-6 text-nxted-green mb-2" />
            <p className="text-3xl font-heading font-bold">£0.00</p>
            <p className="text-sm text-nxted-muted">Total Earnings</p>
          </CardContent>
        </Card>
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <TrendingUp className="h-6 w-6 text-brand-primary mb-2" />
            <p className="text-3xl font-heading font-bold">£0.00</p>
            <p className="text-sm text-nxted-muted">This Month</p>
          </CardContent>
        </Card>
        <Card className="bg-nxted-card border-nxted-border">
          <CardContent className="pt-6">
            <CreditCard className="h-6 w-6 text-nxted-purple mb-2" />
            <p className="text-3xl font-heading font-bold">£0.00</p>
            <p className="text-sm text-nxted-muted">Pending Payout</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-nxted-card border-nxted-border">
        <CardHeader>
          <CardTitle>Revenue History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-nxted-muted text-center py-8">
            No revenue data yet. Earnings will appear here once learners purchase your courses.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

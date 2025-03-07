// financial-overview.tsx
"use client"

import MonthlyExpensesChart from "@/components/monthly-expenses-chart"
import CategoryPieChart from "@/components/category-pie-chart"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function FinancialOverview() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyExpensesChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryPieChart />
        </CardContent>
      </Card>
    </div>
  )
}

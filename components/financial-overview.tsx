"use client"

import MonthlyExpensesChart from "@/components/monthly-expenses-chart"
import CategoryPieChart from "@/components/category-pie-chart"

export default function FinancialOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Monthly Expenses</h2>
        <MonthlyExpensesChart />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Expense Categories</h2>
        <CategoryPieChart />
      </div>
    </div>
  )
}


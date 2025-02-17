"use client"

import useSWR from "swr"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface MonthlyExpense {
  month: string
  totalExpense: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function MonthlyExpensesChart() {
  const { data: monthlyExpenses, error } = useSWR<MonthlyExpense[]>("/api/monthly-expenses", fetcher)

  if (error) return <div className="text-red-500">Failed to load monthly expenses</div>
  if (!monthlyExpenses) return <div>Loading chart...</div>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyExpenses}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalExpense" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}


"use client"

import useSWR from "swr"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface CategoryExpense {
  category: string
  totalExpense: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#A4DE6C", "#D0ED57"]

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CategoryPieChart() {
  const { data: categoryExpenses, error } = useSWR<CategoryExpense[]>("/api/category-expenses", fetcher)

  if (error) return <div className="text-red-500">Failed to load category expenses</div>
  if (!categoryExpenses) return <div>Loading chart...</div>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categoryExpenses}
          dataKey="totalExpense"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {categoryExpenses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}


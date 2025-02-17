"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface BudgetActual {
  category: string
  budget: number
  actual: number
}

export default function BudgetVsActualChart() {
  const [budgetActualData, setBudgetActualData] = useState<BudgetActual[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBudgetActualData()
  }, [])

  const fetchBudgetActualData = async () => {
    try {
      const response = await fetch("/api/budget-vs-actual")
      if (!response.ok) {
        throw new Error("Failed to fetch budget vs actual data")
      }
      const data = await response.json()
      setBudgetActualData(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching budget vs actual data:", error)
      setError("Failed to load budget vs actual data. Please try again.")
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading chart...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={budgetActualData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" name="Budget" />
        <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
      </BarChart>
    </ResponsiveContainer>
  )
}


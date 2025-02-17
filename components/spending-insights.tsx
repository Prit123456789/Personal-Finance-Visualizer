"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Insight {
  type: string
  message: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function SpendingInsights() {
  const { data: insights, error } = useSWR<Insight[]>("/api/spending-insights", fetcher)

  if (error) return <div className="text-red-500">Failed to load spending insights</div>
  if (!insights) return <div>Loading insights...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{insight.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{insight.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


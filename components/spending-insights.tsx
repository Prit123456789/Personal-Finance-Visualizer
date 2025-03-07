// spending-insights.tsx
"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

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
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{insight.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{insight.message}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

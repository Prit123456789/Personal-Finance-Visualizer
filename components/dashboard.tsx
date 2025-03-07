// dashboard.tsx
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TransactionManager from "@/components/transaction-manager"
import BudgetManager from "@/components/budget-manager"
import FinancialOverview from "@/components/financial-overview"
import SpendingInsights from "@/components/spending-insights"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Here's a quick overview of your finances.</p>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <FinancialOverview />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionManager />
        </TabsContent>
        <TabsContent value="budgets">
          <BudgetManager />
        </TabsContent>
        <TabsContent value="insights">
          <SpendingInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}

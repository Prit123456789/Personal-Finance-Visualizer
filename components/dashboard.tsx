"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TransactionManager from "@/components/transaction-manager"
import BudgetManager from "@/components/budget-manager"
import FinancialOverview from "@/components/financial-overview"
import SpendingInsights from "@/components/spending-insights"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
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
  )
}


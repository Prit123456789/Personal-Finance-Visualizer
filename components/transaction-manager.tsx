"use client"

import { useState } from "react"
import TransactionForm from "@/components/transaction-form"
import TransactionList from "@/components/transaction-list"

export default function TransactionManager() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleTransactionAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <TransactionList key={refreshKey} />
    </div>
  )
}


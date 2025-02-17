import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await connectToDatabase()
    const db = client.db()

    const budgets = await db.collection("budgets").find().toArray()
    const actualExpenses = await db
      .collection("transactions")
      .aggregate([
        {
          $group: {
            _id: "$category",
            actual: { $sum: "$amount" },
          },
        },
      ])
      .toArray()

    const budgetVsActual = budgets.map((budget) => {
      const actual = actualExpenses.find((expense) => expense._id === budget.category)
      return {
        category: budget.category,
        budget: budget.amount,
        actual: actual ? actual.actual : 0,
      }
    })

    return NextResponse.json(budgetVsActual)
  } catch (error) {
    console.error("Error fetching budget vs actual data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


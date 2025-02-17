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

    const insights = []

    // Compare budget vs actual
    for (const budget of budgets) {
      const actual = actualExpenses.find((expense) => expense._id === budget.category)
      if (actual) {
        const difference = budget.amount - actual.actual
        if (difference < 0) {
          insights.push({
            type: "Budget Alert",
            message: `You've exceeded your ${budget.category} budget by $${Math.abs(difference).toFixed(2)}.`,
          })
        } else if (difference > 0) {
          insights.push({
            type: "Budget Success",
            message: `You're under budget for ${budget.category} by $${difference.toFixed(2)}.`,
          })
        }
      }
    }

    // Find top spending category
    const topSpending = actualExpenses.sort((a, b) => b.actual - a.actual)[0]
    insights.push({
      type: "Top Spending",
      message: `Your highest spending category is ${topSpending._id} with $${topSpending.actual.toFixed(2)}.`,
    })

    // Add more insights as needed

    return NextResponse.json(insights)
  } catch (error) {
    console.error("Error generating spending insights:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await connectToDatabase()
    const db = client.db()
    const result = await db
      .collection("transactions")
      .aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
            totalExpense: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            month: "$_id",
            totalExpense: 1,
          },
        },
      ])
      .toArray()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching monthly expenses:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


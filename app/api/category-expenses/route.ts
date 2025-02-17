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
            _id: "$category",
            totalExpense: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalExpense: 1,
          },
        },
      ])
      .toArray()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching category expenses:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


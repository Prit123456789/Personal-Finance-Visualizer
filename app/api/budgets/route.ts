import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await connectToDatabase()
    const db = client.db()
    const budgets = await db.collection("budgets").find().toArray()
    return NextResponse.json(budgets)
  } catch (error) {
    console.error("Error fetching budgets:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { category, amount } = await request.json()
    const client = await connectToDatabase()
    const db = client.db()
    const result = await db
      .collection("budgets")
      .updateOne({ category }, { $set: { amount: Number.parseFloat(amount) } }, { upsert: true })
    return NextResponse.json({ message: "Budget set successfully", id: result.upsertedId })
  } catch (error) {
    console.error("Error setting budget:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await connectToDatabase()
    const db = client.db()
    const transactions = await db.collection("transactions").find().sort({ date: -1 }).toArray()
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { amount, date, description, category } = await request.json()
    const client = await connectToDatabase()
    const db = client.db()
    const result = await db.collection("transactions").insertOne({
      amount: Number.parseFloat(amount),
      date: new Date(date),
      description,
      category,
    })
    return NextResponse.json({ message: "Transaction added successfully", id: result.insertedId })
  } catch (error) {
    console.error("Error adding transaction:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


import { NextResponse } from "next/server";
import { gigs, addGig } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(gigs);
}

export async function POST(request) {
  const body = await request.json();
  const newGig = {
    id: Date.now().toString(),
    ...body,
    skills: typeof body.skills === "string" ? body.skills.split(",").map(s => s.trim()) : body.skills,
    sellerName: "You",
    sellerRating: 5.0,
    createdAt: new Date().toISOString().split("T")[0],
    imageUrl: body.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
  };
  addGig(newGig);
  return NextResponse.json(newGig, { status: 201 });
}
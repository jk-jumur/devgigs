import { NextResponse } from "next/server";
import { gigs, removeGig } from "@/lib/mock-data";

export async function GET(_, { params }) {
  const gig = gigs.find((g) => g.id === params.id);
  if (!gig) return NextResponse.json({ error: "Gig not found" }, { status: 404 });
  return NextResponse.json(gig);
}

export async function DELETE(_, { params }) {
  removeGig(params.id);
  return NextResponse.json({ success: true });
}
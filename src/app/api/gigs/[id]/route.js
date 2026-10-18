import { NextResponse } from "next/server";
import { gigs, removeGig } from "@/lib/mock-data";

export async function GET(request, context) {
  // Next.js 15+ এ params কে await করতে হয়
  const params = await context.params;
  const gig = gigs.find((g) => g.id === params.id);
  
  if (!gig) {
    return NextResponse.json({ error: "Gig not found" }, { status: 404 });
  }
  return NextResponse.json(gig);
}

export async function DELETE(request, context) {
  const params = await context.params;
  removeGig(params.id);
  return NextResponse.json({ success: true });
}
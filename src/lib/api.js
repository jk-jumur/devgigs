export async function getGigs() {
  const res = await fetch("/api/gigs", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch gigs");
  return res.json();
}

export async function getGigById(id) {
  const res = await fetch(`/api/gigs/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gig not found");
  return res.json();
}

export async function createGig(data) {
  const res = await fetch("/api/gigs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create gig");
  return res.json();
}

export async function deleteGig(id) {
  const res = await fetch(`/api/gigs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete gig");
  return res.json();
}
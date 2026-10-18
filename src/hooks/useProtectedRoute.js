"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useProtectedRoute() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // যদি Firebase লোড হওয়া শেষ হয়ে যায় এবং ইউজার না থাকে
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  return { user, loading };
}
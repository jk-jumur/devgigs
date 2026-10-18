"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { createGig } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// ফর্ম ভ্যালিডেশনের জন্য Zod Schema
const gigSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  fullDescription: z.string().min(30, "Full description must be at least 30 characters"),
  category: z.enum(["Frontend", "Backend", "Fullstack", "Mobile", "DevOps"]),
  budget: z.coerce.number().min(100, "Budget must be at least 100"),
  deliveryDays: z.coerce.number().min(1, "Delivery must be at least 1 day"),
  skills: z.string().min(2, "Add at least one skill"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export default function AddGigPage() {
  const { user, loading } = useProtectedRoute();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(gigSchema),
    defaultValues: { category: "Frontend" },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await createGig(data);
      toast.success("Gig posted successfully!");
      reset();
      router.push("/items");
    } catch (err) {
      toast.error(err.message || "Failed to post gig");
    } finally {
      setSubmitting(false);
    }
  };

  // ইন্ডাস্ট্রি স্ট্যান্ডার্ড লোডিং স্ক্রিন (ফর্ম ফ্ল্যাশ করবে না)
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-brand" size={40} />
          <p className="text-slate-500 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-brand">Post a New Gig</h1>
          <p className="text-slate-500 mt-2">Fill out the details to publish your service.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          
          <Input label="Title" placeholder="e.g. React bug fix in 2 days" {...register("title")} error={errors.title?.message} />
          
          <Input label="Short Description" placeholder="One line summary" {...register("shortDescription")} error={errors.shortDescription?.message} />
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Description</label>
            <textarea
              rows={5}
              {...register("fullDescription")}
              placeholder="Describe your service in detail..."
              className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all ${
                errors.fullDescription ? "border-red-500" : "border-slate-200 focus:border-brand"
              }`}
            />
            {errors.fullDescription && <p className="text-sm text-red-600 mt-1">{errors.fullDescription.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <select {...register("category")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand font-medium text-slate-700">
              {["Frontend", "Backend", "Fullstack", "Mobile", "DevOps"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Budget (৳)" type="number" {...register("budget")} error={errors.budget?.message} />
            <Input label="Delivery Days" type="number" {...register("deliveryDays")} error={errors.deliveryDays?.message} />
          </div>

          <Input label="Skills (comma-separated)" placeholder="React, Next.js, Tailwind" {...register("skills")} error={errors.skills?.message} />
          
          <Input label="Image URL (optional)" placeholder="https://..." {...register("imageUrl")} error={errors.imageUrl?.message} />

          <div className="pt-4 border-t border-slate-100">
            <Button type="submit" variant="accent" className="w-full py-6 text-lg font-bold" disabled={submitting}>
              {submitting ? (
                <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={20} /> Posting...</span>
              ) : (
                "Publish Gig"
              )}
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
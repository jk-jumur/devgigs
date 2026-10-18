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
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
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

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F6] dark:bg-slate-950 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-accent" size={40} />
          <p className="text-slate-500 dark:text-slate-400 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 pb-24">
        
        {/* হেডার */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 mx-auto bg-brand dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand/20 dark:shadow-none">
            <Sparkles className="text-accent" size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand dark:text-white tracking-tight">Post a New Gig</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">Fill out the details to publish your service.</p>
        </motion.div>

        {/* ফর্ম কার্ড */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 space-y-6"
        >
          
          <Input 
            label="Gig Title" 
            placeholder="e.g. React bug fix in 2 days" 
            {...register("title")} 
            error={errors.title?.message} 
            className="dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:ring-accent" 
          />
          
          <Input 
            label="Short Description" 
            placeholder="One line summary of your service" 
            {...register("shortDescription")} 
            error={errors.shortDescription?.message} 
            className="dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:ring-accent" 
          />
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Description</label>
            <textarea
              rows={5}
              {...register("fullDescription")}
              placeholder="Describe your service in detail..."
              className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-accent transition-all ${
                errors.fullDescription ? "border-red-500" : "border-slate-200 dark:border-slate-700 focus:border-brand dark:focus:border-accent"
              }`}
            />
            {errors.fullDescription && <p className="text-sm text-red-500 mt-1">{errors.fullDescription.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Category</label>
              <select 
                {...register("category")} 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand dark:focus:border-accent font-medium text-slate-700 dark:text-white transition-colors"
              >
                {["Frontend", "Backend", "Fullstack", "Mobile", "DevOps"].map((c) => (
                  <option key={c} value={c} className="dark:bg-slate-900">{c}</option>
                ))}
              </select>
              {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
            </div>
            
            <Input 
              label="Budget (৳)" 
              type="number" 
              placeholder="e.g. 5000" 
              {...register("budget")} 
              error={errors.budget?.message} 
              className="dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:ring-accent" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Delivery Days" 
              type="number" 
              placeholder="e.g. 3" 
              {...register("deliveryDays")} 
              error={errors.deliveryDays?.message} 
              className="dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:ring-accent" 
            />
            
            <Input 
              label="Skills (comma-separated)" 
              placeholder="React, Next.js, Tailwind" 
              {...register("skills")} 
              error={errors.skills?.message} 
              className="dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:ring-accent" 
            />
          </div>
          
          <Input 
            label="Image URL (optional)" 
            placeholder="https://example.com/image.jpg" 
            {...register("imageUrl")} 
            error={errors.imageUrl?.message} 
            className="dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:ring-accent" 
          />

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <Button 
              type="submit" 
              variant="accent" 
              className="w-full py-6 text-lg font-bold rounded-xl shadow-lg shadow-accent/20 hover:-translate-y-0.5 transition-transform" 
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={20} /> Posting...
                </span>
              ) : (
                "Publish Gig"
              )}
            </Button>
          </div>
        </motion.form>
      </main>
      <Footer />
    </div>
  );
}
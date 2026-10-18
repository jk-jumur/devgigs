"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getGigs, deleteGig } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { toast } from "sonner";
import { Eye, Trash2, Loader2, AlertTriangle, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ManageGigsPage() {
  const { user, loading } = useProtectedRoute();
  const router = useRouter();
  const [gigs, setGigs] = useState([]);
  const [fetching, setFetching] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gigToDelete, setGigToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadGigs = () => {
    setFetching(true);
    getGigs()
      .then(setGigs)
      .catch((err) => toast.error("Failed to load gigs"))
      .finally(() => setFetching(false));
  };

  useEffect(() => {
    loadGigs();
  }, []);

  const openDeleteModal = (gig) => {
    setGigToDelete(gig);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!gigToDelete) return;
    setIsDeleting(true);
    try {
      await deleteGig(gigToDelete.id);
      setGigs((prev) => prev.filter((g) => g.id !== gigToDelete.id));
      toast.success("Gig deleted successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete gig");
    } finally {
      setIsDeleting(false);
      setGigToDelete(null);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F6] dark:bg-slate-950 transition-colors">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 relative transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand dark:text-white tracking-tight">Manage Gigs</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">View and manage your posted gigs.</p>
          </div>
          <Link href="/items/add">
            <Button variant="accent" className="font-bold shadow-lg shadow-accent/20">
              <PlusCircle size={18} className="mr-2" /> Post New Gig
            </Button>
          </Link>
        </motion.div>

        {fetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={40} />
          </div>
        ) : gigs.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-brand dark:text-white">No gigs found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8 text-lg">You haven't posted any gigs yet.</p>
            <Link href="/items/add">
              <Button variant="accent">Post your first gig</Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                    <th className="px-6 py-5 font-semibold uppercase tracking-wider">Title</th>
                    <th className="px-6 py-5 font-semibold uppercase tracking-wider">Category</th>
                    <th className="px-6 py-5 font-semibold uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-5 font-semibold uppercase tracking-wider">Date</th>
                    <th className="px-6 py-5 font-semibold uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {gigs.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-5 font-bold text-brand dark:text-white">{g.title}</td>
                      <td className="px-6 py-5"><Badge color="accent">{g.category}</Badge></td>
                      <td className="px-6 py-5 font-extrabold text-brand dark:text-white">৳{g.budget}</td>
                      <td className="px-6 py-5 text-slate-500 dark:text-slate-400 text-sm font-medium">{g.createdAt}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => router.push(`/items/${g.id}`)} className="p-2 text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition" title="View">
                            <Eye size={18} />
                          </button>
                          <button onClick={() => openDeleteModal(g)} className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
              {gigs.map((g) => (
                <div key={g.id} className="p-5">
                  <h3 className="font-bold text-brand dark:text-white mb-3 text-lg">{g.title}</h3>
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <Badge color="accent">{g.category}</Badge>
                    <span className="font-extrabold text-brand dark:text-white">৳{g.budget}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" onClick={() => router.push(`/items/${g.id}`)} className="flex-1 dark:text-white dark:border-slate-700">
                      <Eye size={14} className="mr-1.5" /> View
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => openDeleteModal(g)} className="flex-1">
                      <Trash2 size={14} className="mr-1.5" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
      
      <Footer />

      {/* Delete Modal (Dark Mode Supported) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md p-8 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-red-600 dark:text-red-500" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand dark:text-white">Delete Gig</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Are you sure you want to delete this gig?</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-8">
              <p className="text-sm text-slate-700 dark:text-slate-300 font-bold truncate">{gigToDelete?.title}</p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isDeleting} className="dark:text-white dark:border-slate-700">
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? (
                  <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Deleting...</span>
                ) : ("Delete Gig")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
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
import { Eye, Trash2, Loader2, AlertTriangle } from "lucide-react";

export default function ManageGigsPage() {
  const { user, loading } = useProtectedRoute();
  const router = useRouter();
  const [gigs, setGigs] = useState([]);
  const [fetching, setFetching] = useState(true);
  
  // মডাল স্টেট
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

  // মডাল ওপেন করার ফাংশন
  const openDeleteModal = (gig) => {
    setGigToDelete(gig);
    setIsModalOpen(true);
  };

  // আসল ডিলিট ফাংশন
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-brand tracking-tight">Manage Gigs</h1>
            <p className="text-slate-500 mt-1">View and manage your posted gigs.</p>
          </div>
          <Link href="/items/add">
            <Button variant="accent" className="font-bold">+ Post New Gig</Button>
          </Link>
        </div>

        {fetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand" size={32} />
          </div>
        ) : gigs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-brand">No gigs found</h3>
            <p className="text-slate-500 mt-2 mb-6">You haven't posted any gigs yet.</p>
            <Link href="/items/add">
              <Button>Post your first gig</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            
            {/* ডেস্কটপ ভিউ */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                    <th className="px-6 py-4 font-semibold">Title</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Budget</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gigs.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{g.title}</td>
                      <td className="px-6 py-4"><Badge color="brand">{g.category}</Badge></td>
                      <td className="px-6 py-4 font-bold text-brand">৳{g.budget}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{g.createdAt}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => router.push(`/items/${g.id}`)} className="p-2 text-slate-500 hover:text-brand hover:bg-slate-100 rounded-lg transition" title="View">
                            <Eye size={18} />
                          </button>
                          <button onClick={() => openDeleteModal(g)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* মোবাইল ভিউ */}
            <div className="md:hidden divide-y divide-slate-100">
              {gigs.map((g) => (
                <div key={g.id} className="p-4">
                  <h3 className="font-bold text-slate-900 mb-2">{g.title}</h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <Badge color="brand">{g.category}</Badge>
                    <span className="font-bold text-brand">৳{g.budget}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => router.push(`/items/${g.id}`)} className="flex-1">
                      <Eye size={14} className="mr-1" /> View
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => openDeleteModal(g)} className="flex-1">
                      <Trash2 size={14} className="mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />

      {/* ডিলিট কনফার্মেশন মডাল */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all">
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Gig</h3>
                <p className="text-sm text-slate-500">Are you sure you want to delete this gig?</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-6">
              <p className="text-sm text-slate-700 font-medium truncate">{gigToDelete?.title}</p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isDeleting}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} /> Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
import Link from "next/link";
import { Globe, MessageCircle, Users } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-indigo-600">DevGigs</h3>
            <p className="text-sm text-gray-600 mt-2">Where developers find and post tech gigs.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/items" className="hover:text-indigo-600">Browse Gigs</Link></li>
              <li><Link href="/items/add" className="hover:text-indigo-600">Post a Gig</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-indigo-600">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Follow</h4>
            <div className="flex gap-3">
              {/* এখানে নতুন আইকন বসানো হলো */}
              <a href="#" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition"><Globe size={18} /></a>
              <a href="#" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition"><MessageCircle size={18} /></a>
              <a href="#" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition"><Users size={18} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} DevGigs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
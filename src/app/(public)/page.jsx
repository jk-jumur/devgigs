import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { gigs } from "@/lib/mock-data";
import { Search, Shield, Zap, Star, ArrowRight } from "lucide-react";

export default function HomePage() {
  const featured = gigs.slice(0, 4);
  const categories = [
    { name: "Frontend", count: 42 },
    { name: "Backend", count: 38 },
    { name: "Fullstack", count: 25 },
    { name: "Mobile", count: 19 },
    { name: "DevOps", count: 12 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* SECTION 1: NAVBAR */}
      <Navbar />

      <main className="flex-1">
        {/* SECTION 2: HERO */}
        <section className="bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
            <Badge color="accent">🚀 Trusted by 10,000+ developers</Badge>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-brand leading-tight tracking-tight">
              Hire top developers. <br />
              <span className="text-accent">Or become one.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              DevGigs is the premium marketplace where developers post tech gigs and clients find the perfect match — fast, reliable, and transparent.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/items">
                <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold text-brand">
                  Browse Gigs <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/items/add">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Post a Gig
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-brand">Why DevGigs?</h2>
            <p className="text-slate-500 mt-2">Built for developers, by developers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "Smart Search", desc: "Find gigs by skill, budget, and delivery time." },
              { icon: Shield, title: "Verified Sellers", desc: "All sellers are rated and reviewed by clients." },
              { icon: Zap, title: "Fast Delivery", desc: "Most gigs delivered within 2-5 days." },
            ].map((f, i) => (
              <Card key={i} className="p-8 text-center hover:-translate-y-1 hover:border-brand transition-all duration-300">
                <div className="w-14 h-14 mx-auto bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
                  <f.icon className="text-accent" size={28} />
                </div>
                <h3 className="mt-5 font-bold text-lg text-brand">{f.title}</h3>
                <p className="mt-2 text-slate-500 text-sm">{f.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 4: CATEGORIES */}
        <section className="bg-white py-20 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-brand text-center mb-12">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((c) => (
                <Link key={c.name} href={`/items?category=${c.name}`}>
                  <Card className="p-6 text-center hover:border-accent hover:bg-slate-50 group transition-all duration-300">
                    <p className="font-bold text-brand group-hover:text-accent transition-colors">{c.name}</p>
                    <p className="text-sm text-slate-500 mt-1">{c.count} gigs</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: FEATURED GIGS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-extrabold text-brand">Featured Gigs</h2>
            <Link href="/items" className="text-brand font-bold hover:text-accent transition flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((g) => (
              <Card key={g.id} className="group overflow-hidden flex flex-col hover:border-brand transition-colors duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <Badge color="accent">{g.category}</Badge>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-brand group-hover:text-accent transition-colors line-clamp-2">{g.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{g.shortDescription}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <span className="text-brand font-extrabold text-lg">৳{g.budget}</span>
                    <span className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                      <Star size={14} className="text-accent fill-accent" /> {g.sellerRating}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 6: HOW IT WORKS + TESTIMONIALS */}
        <section className="bg-brand py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                { n: "1", t: "Post a Gig", d: "Describe your service, set a price, and publish." },
                { n: "2", t: "Get Hired", d: "Clients browse and contact you directly." },
                { n: "3", t: "Deliver & Earn", d: "Complete the work and get paid." },
              ].map((s) => (
                <div key={s.n} className="p-8 text-center bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-accent transition-colors">
                  <div className="w-14 h-14 mx-auto rounded-full bg-accent text-brand flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-accent/20 mb-5">
                    {s.n}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{s.t}</h3>
                  <p className="text-slate-400">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Rahim A.", text: "Got my first client in 2 days. Amazing platform!" },
                { name: "Sadia K.", text: "The UI is so clean. I love posting gigs here." },
                { name: "Tanvir H.", text: "Best place to find React gigs in Bangladesh." },
              ].map((t, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <div className="flex text-accent mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-accent" />)}
                  </div>
                  <p className="text-slate-300 italic mb-6">&ldquo;{t.text}&rdquo;</p>
                  <p className="font-bold text-sm text-white">— {t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand tracking-tight">Ready to start earning?</h2>
          <p className="mt-4 text-lg text-slate-600 font-medium">Join thousands of developers already on DevGigs.</p>
          <Link href="/login?mode=register" className="inline-block mt-10">
            <Button variant="accent" size="lg" className="font-bold text-brand px-10">
              Get Started Free
            </Button>
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { Terminal, Target, Users, Zap } from "lucide-react";

export const metadata = {
  title: "About — DevGigs",
  description: "Learn more about DevGigs, the ultimate marketplace for developers.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* হিরো সেকশন */}
        <section className="bg-brand py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <Terminal className="mx-auto text-accent mb-6" size={48} />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Building the future of <br />
              <span className="text-accent">freelance development.</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              DevGigs is a developer-first marketplace designed to connect elite talent with clients who demand high-quality work. We remove the friction from freelancing.
            </p>
          </div>
        </section>

        {/* মিশন ও ভ্যালু সেকশন */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Target, 
                title: "Our Mission", 
                desc: "To empower developers worldwide by providing a seamless, transparent, and secure platform to monetize their skills." 
              },
              { 
                icon: Users, 
                title: "Community First", 
                desc: "We believe in the power of the developer community. DevGigs is built by developers, for developers." 
              },
              { 
                icon: Zap, 
                title: "Speed & Quality", 
                desc: "Connecting top-tier talent with exciting projects in record time, without compromising on the quality of work." 
              },
            ].map((feature, i) => (
              <Card key={i} className="p-8 text-center hover:-translate-y-1 hover:border-brand transition-all duration-300">
                <div className="w-14 h-14 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-5">
                  <feature.icon className="text-brand" size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* স্টোরি সেকশন */}
        <section className="bg-white py-20 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-brand">Why we built DevGigs</h2>
              <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="prose prose-slate prose-lg max-w-none text-slate-600">
              <p>
                Finding reliable tech gigs has always been a fragmented experience. Talent is scattered across social media, WhatsApp groups, and outdated job boards. As developers ourselves, we felt the pain of navigating this chaotic landscape.
              </p>
              <p>
                We built <strong>DevGigs</strong> to solve this. We envisioned a platform that not only looks premium but functions effortlessly. Whether you are a frontend specialist, a backend engineer, or a fullstack wizard, DevGigs gives you the tools to showcase your expertise and get hired instantly.
              </p>
              <p>
                This project was designed with a focus on <strong>performance, security, and a world-class user experience</strong>, powered by Next.js App Router and Firebase.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
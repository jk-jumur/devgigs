"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import { 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Clock, 
  Award, 
  CreditCard 
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Counter({ from, to, duration = 2 }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        onUpdate: (value) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, duration]);

  return <span ref={nodeRef} />;
}

export default function Hero() {
  const appFeatures = [
    { label: "100% Secure Payment", icon: ShieldCheck },
    { label: "Verified Sellers", icon: CheckCircle2 },
    { label: "Fast Delivery", icon: Zap },
    { label: "Top Rated Talent", icon: Star },
    { label: "Escrow Protection", icon: Lock },
    { label: "24/7 Support", icon: Clock },
    { label: "Industry Experts", icon: Award },
    { label: "Seamless Checkout", icon: CreditCard },
  ];

  const sliderImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <>
      <section className="bg-[#F9F9F6] dark:bg-slate-950 relative overflow-hidden pt-12 pb-16 md:pt-28 md:pb-24 transition-colors duration-300">
        
  
        <div className="absolute inset-0 lg:hidden z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image 
                src={sliderImages[currentImage]} 
                alt="Background" 
                fill 
                className="object-cover" 
                priority
              />
            </motion.div>
          </AnimatePresence>
        
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90 z-10"></div>
        </div>

        
        <div className="hidden lg:block absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* text content*/}
            <motion.div 
              initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              className="text-center lg:text-left order-1 lg:order-1"
            >
              <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 shadow-lg backdrop-blur-md lg:bg-white/80 lg:border-slate-200 dark:lg:bg-slate-900/80 dark:lg:border-slate-800">
                  <Star className="text-accent fill-accent w-4 h-4" />
                  <span className="text-sm font-semibold text-white lg:text-slate-700 dark:lg:text-slate-300">Trusted by 10,000+ developers</span>
                </div>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white lg:text-brand dark:lg:text-white leading-[1.1] tracking-tight drop-shadow-lg lg:drop-shadow-none">
                Hire top developers. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-300 lg:from-accent lg:to-amber-600 dark:lg:from-accent dark:lg:to-amber-300">
                  Or become one.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="mt-6 text-lg text-slate-200 lg:text-slate-600 dark:lg:text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-md lg:drop-shadow-none">
                DevGigs is the premium marketplace where developers post tech gigs and clients find the perfect match — fast, reliable, and transparent.
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
                <Link href="/items" className="w-full sm:w-auto">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold text-brand shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all hover:-translate-y-0.5">
                    Browse Gigs <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/items/add" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold border-white/30 text-white hover:bg-white/10 lg:border-slate-200 lg:text-brand lg:hover:bg-slate-50 dark:lg:border-slate-800 dark:lg:text-white">
                    Post a Gig
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 lg:border-slate-200 dark:lg:border-slate-800 pt-6">
                <div>
                  <span className="text-2xl font-extrabold text-white lg:text-brand dark:lg:text-white block">
                    <Counter from={0} to={5000} />+
                  </span>
                  <span className="text-xs text-slate-300 lg:text-slate-500 dark:lg:text-slate-400 font-medium">Gigs Posted</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-white lg:text-brand dark:lg:text-white block">
                    <Counter from={0} to={10} />k+
                  </span>
                  <span className="text-xs text-slate-300 lg:text-slate-500 dark:lg:text-slate-400 font-medium">Developers</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-white lg:text-brand dark:lg:text-white block">
                    <Counter from={0} to={4.9} />/5
                  </span>
                  <span className="text-xs text-slate-300 lg:text-slate-500 dark:lg:text-slate-400 font-medium">Rating</span>
                </div>
              </motion.div>
            </motion.div>

            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="hidden lg:block relative h-64 sm:h-80 lg:h-[500px] w-full order-2 lg:order-2"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-blue-500/20 dark:from-accent/10 dark:to-blue-500/10 blur-2xl rounded-full"></div>
              
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={sliderImages[currentImage]} 
                      alt="Developers collaborating"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-brand/40 to-transparent z-10"></div>

                <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                  {sliderImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentImage === index 
                          ? "bg-accent w-6" 
                          : "bg-white/50 w-2 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="text-green-600 dark:text-green-400 w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand dark:text-white">Verified Sellers</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">100% Secure Payment</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-8 relative overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Why Developers & Clients Love Us
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10"></div>
          
          <Marquee items={appFeatures} speed={25} />
        </div>
      </section>
    </>
  );
}
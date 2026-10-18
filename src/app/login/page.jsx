"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { toast } from "sonner";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Terminal, ArrowLeft, User, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const params = useSearchParams();
  const [isRegister, setIsRegister] = useState(false);
  
  useEffect(() => {
    // URL-এ mode=register থাকলে স্টেট true হবে
    if (params.get("mode") === "register") {
      setIsRegister(true);
    }
  }, [params]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await register(email, password, name);
        toast.success("Account created successfully!");
      } else {
        await login(email, password);
        toast.success("Logged in successfully!");
      }
      router.push("/");
    } catch (err) {
      toast.error(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      router.push("/");
    } catch (err) {
      toast.error(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* বাম দিকের ডার্ক ব্র্যান্ডিং প্যানেল */}
      <div className="hidden lg:flex w-1/2 bg-brand p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Terminal className="text-accent" size={28} /> DevGigs
          </Link>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-extrabold leading-tight mb-6">
            Where elite developers <br />
            <span className="text-accent">build their legacy.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            The only marketplace you need to find high-quality tech gigs or hire the best talent in the industry.
          </p>
        </div>

        <div className="relative z-10 text-sm text-slate-500 font-mono">
          © {new Date().getFullYear()} DevGigs Inc. All rights reserved.
        </div>

        {/* ডেকোরেটিভ গ্রিড ব্যাকগ্রাউন্ড */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
      </div>

      {/* ডান দিকের ফর্ম প্যানেল */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-white">
        <Link href="/" className="absolute top-8 left-8 text-slate-500 hover:text-brand flex items-center gap-2 font-medium transition">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-brand tracking-tight">
              {isRegister ? "Create an account" : "Sign in to DevGigs"}
            </h1>
            <p className="text-slate-500 mt-2">
              {isRegister ? "Join the network of top developers." : "Welcome back! Please enter your details."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegister && (
              <div className="relative">
                <Input
                  label="Full Name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-white pl-10"
                />
                <User className="absolute left-3 top-[38px] text-slate-400" size={18} />
              </div>
            )}

            <div className="relative">
              <Input
                label="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-white pl-10"
              />
              <Mail className="absolute left-3 top-[38px] text-slate-400" size={18} />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white pl-10"
              />
              <Lock className="absolute left-3 top-[38px] text-slate-400" size={18} />
            </div>
            
            <Button variant="accent" type="submit" className="w-full py-6 text-lg mt-2 font-bold" disabled={loading}>
              {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-slate-400 font-medium">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 rounded-xl py-3 hover:bg-slate-50 hover:border-slate-300 transition-all font-semibold text-slate-700"
          >
            <FcGoogle size={24} /> Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-600">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsRegister((r) => !r)}
              className="text-brand font-bold hover:text-accent transition"
            >
              {isRegister ? "Log in" : "Sign up for free"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
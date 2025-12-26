"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/Authcontextapi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VendorLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = 'none';
    return () => { if (footer) footer.style.display = ''; };
  }, []);

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: async () => {
      await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      alert("Vendor Login successful!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || "Vendor Login failed");
    },
  });

  const handleLogin = () => {
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/ladakh-hero.jpeg')" }}>
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20"></div>
      
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg flex w-full max-w-5xl overflow-hidden relative z-10 mt-[1in]">
        <div
          className="relative w-1/2 hidden md:flex flex-col justify-center items-center"
          style={{
            backgroundImage: "url('/ladakh-bridge2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-l-xl"></div>
          <div className="relative z-10 p-10 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Julley Ladakh!</h2>
            <p className="text-lg">Travel is the only purchase that enriches you in ways beyond material wealth</p>
          </div>
        </div>
        {/* Right Side - Vendor Login Form */}
        <div className="flex-1 p-12 flex flex-col justify-center relative">
          <div className="mb-8 text-center">
            <div className="text-3xl font-bold text-blue-900 mb-2">Vendor Login</div>
            <div className="text-5xl font-bold text-blue-900">Welcome</div>
          </div>
          <p className="mb-8 text-gray-600 text-lg">Login with Email</p>
          <form className="space-y-6">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email id</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg px-3">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                <input
                  type="email"
                  placeholder="Email id"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-10 outline-none bg-transparent text-base"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg px-3">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M17 11V7a5 5 0 00-10 0v4" />
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-10 outline-none bg-transparent text-base"
                />
              </div>
            </div>
            <div className="flex justify-end items-center mb-6">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Forgot password?</a>
            </div>
            <button 
              type="button"
              onClick={handleLogin}
              className="w-full h-12 bg-blue-900 text-white text-lg font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg cursor-pointer"
            >
              LOGIN
            </button>
            <p className="text-center text-base mt-6">
              Don't have an account? <Link href="/auth/register" className="font-semibold hover:underline cursor-pointer" style={{ color: '#FF9900' }}>Register Now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}



"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useAuth } from "@/lib/Authcontextapi";

// Define the API error type
type ApiError = {
  status?: number;
  data?: {
    message?: string;
  };
  error?: {
    message?: string;
  };
  message?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    businessName: "",
    address: ""
  });
  const [selectedAccountType, setSelectedAccountType] = useState("Tourist");

  // Hide footer on register page
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";
    return () => {
      if (footer) footer.style.display = "";
    };
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.name) {
      setIsLoading(false);
      return showPopup("Please enter your name.", "error");
    }
    
    if (!formData.email) {
      setIsLoading(false);
      return showPopup("Please enter your email.", "error");
    }
    
    if (!formData.password) {
      setIsLoading(false);
      return showPopup("Please enter a password.", "error");
    }

    if (selectedAccountType === "Vendor" && (!formData.businessName || !formData.address)) {
      setIsLoading(false);
      return showPopup("Business name and address are required for vendors.", "error");
    }

    try {
      const response = await register(
        formData.name,
        formData.email,
        formData.password,
        selectedAccountType,
        selectedAccountType === "Vendor" ? {
          businessName: formData.businessName,
          contactNumber: formData.contactNumber,
          address: formData.address
        } : undefined
      );
      
      showPopup("Registration successful! Redirecting to login...", "success");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push(`/login/${selectedAccountType.toLowerCase()}`);
      }, 2000);
    } catch (error: unknown) {
      console.error('Registration error:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.data?.message || 
                         apiError?.error?.message || 
                         apiError?.message || 
                         'Registration failed. Please try again.';
      showPopup(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showPopup = (message: string, type: string) => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
  };

  // Render the registration form
  const renderForm = () => {
    return (
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-10 outline-none border-2 border-gray-300 rounded-lg px-3"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-10 outline-none border-2 border-gray-300 rounded-lg px-3"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full h-10 outline-none border-2 border-gray-300 rounded-lg px-3"
          />
        </div>

        {/* Vendor Fields */}
        {selectedAccountType === "Vendor" && (
          <>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                placeholder="My Travel Co."
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="w-full h-10 outline-none border-2 border-gray-300 rounded-lg px-3"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="9999999999"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="w-full h-10 outline-none border-2 border-gray-300 rounded-lg px-3"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                placeholder="Street, City, State"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full h-10 outline-none border-2 border-gray-300 rounded-lg px-3"
              />
            </div>
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {/* Continue with Google */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            try {
              if (typeof window !== "undefined") {
                // Use cookie so the server can access the role during the OAuth callback
                document.cookie = `signup_role=${selectedAccountType}; path=/; max-age=300; SameSite=Lax`;
              }
            } catch {}

            signIn("google", { callbackUrl: "/auth/google/callback" });
          }}
          className="w-full h-10 border-2 border-gray-300 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.22 9.18 3.6l6.84-6.84C35.84 2.44 30.28 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.95 6.18C12.42 13.38 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.68-.15-3.29-.43-4.84H24v9.16h12.68c-.55 2.96-2.2 5.47-4.67 7.16l7.16 5.56C43.53 37.5 46.5 31.5 46.5 24.5z" />
            <path fill="#FBBC05" d="M10.51 28.9A14.96 14.96 0 0 1 9.5 24c0-1.7.29-3.35.81-4.9l-7.95-6.18A23.94 23.94 0 0 0 0 24c0 3.87.92 7.53 2.56 10.78l7.95-5.88z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.9-5.82l-7.16-5.56c-2 1.35-4.56 2.14-8.74 2.14-6.26 0-11.58-3.88-13.49-9.36l-7.95 5.88C6.51 42.62 14.62 48 24 48z" />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-base mt-4">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:underline text-blue-700 cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/ladakh-hero.jpeg')" }}>
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20"></div>

      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg flex w-full max-w-5xl overflow-hidden relative z-10 mt-[1in]">
        {/* Left Side */}
        <div
          className="relative w-1/2 hidden md:flex flex-col justify-center items-center"
          style={{
            backgroundImage: "url('/ladakh-bridge2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white px-8">
            <h2 className="text-4xl font-bold mb-4">Julley Ladakh!</h2>
            <p className="text-lg">
              Travel is the only purchase that enriches you in ways beyond material wealth
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col justify-between px-8 py-8">
          <div>
            <div className="mb-4 text-left">
              <h2 className="text-3xl font-bold text-blue-900 mb-1">Create Your Account</h2>
              <p className="text-gray-600 text-sm mb-4">Please choose your account type</p>

              {/* Account Type Buttons */}
              <div className="flex gap-2 mb-6">
                {["Tourist", "Vendor", "Government"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedAccountType(type)}
                    className={`px-4 py-2 rounded font-semibold border-2 text-sm transition-all cursor-pointer
                      ${
                        selectedAccountType === type
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Government Block */}
            {selectedAccountType === "Government" ? (
              <div className="space-y-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg p-4">
                <p className="text-yellow-800 text-sm font-semibold">
                  Government registration is coming soon.
                </p>
                <p className="text-yellow-700 text-sm">Please choose another account type for now.</p>
              </div>
            ) : (
              renderForm()
            )}
          </div>
        </div>
      </div>

      {/* Popup message */}
      {popup.show && (
        <div
          style={{
            position: "fixed",
            top: 30,
            left: "50%",
            transform: "translateX(-50%)",
            background: popup.type === "success" ? "#4ade80" : "#f87171",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "8px",
            zIndex: 1000,
            fontWeight: "bold",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
          }}
        >
          {popup.message}
        </div>
      )}
    </div>
  );
}

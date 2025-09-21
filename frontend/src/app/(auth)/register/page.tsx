"use client";

import { useRegisterUserMutation } from "@/lib/rtkApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [registerApi] = useRegisterUserMutation();

  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      return showPopup("All fields are required.", "error");
    }

    const gmailRegex = /^[^@\s]+@gmail\.com$/;
    if (!gmailRegex.test(formData.email)) {
      return showPopup("Please enter a valid Gmail address (ending with @gmail.com).", "error");
    }

    if (selectedAccountType === "Vendor") {
      const phoneRegex = /^\d{10}$/;
      if (!formData.phone || !phoneRegex.test(formData.phone)) {
        return showPopup("Please enter a valid 10-digit contact number.", "error");
      }
      if (!formData.businessName || !formData.address) {
        return showPopup("Business name and address are required for Vendor.", "error");
      }
    }

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedAccountType
      };

      if (selectedAccountType === "Vendor") {
        payload.businessName = formData.businessName;
        payload.contactNumber = formData.phone;
        payload.address = formData.address;
      }

      await registerApi(payload).unwrap();
      showPopup("Registration successful!", "success");

      // Redirect to role-specific login page after 2s
      setTimeout(() => {
        const rolePath = selectedAccountType.toLowerCase();
        router.push(`/login/${rolePath}`);
      }, 2000);
    } catch (err: any) {
  console.error("Register error:", err);
  setPopup({
    show: true,
    message: err?.data?.message || err?.error || "Registration failed. Try again.",
    type: "error",
  });
  setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
  }
  };

  const showPopup = (message: string, type: string) => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/ladakh-hero.jpeg')" }}
    >
      {/* Blurred background overlay */}
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
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name */}
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
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full h-11 bg-blue-900 text-white text-base font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-md mt-2 cursor-pointer"
                >
                  SIGN UP
                </button>

                <p className="text-center text-base mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold hover:underline text-blue-700 cursor-pointer">
                    Login
                  </Link>
                </p>
              </form>
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

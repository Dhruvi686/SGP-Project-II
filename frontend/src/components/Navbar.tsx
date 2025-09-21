"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { UserCircleIcon, XMarkIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, MapPinIcon, StarIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { data: session } = useSession();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Ladakh Tourism
          </Link>
          <div className="space-x-4 flex items-center">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/tours">Tours</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/plan-trip">Plan Trip</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/bookings">My Bookings</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/permits">Permits</Link>
            </Button>
            {session ? (
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-2"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                    <span className="hidden md:inline">{session.user?.name || 'Profile'}</span>
                    <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50 py-2">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserCircleIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {session?.user?.name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session?.user?.email || 'user@example.com'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="py-1">
                        <Link
                          href="/guides"
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <MapPinIcon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-900">Guides</span>
                        </Link>
                        <Link
                          href="/culture"
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <StarIcon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-900">Culture</span>
                        </Link>
                        <Link
                          href="/hotels"
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <UserCircleIcon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-900">Hotel Recommendation</span>
                        </Link>
                        <Link
                          href="/transport"
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-900">Transport</span>
                        </Link>
                        <Link
                          href="/blog"
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <Cog6ToothIcon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-900">Blog</span>
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <UserCircleIcon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-900">Edit Profile</span>
                        </Link>

                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-200 pt-1">
                        <button
                          onClick={() => {
                            signOut();
                            setShowUserDropdown(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors w-full text-left text-red-600"
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div
                  className="relative inline-block"
                  onMouseEnter={() => setShowLoginDropdown(true)}
                  onMouseLeave={() => setShowLoginDropdown(false)}
                >
                  <Button variant="ghost">Login</Button>
                  {showLoginDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                      <Link
                        href="/login/tourist"
                        className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
                      >
                        Tourist Login
                      </Link>
                      <Link
                        href="/login/vendor"
                        className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
                      >
                        Vendor Login
                      </Link>
                    </div>
                  )}
                </div>
                <Button variant="default" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
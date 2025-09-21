import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#0b1220] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Ladakh Tourism */}
          <div>
            <h3 className="text-xl font-bold">Ladakh Tourism</h3>
            <p className="text-sm text-blue-200 mt-1">Government of Ladakh</p>
            <p className="text-sm text-blue-300 mt-4 leading-relaxed">
              Official tourism portal promoting sustainable travel and supporting
              local communities in Ladakh.
            </p>
            <div className="flex items-center gap-4 text-blue-300 mt-4">
              <a href="#" aria-label="Facebook" className="hover:text-orange-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.02 3.676 9.163 8.438 9.877v-6.987H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.02 22 12z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-orange-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.91 3.99 2.94A8.6 8.6 0 0 1 2 19.54c-.65 0-1.29-.04-1.92-.11A12.13 12.13 0 0 0 6.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-orange-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 3A2.75 2.75 0 0 0 5 7.75v8.5A2.75 2.75 0 0 0 7.75 19h8.5A2.75 2.75 0 0 0 19 16.25v-8.5A2.75 2.75 0 0 0 16.25 5h-8.5zm4.25 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-orange-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 6 12 6 12 6s-6.2 0-7.86.06a2.75 2.75 0 0 0-1.94 1.94C2 9.7 2 12 2 12s0 2.3.06 3.999a2.75 2.75 0 0 0 1.94 1.94C5.8 18 12 18 12 18s6.2 0 7.86-.06a2.75 2.75 0 0 0 1.94-1.94C22 14.3 22 12 22 12s0-2.3-.06-3.999zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-blue-300">
              <li><a href="#" className="hover:text-orange-400">Accommodations</a></li>
              <li><a href="#" className="hover:text-orange-400">Transport</a></li>
              <li><a href="#" className="hover:text-orange-400">Permits</a></li>
              <li><a href="#" className="hover:text-orange-400">Emergency</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-blue-300">
              <li><a href="#" className="hover:text-orange-400">Hotel Booking</a></li>
              <li><a href="#" className="hover:text-orange-400">Guide Services</a></li>
              <li><a href="#" className="hover:text-orange-400">Event Calendar</a></li>
              <li><a href="#" className="hover:text-orange-400">Handicrafts</a></li>
            </ul>
          </div>

          {/* Government */}
          <div>
            <h4 className="text-lg font-semibold">Government</h4>
            <ul className="mt-4 space-y-2 text-blue-300">
              <li><a href="#" className="hover:text-orange-400">Tourism policy</a></li>
              <li><a href="#" className="hover:text-orange-400">Regulations</a></li>
              <li><a href="#" className="hover:text-orange-400">Sustainability</a></li>
              <li><a href="#" className="hover:text-orange-400">Local Business</a></li>
            </ul>
          </div>
        </div>

        {/* Divider and contact row */}
        <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v2"/></svg>
            <div>
              <div className="font-semibold">Emergency Helpline</div>
              <div className="text-blue-300">+91-1982-252-271</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>
            <div>
              <div className="font-semibold">Tourism Office</div>
              <div className="text-blue-300">tourism@ladakh.gov.in</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10z"/><circle cx="12" cy="11" r="2.5"/></svg>
            <div>
              <div className="font-semibold">Office address</div>
              <div className="text-blue-300">Leh Ladakh - 194101</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0a2a4a] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="text-blue-200">2024 Government of Ladakh. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-blue-200 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-blue-200 hover:text-white">Terms of Service</a>
            <a href="#" className="text-blue-200 hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

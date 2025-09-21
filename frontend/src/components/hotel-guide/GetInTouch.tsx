import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function GetInTouch() {
    return (
        <section className="bg-white py-12 px-4 md:px-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get In Touch</h2>
            <p className="text-gray-600 mb-10">
                We're here to help you find the perfect hotel for your Ladakh stay.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div className="border rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                    <div className="bg-[#0B2A4A] p-3 rounded-full mb-4">
                        <Phone className="text-white w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Hotel Helpline</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Talk to our stay advisors <br />
                        <strong>+91 9876 543 210</strong> <br />
                        Available 9 AM – 9 PM IST
                    </p>
                    <button className="bg-[#0B2A4A] text-white px-4 py-2 rounded hover:bg-[#0a2340] text-sm">
                        Call Now
                    </button>
                </div>
                <div className="border rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                    <div className="bg-[#0B2A4A] p-3 rounded-full mb-4">
                        <Mail className="text-white w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Quick response guaranteed <br />
                        <strong>hotels@ladakhtrack.com</strong> <br />
                        Response within 2 hours
                    </p>
                    <button className="bg-[#0B2A4A] text-white px-4 py-2 rounded hover:bg-[#0a2340] text-sm">
                        Send Email
                    </button>
                </div>
                <div className="border rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                    <div className="bg-[#0B2A4A] p-3 rounded-full mb-4">
                        <MessageCircle className="text-white w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Instant messaging support <br />
                        Real-time help with hotel bookings <br />
                        Available 9 AM – 9 PM IST
                    </p>
                    <button className="bg-[#0B2A4A] text-white px-4 py-2 rounded hover:bg-[#0a2340] text-sm">
                        Start Chat
                    </button>
                </div>
            </div>
        </section>
    );
}

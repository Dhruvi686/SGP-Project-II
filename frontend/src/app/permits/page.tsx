"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function PermitsPage() {
  const [activeTab, setActiveTab] = useState('permit-types');
  const [currentView, setCurrentView] = useState('main'); // 'main', 'application', 'confirmation'
  const [selectedPermit, setSelectedPermit] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    returnDate: '',
    itinerary: '',
    idProof: null as File | null,
    passportPhoto: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const permitTypes = [
    {
      id: 1,
      title: "Inner Line Permit (ILP)",
      description: "Required for visiting protected/restricted areas in Ladakh",
      processingTime: "24-48 hours",
      validity: "7 days (extendable)",
      fee: "₹400 per person",
      documents: [
        "Valid ID Proof",
        "Passport Size Photograph",
        "Travel Itinerary"
      ]
    },
    {
      id: 2,
      title: "Protected Area Permit (PAP)",
      description: "Required for foreign nationals visiting restricted areas",
      processingTime: "3-5 working days",
      validity: "7 Days",
      fee: "₹700 per person",
      documents: [
        "Valid Passport",
        "Visa Copy",
        "Passport Size Photograph",
        "Travel Itinerary"
      ]
    },
    {
      id: 3,
      title: "Wildlife Sanctuary Permit",
      description: "Required for visiting wildlife Sanctuaries and national parks",
      processingTime: "24 hours",
      validity: "1-3 days",
      fee: "₹250 per person",
      documents: [
        "Valid ID Proof",
        "Travel Itinerary"
      ]
    },
    {
      id: 4,
      title: "Trekking Permit",
      description: "Required for trekking in designated areas",
      processingTime: "24-48 hours",
      validity: "Duration of trek",
      fee: "₹300 per person",
      documents: [
        "Valid ID Proof",
        "Medical Certificate",
        "Travel Itinerary"
      ]
    }
  ];

  const handleApplyPermit = (permit: any) => {
    setSelectedPermit(permit);
    setCurrentView('application');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      travelDate: '',
      returnDate: '',
      itinerary: '',
      idProof: null,
      passportPhoto: null
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate application ID
    const newApplicationId = `${selectedPermit?.title.split(' ')[0]}-${Math.floor(Math.random() * 90000) + 10000}`;
    setApplicationId(newApplicationId);
    
    // Switch to confirmation view
    setCurrentView('confirmation');
    setIsSubmitting(false);
  };

  const handleDownloadPDF = () => {
    const element = document.createElement('a');
    const file = new Blob(['PDF content would be here'], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedPermit?.title}-Application-${applicationId}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReturnToMain = () => {
    setCurrentView('main');
    setSelectedPermit(null);
    setApplicationId('');
  };

  const handleApplyAnother = () => {
    setCurrentView('application');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      travelDate: '',
      returnDate: '',
      itinerary: '',
      idProof: null,
      passportPhoto: null
    });
  };

  const faqs = [
    {
      question: "How long does it take to get a permit?",
      answer: "Processing times vary by permit type. Inner Line Permits typically takes 24-48 hours, while Protected Area Permits may take 3-5 days."
    },
    {
      question: "Can I apply for a permit on arrival?",
      answer: "While it's possible to apply on arrival at designated offices, we strongly recommend applying online in advance to avoid delays."
    },
    {
      question: "Are permits required for Indian citizens?",
      answer: "Yes, Indian citizens need Inner Line Permits to visit certain restricted areas in Ladakh."
    },
    {
      question: "Can I extend my permit duration?",
      answer: "Yes, most permits can be extended. You need to apply for extension before the original permit expires."
    }
  ];

  // Application Form View
  if (currentView === 'application') {
    return (
      <main className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-blue-900 text-white py-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleReturnToMain}
                className="flex items-center text-white hover:text-blue-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Permits
              </button>
              <div className="text-center flex-1">
                <h1 className="text-2xl font-bold">{selectedPermit?.title}</h1>
                <p className="text-blue-100">Application for visiting protected areas in Ladakh</p>
              </div>
              <div className="w-20"></div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Form Overview */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Application Form</h2>
                <p className="text-gray-600">Please fill in all required information accurately. Processing time: {selectedPermit?.processingTime} | Fee: {selectedPermit?.fee}</p>
              </div>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Document Uploads
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Valid ID Proof *</label>
                    <div className="flex items-center">
                      <input 
                        type="file" 
                        name="idProof"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        id="idProof"
                        required
                      />
                      <label 
                        htmlFor="idProof"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                      >
                        Choose File
                      </label>
                      <span className="ml-3 text-gray-500">
                        {formData.idProof ? formData.idProof.name : "No file chosen"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Passport Size Photo *</label>
                    <div className="flex items-center">
                      <input 
                        type="file" 
                        name="passportPhoto"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        id="passportPhoto"
                        required
                      />
                      <label 
                        htmlFor="passportPhoto"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                      >
                        Choose File
                      </label>
                      <span className="ml-3 text-gray-500">
                        {formData.passportPhoto ? formData.passportPhoto.name : "No file chosen"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Travel Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Travel Date *</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input 
                        type="date" 
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Return Date *</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input 
                        type="date" 
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Itinerary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  Travel Itinerary
                </h3>
                <div>
                  <label className="block text-gray-700 mb-2">Travel Itinerary *</label>
                  <textarea 
                    name="itinerary"
                    value={formData.itinerary}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                    placeholder="Please provide detailed travel itinerary including places to visit, accommodation details, etc."
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    `Submit Application - ${selectedPermit?.fee}`
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  By submitting this application, you agree to the terms and conditions of the permit process.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Confirmation View
  if (currentView === 'confirmation') {
    return (
      <main className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-blue-900 text-white py-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleReturnToMain}
                className="flex items-center text-white hover:text-blue-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Permits
              </button>
              <div className="text-center flex-1">
                <h1 className="text-2xl font-bold">{selectedPermit?.title}</h1>
                <p className="text-blue-100">Application Confirmation</p>
              </div>
              <div className="w-20"></div>
            </div>
          </div>
        </div>

        {/* Confirmation Content */}
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Application Submitted Successfully!</h2>
              <p className="text-lg text-gray-600">Thank you for applying for {selectedPermit?.title}</p>
            </div>

            {/* Application Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Application ID</p>
                    <p className="text-xl font-bold text-gray-800">{applicationId}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Processing Time</p>
                    <p className="text-xl font-bold text-gray-800">{selectedPermit?.processingTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Email Status */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Confirmation Email Sent</h3>
                  <p className="text-gray-600">A confirmation has been sent to your email address</p>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">What happens next?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Your application will be reviewed by our team within {selectedPermit?.processingTime}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You'll receive an email notification once your permit is approved</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You can download your permit from the confirmation email</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDownloadPDF}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Application PDF
              </button>
              <button 
                onClick={handleReturnToMain}
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Return to Permit Dashboard
              </button>
              <button 
                onClick={handleApplyAnother}
                className="flex-1 text-blue-600 hover:text-blue-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Apply for Another Permit
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Main View
  return (
    <main className="bg-white min-h-screen">
      {/* Header Navigation */}
      <header className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">LehGo</h1>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-blue-200 font-medium">Home</Link>
              <Link href="/tours" className="text-white hover:text-blue-200 font-medium">Explore</Link>
              <Link href="/tripplanner" className="text-white hover:text-blue-200 font-medium">Trip Planner</Link>
              <Link href="/bookings" className="text-white hover:text-blue-200 font-medium">Bookings</Link>
              <Link href="/permits" className="text-white hover:text-blue-200 font-medium">Permits</Link>
            </nav>
            
            {/* Action Button */}
            <div className="flex items-center space-x-4">
              <button className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                Make Your Trip
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Permits</h1>
          <p className="text-xl text-blue-100 mb-8">Apply for all required permits online through the official Government of Ladakh portal</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200">
            Apply for Permit Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('permit-types')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                activeTab === 'permit-types' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Permit Types
            </button>
            <button 
              onClick={() => setActiveTab('application-process')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                activeTab === 'application-process' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Application Process
            </button>
            <button 
              onClick={() => setActiveTab('check-status')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                activeTab === 'check-status' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Check Status
            </button>
          </div>
        </div>

        {/* Permit Types Section */}
        {activeTab === 'permit-types' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {permitTypes.map((permit) => (
              <div key={permit.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{permit.title}</h3>
                    <p className="text-gray-600 mb-4">{permit.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="font-medium">{permit.processingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Validity:</span>
                    <span className="font-medium">{permit.validity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-medium text-green-600">{permit.fee}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Required Documents:</h4>
                  <ul className="space-y-1">
                    {permit.documents.map((doc, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => handleApplyPermit(permit)}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Apply for {permit.title}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Application Process Section */}
        {activeTab === 'application-process' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Fill Application Form</h3>
                  <p className="text-gray-600">Complete the online application form with your personal details and travel information.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Documents</h3>
                  <p className="text-gray-600">Upload all required documents including ID proof, photographs, and travel itinerary.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Pay Fees</h3>
                  <p className="text-gray-600">Make the required payment through our secure payment gateway.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Receive Permit</h3>
                  <p className="text-gray-600">Your permit will be processed and sent to your email within the specified timeframe.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Check Status Section */}
        {activeTab === 'check-status' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Check Permit Status</h2>
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Application ID</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
                  placeholder="Enter your application ID"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
                  placeholder="Enter your email address"
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                Check Status
              </button>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-6 py-2 rounded-lg font-medium border border-blue-200 transition-colors duration-200">
              View All FAQs
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

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
  const [permitNumber, setPermitNumber] = useState('');
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [checkStatusData, setCheckStatusData] = useState({
    applicationId: ''
  });
  const [statusResult, setStatusResult] = useState<any>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

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
    
    try {
      // Validate form data
      if (!formData.fullName || !formData.email || !formData.phone || !formData.travelDate || !formData.returnDate) {
        throw new Error('Please fill in all required fields');
      }

      if (!selectedPermit) {
        throw new Error('No permit type selected');
      }
      
      // Generate application ID and permit number
      const newApplicationId = `${selectedPermit.title.split(' ')[0]}-${Math.floor(Math.random() * 90000) + 10000}`;
      setApplicationId(newApplicationId);
      
      const permitPrefix = selectedPermit.title.split(' ')[0].toUpperCase();
      const newPermitNumber = `LAK/${permitPrefix}/${new Date().getFullYear()}/${newApplicationId.split('-')[1]}`;
      setPermitNumber(newPermitNumber);
      
      // Extract fee amount (remove ₹ and "per person")
      const feeAmount = parseInt(selectedPermit.fee.replace(/[^0-9]/g, ''));
      
      if (isNaN(feeAmount) || feeAmount <= 0) {
        throw new Error('Invalid permit fee');
      }
      
      // 1. SAVE PERMIT APPLICATION TO DATABASE
      const permitPayload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        permitType: selectedPermit.title,
        travelDate: formData.travelDate,
        returnDate: formData.returnDate,
        itinerary: formData.itinerary?.trim() || '',
        amount: feeAmount,
        applicationId: newApplicationId,
        permitNumber: newPermitNumber
      };
      
      console.log('📤 SENDING PERMIT PAYLOAD TO:', `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/permits`);
      console.log('📦 Payload:', JSON.stringify(permitPayload, null, 2));
      console.log('🔍 Checking each field:');
      Object.entries(permitPayload).forEach(([key, value]) => {
        console.log(`  ${key}: ${value} (${typeof value}) - ${value ? '✅' : '❌ MISSING'}`);
      });
      
      const permitRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/permits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(permitPayload)
      });
      
      console.log('📡 Response status:', permitRes.status, permitRes.statusText);
      
      if (!permitRes.ok) {
        const responseText = await permitRes.text();
        console.error('❌ Backend response (text):', responseText);
        
        let error;
        try {
          error = JSON.parse(responseText);
        } catch (e) {
          throw new Error(`Server error (${permitRes.status}): ${responseText || 'Unknown error'}`);
        }
        
        console.error('❌ Backend error (parsed):', error);
        throw new Error(error.error || error.message || 'Failed to create permit application');
      }
      
      const { permit } = await permitRes.json();
      console.log('✅ Permit saved to database:', permit);
      
      // 2. CREATE STRIPE PAYMENT SESSION
      const paymentRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bookingId: newApplicationId, 
          amount: feeAmount, 
          name: formData.fullName,
          type: 'permit'
        })
      });
      
      if (!paymentRes.ok) {
        throw new Error('Failed to initiate payment');
      }
      
      const { url } = await paymentRes.json();
      
      // 3. STORE DATA IN SESSION STORAGE
      sessionStorage.setItem('permitApplication', JSON.stringify({
        formData,
        selectedPermit,
        applicationId: newApplicationId,
        permitNumber: newPermitNumber
      }));
      
      // 4. REDIRECT TO STRIPE CHECKOUT
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Payment URL not received');
      }
    } catch (error: any) {
      console.error('Application error:', error);
      alert(error.message || 'Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // ============ HEADER SECTION ============
    // Top header band (government style)
    doc.setFillColor(25, 47, 89); // Dark blue government color
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    // Government emblem/logo placeholder (left side)
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1);
    doc.circle(25, 17.5, 10, 'S'); // Placeholder circle for emblem
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('EMBLEM', 25, 19, { align: 'center' });
    
    // Header text (center)
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('GOVERNMENT OF LADAKH', pageWidth / 2, 12, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Department of Tourism', pageWidth / 2, 18, { align: 'center' });
    doc.setFontSize(8);
    doc.text('Union Territory of Ladakh, India', pageWidth / 2, 24, { align: 'center' });
    
    // Reset colors
    doc.setTextColor(0, 0, 0);
    
    // ============ DOCUMENT TITLE ============
    doc.setFontSize(18);
    doc.setFont('times', 'bold');
    const permitTitle = selectedPermit?.title.toUpperCase() || 'PERMIT';
    doc.text(permitTitle, pageWidth / 2, 48, { align: 'center' });
    
    // Permit number and issue date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const permitPrefix = selectedPermit?.title.split(' ')[0].toUpperCase() || 'LAK';
    const permitNumber = `LAK/${permitPrefix}/${new Date().getFullYear()}/${applicationId.split('-')[1] || '000000'}`;
    doc.text(`Permit No: ${permitNumber}`, 20, 58);
    doc.text(`Issue Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - 70, 58);
    
    // Horizontal line separator
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 62, pageWidth - 20, 62);
    
    // ============ APPLICANT DETAILS (TABLE FORMAT) ============
    let yPos = 72;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('APPLICANT DETAILS', 20, yPos);
    yPos += 8;
    
    // Draw table borders
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.3);
    const tableX = 20;
    const tableWidth = pageWidth - 40;
    const colWidth = tableWidth / 2;
    
    // Function to draw a table row
    const drawRow = (label: string, value: string, y: number) => {
      // Outer border
      doc.rect(tableX, y, tableWidth, 10);
      // Vertical divider
      doc.line(tableX + colWidth, y, tableX + colWidth, y + 10);
      
      // Label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(label, tableX + 3, y + 6.5);
      
      // Value
      doc.setFont('helvetica', 'normal');
      doc.text(value, tableX + colWidth + 3, y + 6.5);
      
      return y + 10;
    };
    
    yPos = drawRow('Full Name', formData.fullName || 'N/A', yPos);
    yPos = drawRow('Email Address', formData.email || 'N/A', yPos);
    yPos = drawRow('Phone Number', formData.phone || 'N/A', yPos);
    yPos = drawRow('Travel Start Date', formData.travelDate || 'N/A', yPos);
    yPos = drawRow('Travel End Date', formData.returnDate || 'N/A', yPos);
    yPos = drawRow('Application ID', applicationId || 'N/A', yPos);
    
    // Add itinerary if provided
    if (formData.itinerary) {
      yPos += 5;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Travel Itinerary:', 20, yPos);
      yPos += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const splitItinerary = doc.splitTextToSize(formData.itinerary, tableWidth - 6);
      doc.text(splitItinerary, 23, yPos);
      yPos += splitItinerary.length * 5 + 5;
    } else {
      yPos += 10;
    }
    
    // ============ VALIDITY & STATUS ============
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PERMIT STATUS', 20, yPos);
    yPos += 8;
    
    doc.setFillColor(255, 243, 205); // Light yellow background
    doc.rect(20, yPos, tableWidth, 15, 'F');
    doc.setDrawColor(200, 150, 0);
    doc.rect(20, yPos, tableWidth, 15, 'S');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(200, 100, 0);
    doc.text('Status: PENDING APPROVAL', pageWidth / 2, yPos + 6, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Processing Time: ${selectedPermit?.processingTime} | You will be notified via email`, pageWidth / 2, yPos + 11, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    yPos += 25;
    
    // ============ QR CODE PLACEHOLDER ============
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Verification QR Code', 20, yPos);
    yPos += 5;
    
    // QR code placeholder
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(20, yPos, 30, 30, 'S');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('QR Code', 35, yPos + 16, { align: 'center' });
    
    // Instructions next to QR
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Scan this QR code to verify the authenticity of this permit.', 55, yPos + 8);
    doc.text(`Verification URL: https://ladakh.gov.in/verify/${permitNumber}`, 55, yPos + 14);
    doc.text('This permit is valid only when approved by the issuing authority.', 55, yPos + 20);
    
    yPos += 40;
    
    // ============ SIGNATURE SECTION ============
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('ISSUING AUTHORITY', 20, yPos);
    yPos += 8;
    
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.rect(20, yPos, 80, 30, 'S');
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text('[Signature will appear here upon approval]', 60, yPos + 12, { align: 'center' });
    doc.line(30, yPos + 20, 90, yPos + 20); // Signature line
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Authorized Signatory', 60, yPos + 25, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Department of Tourism, Ladakh', 60, yPos + 29, { align: 'center' });
    
    // ============ FOOTER ============
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('This is a system-generated document. For queries, contact: tourism@ladakh.gov.in | +91-1982-252094', pageWidth / 2, pageHeight - 15, { align: 'center' });
    doc.text('Keep this document with you during your travel in restricted areas.', pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Watermark
    doc.setFontSize(60);
    doc.setTextColor(240, 240, 240);
    doc.setFont('helvetica', 'bold');
    doc.text('PENDING', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
    
    // Border around entire page
    doc.setDrawColor(25, 47, 89);
    doc.setLineWidth(1);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
    
    // Save the PDF
    doc.save(`${selectedPermit?.title}-Permit-${permitNumber}.pdf`);
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

  const handleCheckStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckStatusData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckStatus = async () => {
    const appId = checkStatusData.applicationId?.trim();

    if (!appId) {
      alert('Please enter Application ID');
      return;
    }

    setIsCheckingStatus(true);
    setStatusResult(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/permits/application/${encodeURIComponent(appId)}`
      );

      if (res.status === 404) {
        setStatusResult({
          notFound: true,
          message: 'Application ID not found. Please check the ID and try again.'
        });
        return;
      }

      if (!res.ok) {
        const txt = await res.text();
        let msg = txt;
        try {
          const parsed = JSON.parse(txt);
          msg = parsed?.error || parsed?.message || txt;
        } catch {
          // ignore
        }
        throw new Error(msg || 'Failed to check status');
      }

      const data = await res.json();
      const permit = data?.permit;

      const status: string = permit?.status || 'Unknown';
      const statusMessage =
        status === 'Approved'
          ? 'Your permit is approved.'
          : status === 'Rejected'
            ? 'Your application was rejected.'
            : status === 'Under Review'
              ? 'Your application is under review by the authorities.'
              : status === 'Payment Pending'
                ? 'Payment is pending for this application.'
                : 'Your application is being processed.';

      // try to show submitted date from db
      const submitted = permit?.submittedAt || permit?.createdAt;

      setStatusResult({
        status,
        message: statusMessage,
        submittedDate: submitted ? new Date(submitted).toLocaleDateString() : '-'
      });
    } catch (err: any) {
      setStatusResult({
        error: true,
        message: err?.message || 'Failed to check status'
      });
    } finally {
      setIsCheckingStatus(false);
    }
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
                  name="applicationId"
                  value={checkStatusData.applicationId}
                  onChange={handleCheckStatusChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
                  placeholder="Enter your application ID"
                />
              </div>
              <button 
                onClick={handleCheckStatus}
                disabled={isCheckingStatus}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex justify-center items-center"
              >
                {isCheckingStatus ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </>
                ) : (
                  'Check Status'
                )}
              </button>

              {/* Status Result */}
              {statusResult && (
                <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                  {statusResult.notFound || statusResult.error ? (
                    <p className={`font-medium ${statusResult.error ? 'text-red-600' : 'text-gray-700'}`}>
                      {statusResult.message}
                    </p>
                  ) : (
                    <>
                      <div className="flex items-center mb-4">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          statusResult.status === 'Approved' ? 'bg-green-500' :
                          statusResult.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <h3 className="text-lg font-semibold text-gray-800">Status: {statusResult.status}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{statusResult.message}</p>
                      <div className="text-sm">
                        <span className="text-gray-500 block">Submitted On</span>
                        <span className="font-medium text-gray-800">{statusResult.submittedDate}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
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

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

export default function ILPConfirmation() {
  const router = useRouter();
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    // Get application data from sessionStorage
    const storedData = sessionStorage.getItem('ilpApplication');
    if (storedData) {
      setApplicationData(JSON.parse(storedData));
    } else {
      // Redirect to permits page if no application data
      router.push('/permits');
    }
  }, [router]);

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
    doc.text('INNER LINE PERMIT (ILP)', pageWidth / 2, 48, { align: 'center' });
    
    // Permit number and issue date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const permitNumber = `LAK/ILP/${new Date().getFullYear()}/${applicationData?.applicationId?.slice(-6) || '000000'}`;
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
    
    if (applicationData && applicationData.formData) {
      yPos = drawRow('Full Name', applicationData.formData.fullName || 'N/A', yPos);
      yPos = drawRow('Email Address', applicationData.formData.email || 'N/A', yPos);
      yPos = drawRow('Phone Number', applicationData.formData.phone || 'N/A', yPos);
      yPos = drawRow('Travel Start Date', applicationData.formData.travelDate || 'N/A', yPos);
      yPos = drawRow('Travel End Date', applicationData.formData.returnDate || 'N/A', yPos);
      yPos = drawRow('Application ID', applicationData?.applicationId || 'N/A', yPos);
    }
    
    yPos += 10;
    
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
    doc.text('Processing Time: 24-48 hours | You will be notified via email', pageWidth / 2, yPos + 11, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    yPos += 25;
    
    // ============ QR CODE PLACEHOLDER ============
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Verification QR Code', 20, yPos);
    yPos += 5;
    
    // QR code placeholder (you can integrate a real QR library like 'qrcode' later)
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
    doc.save(`ILP-Permit-${permitNumber}.pdf`);
  };


  const handleReturnToDashboard = () => {
    router.push('/permits');
  };

  const handleApplyAnother = () => {
    router.push('/permits/ilp-application');
  };

  if (!applicationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application details...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-blue-900 text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/permits" className="flex items-center text-white hover:text-blue-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Permits
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">Inner Line Permit (ILP)</h1>
              <p className="text-blue-100">Application Confirmation</p>
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
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
            <p className="text-lg text-gray-600">Thank you for applying for an Inner Line Permit</p>
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
                  <p className="text-xl font-bold text-gray-800">{applicationData.applicationId}</p>
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
                  <p className="text-xl font-bold text-gray-800">24-48 hours</p>
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
                <span className="text-gray-700">Your application will be reviewed by our team within 24-48 hours</span>
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
              onClick={handleReturnToDashboard}
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

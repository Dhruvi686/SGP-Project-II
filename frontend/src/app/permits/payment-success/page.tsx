"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QRCode from 'qrcode';
import jsPDF from 'jspdf';

function PermitPaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Processing payment confirmation...");
  const [permitData, setPermitData] = useState<any>(null);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');

  useEffect(() => {
    const confirmPayment = async () => {
      // Retrieve permit application data from sessionStorage
      const storedData = sessionStorage.getItem('permitApplication');
      if (!storedData) {
        setStatus("No permit data found. Please apply again.");
        return;
      }

      const data = JSON.parse(storedData);
      setPermitData(data);
      
      // Generate QR code
      const verificationURL = `https://ladakh.gov.in/verify/${data.permitNumber}`;
      QRCode.toDataURL(verificationURL, { width: 200, margin: 1 })
        .then(url => {
          setQrCodeDataURL(url);
        })
        .catch(err => console.error('QR generation error:', err));
      
      // Confirm payment in database
      try {
        const sessionId = searchParams.get('session_id');
        const confirmRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/permits/${data.applicationId}/confirm-payment`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentSessionId: sessionId })
          }
        );

        if (confirmRes.ok) {
          console.log('✅ Payment confirmed in database');
          setStatus("Payment successful! Your permit application is confirmed.");
        } else {
          console.error('❌ Failed to confirm payment in database');
          setStatus("Payment received, but confirmation pending. Please check your email.");
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
        setStatus("Payment received, but confirmation pending. Please check your email.");
      }
    };

    confirmPayment();
  }, [searchParams]);

  const handleDownloadPDF = () => {
    if (!permitData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // ============ HEADER SECTION ============
    doc.setFillColor(25, 47, 89);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    // Government emblem placeholder
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1);
    doc.circle(25, 17.5, 10, 'S');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('EMBLEM', 25, 19, { align: 'center' });
    
    // Header text
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('GOVERNMENT OF LADAKH', pageWidth / 2, 12, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Department of Tourism', pageWidth / 2, 18, { align: 'center' });
    doc.setFontSize(8);
    doc.text('Union Territory of Ladakh, India', pageWidth / 2, 24, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    
    // ============ DOCUMENT TITLE ============
    doc.setFontSize(18);
    doc.setFont('times', 'bold');
    doc.text(permitData.selectedPermit?.title.toUpperCase() || 'PERMIT', pageWidth / 2, 48, { align: 'center' });
    
    // Permit number and issue date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Permit No: ${permitData.permitNumber}`, 20, 58);
    doc.text(`Issue Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - 70, 58);
    
    // Line separator
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 62, pageWidth - 20, 62);
    
    // ============ APPLICANT DETAILS ============
    let yPos = 72;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('APPLICANT DETAILS', 20, yPos);
    yPos += 8;
    
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.3);
    const tableX = 20;
    const tableWidth = pageWidth - 40;
    const colWidth = tableWidth / 2;
    
    const drawRow = (label: string, value: string, y: number) => {
      doc.rect(tableX, y, tableWidth, 10);
      doc.line(tableX + colWidth, y, tableX + colWidth, y + 10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(label, tableX + 3, y + 6.5);
      doc.setFont('helvetica', 'normal');
      doc.text(value, tableX + colWidth + 3, y + 6.5);
      return y + 10;
    };
    
    yPos = drawRow('Full Name', permitData.formData.fullName || 'N/A', yPos);
    yPos = drawRow('Email Address', permitData.formData.email || 'N/A', yPos);
    yPos = drawRow('Phone Number', permitData.formData.phone || 'N/A', yPos);
    yPos = drawRow('Travel Start Date', permitData.formData.travelDate || 'N/A', yPos);
    yPos = drawRow('Travel End Date', permitData.formData.returnDate || 'N/A', yPos);
    yPos = drawRow('Application ID', permitData.applicationId || 'N/A', yPos);
    
    yPos += 10;
    
    // ============ STATUS ============
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PERMIT STATUS', 20, yPos);
    yPos += 8;
    
    doc.setFillColor(200, 255, 200);
    doc.rect(20, yPos, tableWidth, 15, 'F');
    doc.setDrawColor(0, 200, 0);
    doc.rect(20, yPos, tableWidth, 15, 'S');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 150, 0);
    doc.text('Status: PAYMENT COMPLETED - PENDING APPROVAL', pageWidth / 2, yPos + 6, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Processing Time: ${permitData.selectedPermit?.processingTime} | Verification pending`, pageWidth / 2, yPos + 11, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    yPos += 25;
    
    // ============ QR CODE ============
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Verification QR Code', 20, yPos);
    yPos += 5;
    
    // Add QR code image if available
    if (qrCodeDataURL) {
      doc.addImage(qrCodeDataURL, 'PNG', 20, yPos, 30, 30);
    } else {
      doc.rect(20, yPos, 30, 30, 'S');
      doc.setFontSize(8);
      doc.text('QR Code', 35, yPos + 16, { align: 'center' });
    }
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Scan this QR code to verify permit authenticity.', 55, yPos + 8);
    doc.text(`Verification URL: https://ladakh.gov.in/verify/${permitData.permitNumber}`, 55, yPos + 14);
    doc.text('This permit is valid only when approved by the issuing authority.', 55, yPos + 20);
    
    yPos += 40;
    
    // ============ SIGNATURE SECTION ============
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('ISSUING AUTHORITY', 20, yPos);
    yPos += 8;
    
    doc.rect(20, yPos, 80, 30, 'S');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text('[Signature upon approval]', 60, yPos + 12, { align: 'center' });
    doc.line(30, yPos + 20, 90, yPos + 20);
    doc.setFont('helvetica', 'bold');
    doc.text('Authorized Signatory', 60, yPos + 25, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Department of Tourism, Ladakh', 60, yPos + 29, { align: 'center' });
    
    // ============ FOOTER ============
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('This is a system-generated document. For queries: tourism@ladakh.gov.in | +91-1982-252094', pageWidth / 2, pageHeight - 15, { align: 'center' });
    doc.text('Keep this document with you during your travel.', pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Watermark
    doc.setFontSize(50);
    doc.setTextColor(220, 255, 220);
    doc.setFont('helvetica', 'bold');
    doc.text('PAID', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
    
    // Border
    doc.setDrawColor(25, 47, 89);
    doc.setLineWidth(1);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
    
    doc.save(`${permitData.selectedPermit?.title}-Permit-${permitData.permitNumber}.pdf`);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-blue-900 text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Permit Payment Confirmation</h1>
            <p className="text-blue-100">Your payment has been processed</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-lg text-gray-600">{status}</p>
          </div>

          {permitData && (
            <>
              {/* Permit Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Permit Type</p>
                    <p className="text-lg font-bold text-gray-800">{permitData.selectedPermit?.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Application ID</p>
                    <p className="text-lg font-bold text-gray-800">{permitData.applicationId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Permit Number</p>
                    <p className="text-lg font-bold text-gray-800">{permitData.permitNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Processing Time</p>
                    <p className="text-lg font-bold text-gray-800">{permitData.selectedPermit?.processingTime}</p>
                  </div>
                </div>
              </div>

              {/* QR Code Display */}
              {qrCodeDataURL && (
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <img src={qrCodeDataURL} alt="Permit QR Code" className="w-40 h-40 border-4 border-blue-200 rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Verification QR Code</h3>
                      <p className="text-gray-600 mb-2">Scan this QR code to verify your permit authenticity online.</p>
                      <p className="text-sm text-gray-500">Verification URL: https://ladakh.gov.in/verify/{permitData.permitNumber}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* What's Next */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">What happens next?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Your application will be reviewed within {permitData.selectedPermit?.processingTime}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">You'll receive an email notification once approved</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Download your permit below and keep it with you during travel</span>
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
                  Download Permit PDF
                </button>
                <button 
                  onClick={() => router.push('/permits')}
                  className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Return to Permits
                </button>
              </div>
            </>
          )}

          {!permitData && (
            <div className="text-center">
              <button 
                onClick={() => router.push('/permits')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Go to Permits Page
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function PermitPaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Processing...</h1>
          <p>Please wait while we confirm your payment...</p>
        </div>
      </div>
    }>
      <PermitPaymentSuccess />
    </Suspense>
  );
}

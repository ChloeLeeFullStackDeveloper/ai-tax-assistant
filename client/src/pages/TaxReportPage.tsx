import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type TaxReport = {
  timestamp: string;
  income: number;
  deductions: number;
  credits: number;
  federalTax: number;
  provincialTax: number;
  balanceOwing: number;
};

const TaxReportPage: React.FC = () => {
  const [report, setReport] = useState<TaxReport | null>(null);
  const [showModal, setShowModal] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('taxHistory') || '[]');
    if (history.length > 0) {
      setReport(history[history.length - 1]);
    }
  }, []);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('tax_report.pdf');
  };

  const openModal = () => setShowModal(true);
  const confirmCRA = () => {
    setShowModal(false);
    window.open(
      'https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/account-individuals.html',
      '_blank'
    );
  };

  if (!report) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">📄 Tax Report</h1>
        <p>No tax report found. Please complete a tax form first.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <h1 className="text-4xl font-bold mb-6">📄 Tax Report</h1>

      <div ref={reportRef} className="bg-white p-6 rounded-lg shadow space-y-4 border">
        <h2 className="text-2xl font-semibold">🧾 Income & Tax Summary</h2>
        <p><strong>📅 Generated On:</strong> {new Date(report.timestamp).toLocaleDateString()}</p>
        <p><strong>💵 Total Income:</strong> ${report.income.toFixed(2)}</p>
        <p><strong>➖ Total Deductions:</strong> ${report.deductions.toFixed(2)}</p>
        <p><strong>✅ Total Credits:</strong> ${report.credits.toFixed(2)}</p>
        <p><strong>🇨🇦 Federal Tax:</strong> ${report.federalTax.toFixed(2)}</p>
        <p><strong>🏙️ Provincial Tax:</strong> ${report.provincialTax.toFixed(2)}</p>
        <p className="text-red-600 font-semibold text-lg">
          <strong>💰 Balance Owing:</strong> ${report.balanceOwing.toFixed(2)}
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-white border px-4 py-2 rounded hover:bg-gray-100"
        >
          ⬇️ Download PDF
        </button>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ⬆️ File with CRA
        </button>
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded p-4 text-sm text-gray-700">
        <p>📢 After downloading your tax report, you'll be redirected to the CRA website to log in and complete your tax return manually.</p>
        <p className="mt-1">Ensure your CRA login is ready. This app does not auto-file your return.</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-2">Redirecting to CRA</h2>
            <p className="text-sm text-gray-700 mb-4">
              You’ll be redirected to the official CRA login page. Be sure to download your PDF report first.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmCRA}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxReportPage;

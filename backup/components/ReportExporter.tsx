'use client';
import React from 'react';
import { jsPDF } from 'jspdf';

export default function ReportExporter({ data }: { data: any[] }) {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Training Report', 10, 10);
    data.forEach((row, i) => {
      doc.text(JSON.stringify(row), 10, 20 + i * 10);
    });
    doc.save('report.pdf');
  };

  return <button onClick={exportPDF}>Export Report</button>;
}
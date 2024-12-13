import React from 'react';
import { jsPDF } from 'jspdf';

const PDF = () => {
  const generatePDF = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Add dummy content to the PDF
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Dummy PDF Content Example", 10, 10);
    doc.text("This is a simple PDF document generated with jsPDF.", 10, 20);
    doc.text("Here is a list of some dummy items:", 10, 40);
    doc.text("1. Item One", 10, 50);
    doc.text("2. Item Two", 10, 60);
    doc.text("3. Item Three", 10, 70);
    doc.text("4. Item Four", 10, 80);

    // Add a footer with export statement
    doc.text("This document was generated and exported via React and jsPDF.", 10, 290);

    // Save the PDF as a file
    doc.save("dummy_content.pdf");
  };

  return (
    <div>
      <h1>PDF Export Example</h1>
      <button onClick={generatePDF}>Export PDF</button>
    </div>
  );
};

export default PDF;

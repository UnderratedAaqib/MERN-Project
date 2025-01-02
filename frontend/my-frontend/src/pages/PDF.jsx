import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { getAllUserData } from '../api/userApi';

const PDF = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch all user-related data when the component mounts
    const fetchData = async () => {
      try {
        const data = await getAllUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data for PDF:', error);
      }
    };

    fetchData();
  }, []);

  const generatePDF = () => {
    if (!userData) {
      console.error('No user data available for generating PDF');
      return;
    }

    const doc = new jsPDF();
    let y = 10; // Initialize the Y-coordinate
    const lineHeight = 10; // Line height for each section
    const pageHeight = 280; // Usable page height (A4 size)

    // Function to add text with dynamic page breaks
    const addText = (text, x, yOffset) => {
      if (y + yOffset > pageHeight) {
        doc.addPage(); // Add a new page
        y = 10; // Reset Y-coordinate for the new page
      }
      doc.text(text, x, y);
      y += yOffset; // Update Y-coordinate
    };

    // Aesthetic PDF layout
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    addText('Resume', 10, lineHeight);
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y); // Draw a horizontal line
    y += 5;

    // User Profile Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    addText(`Name: ${userData.userProfile.name}`, 10, lineHeight);
    addText(`Email: ${userData.userProfile.email}`, 10, lineHeight);
    addText(`University: ${userData.userProfile.university || 'N/A'}`, 10, lineHeight);
    addText(`Position: ${userData.userProfile.position || 'N/A'}`, 10, lineHeight);
    addText(`Bio: ${userData.userProfile.bio || 'N/A'}`, 10, lineHeight);

    // Publications Section
    doc.setFont('helvetica', 'bold');
    addText('Publications', 10, lineHeight);
    doc.setFont('helvetica', 'normal');
    userData.publications.forEach((publication, index) => {
      addText(`${index + 1}. ${publication.title} (${publication.year})`, 10, lineHeight);
      addText(`Link: ${publication.link}`, 20, lineHeight);
    });

    // Courses Section
    doc.setFont('helvetica', 'bold');
    addText('Courses', 10, lineHeight);
    doc.setFont('helvetica', 'normal');
    userData.courses.forEach((course, index) => {
      addText(`${index + 1}. ${course.title} - ${course.description}`, 10, lineHeight);
    });

    // Projects Section
    doc.setFont('helvetica', 'bold');
    addText('Projects', 10, lineHeight);
    doc.setFont('helvetica', 'normal');
    userData.projects.forEach((project, index) => {
      addText(`${index + 1}. ${project.name} (${project.affiliation})`, 10, lineHeight);
      addText(`Description: ${project.description}`, 20, lineHeight);
    });

    // Talks Section
    doc.setFont('helvetica', 'bold');
    addText('Talks', 10, lineHeight);
    doc.setFont('helvetica', 'normal');
    userData.talks.forEach((talk, index) => {
      addText(`${index + 1}. ${talk.title}`, 10, lineHeight);
      addText(`Description: ${talk.description}`, 20, lineHeight);
      addText(`Video: ${talk.videoUrl}`, 20, lineHeight);
    });

    // Media Coverage Section
    doc.setFont('helvetica', 'bold');
    addText('Media Coverage', 10, lineHeight);
    doc.setFont('helvetica', 'normal');
    userData.mediaArticles.forEach((article, index) => {
      addText(`${index + 1}. ${article.title}`, 10, lineHeight);
      addText(`Description: ${article.description}`, 20, lineHeight);
      addText(`Link: ${article.link}`, 20, lineHeight);
    });

    // Social Details Section
    doc.setFont('helvetica', 'bold');
    addText('Social Details', 10, lineHeight);
    doc.setFont('helvetica', 'normal');
    addText(`LinkedIn: ${userData.socialDetails.linkedIn || 'N/A'}`, 10, lineHeight);
    addText(`GitHub: ${userData.socialDetails.github || 'N/A'}`, 10, lineHeight);

    // Save the PDF as a file
    doc.save('Resume.pdf');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
      <h1>Generate Resume</h1>
      <button onClick={generatePDF} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Download
      </button>
    </div>
  );
};

export default PDF;

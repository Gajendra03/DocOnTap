import puppeteer from "puppeteer";

export const generatePrescriptionPDF = async function (data) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = `
  <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f7f9;
          color: #333;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* HEADER - Theme color background */
        .header {
          background: ${data.themeColor};
          color: white;
          padding: 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
        }
        .header-left {
          display: flex;
          align-items: center;
        }
        .logo-box {
          background: white;
          border-radius: 8px;
          padding: 6px;
          margin-right: 15px;
        }
        .logo-box img {
          height: 70px;
          width: auto;
          display: block;
        }
        .company-info h1 {
          margin: 0;
          font-size: 26px;
          font-weight: bold;
        }
        .company-info p {
          margin: 2px 0;
          font-size: 13px;
          color: #f1f1f1;
        }

        /* PATIENT & DOCTOR SECTION */
        .patient-doctor {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          background-color: #ffffff;
          border-radius: 8px;
          margin: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .patient-doctor strong {
          color: ${data.themeColor};
        }
        .patient-details div {
          margin-bottom: 5px;
        }

        /* PRESCRIPTION CONTENT */
        .prescription {
          padding: 25px;
          margin: 0 20px 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          font-size: 15px;
          line-height: 1.6;
          flex: 1;
        }
        .prescription h3 {
          color: ${data.themeColor};
          margin-bottom: 15px;
          border-bottom: 2px solid ${data.themeColor};
          padding-bottom: 5px;
        }

        /* FOOTER - same color as header, fixed bottom */
        .footer {
          background-color: ${data.themeColor};
          color: white;
          text-align: center;
          padding: 20px 20px;
          font-size: 12px;
          margin-top: auto;
        }
        .footer .logo-box {
          background: white;
          border-radius: 8px;
          padding: 5px;
          display: inline-block;
          margin-bottom: 10px;
        }
        .footer .logo-box img {
          height: 40px;
          width: auto;
          display: block;
        }
      </style>
    </head>
    <body>
      <!-- HEADER -->
      <div class="header">
        <div class="header-left">
          <div class="logo-box">
            <img src="${data.companyLogo}" alt="Company Logo" />
          </div>
          <div class="company-info">
            <h1>${data.companyName}</h1>
            <p>${data.companyLine1}</p>
            <p>${data.companyLine2}</p>
          </div>
        </div>
      </div>

      <!-- PATIENT & DOCTOR INFO -->
      <div class="patient-doctor">
        <div class="patient-details">
          <div><strong>Patient Name:</strong> ${data.patientName}</div>
          <div><strong>Age:</strong> ${data.patientAge}</div>
          <div><strong>Gender:</strong> ${data.patientGender}</div>
          <div><strong>Email:</strong> ${data.patientEmail}</div>
          <div><strong>Address:</strong> ${data.patientAddress}</div>
          <div><strong>Disease:</strong> ${data.patientDisease}</div>
        </div>
        <div class="doctor-details">
          <div><strong>Doctor:</strong> ${data.doctorName}</div>
          <div><strong>Designation:</strong> ${data.doctorDesignation}</div>
          <div><strong>Qualification:</strong> ${data.doctorStudy}</div>
        </div>
      </div>

      <!-- PRESCRIPTION CONTENT -->
      <div class="prescription">
        <h3>Prescription Details</h3>
        ${data.prescriptionContent}
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div class="logo-box">
          <img src="${data.companyLogo}" alt="Company Logo" />
        </div><br/>
        ${data.companyAddress} | Contact: ${data.companyContact} <br/>
        &copy; ${new Date().getFullYear()} ${data.companyName}. All rights reserved.
      </div>
    </body>
  </html>
  `;

  await page.setContent(htmlContent, { waitUntil: "load" });
  await page.pdf({
    path: "prescription.pdf",
    format: "A4",
    printBackground: true
  });

  await browser.close();
  return "prescription.pdf";
};

import nodemailer from "nodemailer";

export const sendEmail = async (email, name, file) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f2f6f9; padding: 30px;">
        <div style="max-width: 600px; background: #ffffff; margin: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <div style="background: #42839b; padding: 20px; text-align: center; color: white;">
            <img src="https://iili.io/FQDQoS2.png" alt="Logo" style="max-width: 110px; margin-bottom: 10px;">
            <h1 style="margin: 0; font-size: 22px;">Your Prescription is Ready</h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 25px; text-align: center; color: #222;">
            <h2 style="color: #42839b; margin-bottom: 10px;">Hello ${name},</h2>
            <p style="color: #444; font-size: 15px; line-height: 1.6;">
              We hope you’re feeling well. Please find your <strong style="color:#42839b;">prescription</strong> attached below for your reference.
            </p>
            <p style="margin: 20px 0;">
              <a href="#" style="background: #42839b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Download Attached Prescription
              </a>
            </p>
          </div>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid #ddd; margin: 0;">
          
          <!-- Footer -->
          <div style="background: #222; color: white; text-align: center; padding: 15px; font-size: 12px;">
            <p style="margin: 0;">Thank you for choosing our service.</p>
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Healthcare Team</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Healthcare Team" <${process.env.USER}>`,
      to: email,
      subject: `Prescription of ${name}`,
      html: htmlContent,
      attachments: [
        {
          filename: `prescription-${name}.pdf`,
          path: file,
        },
      ],
    });

  } catch (error) {
    console.log(error);
    return error;
  }
};
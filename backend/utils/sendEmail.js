import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, url, name) => {
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

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: sentHtml(name, url),
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

const sentHtml = (user_name,verification_link) => {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Verify your DocOnTap account</title>
  <style>
    /* Base Reset */
    body { margin: 0; padding: 0; background-color: #e8f2f5; font-family: 'Helvetica Neue', Arial, sans-serif; -webkit-text-size-adjust: 100%; }
    table { border-spacing: 0; }
    img { border: 0; display: block; }
    a { text-decoration: none; }

    /* Wrapper with gradient background */
    .email-wrapper {
      width: 100%;
      padding: 40px 0;
      background: linear-gradient(135deg, #42839b 0%, #5ca0b8 100%);
    }

    /* Email content */
    .email-content { width: 100%; max-width: 640px; margin: auto; }

    /* Card */
    .card {
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      position: relative;
    }

    /* Decorative top bar */
    .top-bar {
      height: 5px;
      background: linear-gradient(90deg, #42839b, #5ca0b8);
    }

    /* Header */
    .header { padding: 28px; text-align: center; background-color: #ffffff; }
    .logo { width: 140px; height: auto; margin-bottom: 8px; }
    .header-title { font-size: 22px; font-weight: bold; color: #333; margin-top: 6px; }

    /* Body */
    .body { padding: 28px 32px; color: #333; }
    .greeting { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #222; }
    .message { font-size: 15px; line-height: 1.6; margin-bottom: 18px; color: #555; }

    /* Button */
    .button-wrap { text-align: center; margin: 28px 0; }
    .btn {
      display: inline-block;
      padding: 14px 30px;
      background: linear-gradient(135deg, #42839b, #5ca0b8);
      color: #ffffff;
      font-weight: bold;
      font-size: 16px;
      border-radius: 50px;
      box-shadow: 0 4px 15px rgba(66,131,155,0.4);
    }
    .btn:hover { background: linear-gradient(135deg, #336779, #4b93a8); }

    /* Fallback link */
    .fallback { font-size: 13px; color: #777; margin-top: 10px; word-break: break-all; }

    /* Footer */
    .footer {
      padding: 18px 28px;
      text-align: center;
      font-size: 13px;
      color: #9aa0a6;
      background-color: #f8fafb;
      border-top: 1px solid #e6e9ec;
    }
    .footer a { color: #42839b; font-weight: 500; }

    /* Legal */
    .small { font-size: 12px; color: #aaaaaa; margin-top: 12px; }

    /* Mobile */
    @media only screen and (max-width: 480px) {
      .body { padding: 20px; }
      .btn { font-size: 15px; padding: 12px 22px; }
    }
  </style>
</head>
<body>
  <center class="email-wrapper">
    <div class="email-content">
      <table class="card" role="presentation" cellpadding="0" cellspacing="0" width="100%">
        
        <!-- Decorative top bar -->
        <tr><td class="top-bar"></td></tr>

        <!-- Header -->
        <tr>
          <td class="header">
            <img class="logo" src="https://iili.io/FQDQoS2.png" alt="DocOnTap logo" />
            <div class="header-title">Email Verification</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="body">
            <div class="greeting">Hello ${user_name},</div>
            <div class="message">
              Welcome to <strong>DocOnTap</strong>!  
              To activate your account and verify your email address, simply click the button below.
            </div>

            <div class="button-wrap">
              <a href="${verification_link}" class="btn" target="_blank" rel="noopener">Verify My Email</a>
            </div>

            <div class="message">
              If the button doesn’t work, copy and paste this link into your browser:
            </div>

            <div class="fallback">
              <a href="${verification_link}" target="_blank" rel="noopener">${verification_link}</a>
            </div>

            <div class="small">
              This link will expire in 5 minutes. If you didn’t create this account, you can safely ignore this email.
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="footer">
            <div>— The DocOnTap Team</div>
            <div style="margin-top: 8px;">Jagamara, Bhubaneswar, Odisha · <a href="${process.env.BASE_URL}">docontap.example.com</a></div>
            <div style="margin-top: 8px;">Need help? Email us at <a href="mailto:docontap.dev@gmail.com">docontap.dev@gmail.com</a></div>
          </td>
        </tr>
      </table>

      <!-- Legal -->
      <table width="100%" role="presentation">
        <tr>
          <td style="text-align: center; padding-top: 10px;">
            <div class="small">You received this email because you signed up for DocOnTap. © ${new Date().getFullYear()} DocOnTap. All rights reserved.</div>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>
`;
};

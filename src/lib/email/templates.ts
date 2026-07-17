export interface EmailTemplateResult {
  text: string;
  html: string;
}

/**
 * Builds HTML and text bodies for contact inquiries.
 */
export function buildContactEmail(
  name: string,
  email: string,
  subject: string,
  message: string,
  submittedTime: string
): EmailTemplateResult {
  const textContent = `
========================================
Portfolio Contact Form Submission
========================================

Submitted Time: ${submittedTime}

Sender Details:
Name: ${name}
Email: ${email}

Subject: ${subject}

Message:
----------------------------------------
${message}
----------------------------------------

--
Sachin Tadkale Portfolio | Automated System
`;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f4f0ea;
            color: #2b2a28;
            margin: 0;
            padding: 40px 20px;
        }
        .container {
            max-width: 600px;
            background-color: #fbf9f6;
            border: 1px solid #e2dcd2;
            border-radius: 0;
            padding: 32px;
            margin: 0 auto;
        }
        .header {
            border-bottom: 2px solid #1c2b4a;
            padding-bottom: 16px;
            margin-bottom: 24px;
        }
        .title {
            font-size: 22px;
            font-weight: 700;
            color: #2b2a28;
            margin: 0;
        }
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            border-bottom: 1px solid #e2dcd2;
            padding-bottom: 6px;
            margin-bottom: 12px;
        }
        .section-title {
            font-size: 13px;
            font-weight: 600;
            color: #1c2b4a;
            margin: 0;
        }
        .timestamp {
            font-size: 11px;
            font-weight: 400;
            color: #9a9388;
        }
        .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
        }
        .meta-table td {
            padding: 8px 0;
            font-size: 14px;
            vertical-align: top;
        }
        .meta-label {
            color: #6b655c;
            width: 140px;
            font-weight: 500;
        }
        .meta-value {
            color: #2b2a28;
        }
        .meta-value a {
            color: #1c2b4a;
            text-decoration: underline;
        }
        .message-body {
            font-size: 15px;
            line-height: 1.6;
            color: #2b2a28;
            border-left: 2px solid #1c2b4a;
            padding-left: 16px;
            margin-top: 8px;
            white-space: pre-wrap;
        }
        .footer {
            font-size: 11px;
            color: #9a9388;
            text-align: center;
            margin-top: 32px;
            border-top: 1px solid #e2dcd2;
            padding-top: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">New Inquiry Received</h1>
        </div>
        
        <div class="meta-grid">
            <div class="section-header">
                <h2 class="section-title">Submission Info</h2>
                <span class="timestamp">${submittedTime}</span>
            </div>
            <table class="meta-table">
                <tr>
                    <td class="meta-label">Sender Name</td>
                    <td class="meta-value">${name}</td>
                </tr>
                <tr>
                    <td class="meta-label">From</td>
                    <td class="meta-value"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                    <td class="meta-label">Subject</td>
                    <td class="meta-value">${subject}</td>
                </tr>
            </table>
        </div>

        <div class="section-header">
            <h2 class="section-title">Message</h2>
        </div>
        <div class="message-body">${message}</div>

        <div class="footer">
            <p>This inquiry was sent from your portfolio website's contact form.</p>
        </div>
    </div>
</body>
</html>
`;

  return { text: textContent, html: htmlContent };
}

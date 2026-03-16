import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@oforo.ai";
const FROM_EMAIL = process.env.SMTP_FROM || "nxtED Support <noreply@nxted.ai>";

export async function sendTicketNotification({
  ticketId,
  subject,
  category,
  priority,
  userName,
  userEmail,
  description,
}: {
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  userName: string;
  userEmail: string;
  description: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("[mail] SMTP not configured – skipping admin notification for ticket", ticketId);
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3010";

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[nxtED] New Ticket: ${subject}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0f172a; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #00e5b4; margin: 0; font-size: 20px;">New Support Ticket</h1>
        </div>
        <div style="background: #1e293b; padding: 24px; color: #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; width: 120px;">Ticket ID</td>
              <td style="padding: 8px 0; font-weight: 600;">${ticketId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">From</td>
              <td style="padding: 8px 0;">${userName} (${userEmail})</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Category</td>
              <td style="padding: 8px 0;">${category.replace(/_/g, " ")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Priority</td>
              <td style="padding: 8px 0;">
                <span style="background: ${priority === "URGENT" ? "#ef4444" : priority === "HIGH" ? "#f97316" : priority === "MEDIUM" ? "#eab308" : "#22c55e"}; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
                  ${priority}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Subject</td>
              <td style="padding: 8px 0; font-weight: 600;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #0f172a; border-radius: 8px;">
            <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 12px;">Description</p>
            <p style="margin: 0; white-space: pre-wrap;">${description}</p>
          </div>
          <a href="${appUrl}/admin/tickets/${ticketId}" style="display: inline-block; margin-top: 20px; background: #00e5b4; color: #0f172a; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            View Ticket
          </a>
        </div>
        <div style="background: #0f172a; padding: 16px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 12px;">nxtED AI by OFORO AI</p>
        </div>
      </div>
    `,
  });
}

export async function sendTicketReplyNotification({
  ticketId,
  subject,
  replyMessage,
  userEmail,
  userName,
}: {
  ticketId: string;
  subject: string;
  replyMessage: string;
  userEmail: string;
  userName: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("[mail] SMTP not configured – skipping reply notification for ticket", ticketId);
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3010";

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: userEmail,
    subject: `[nxtED] Reply on your ticket: ${subject}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0f172a; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #00e5b4; margin: 0; font-size: 20px;">Ticket Update</h1>
        </div>
        <div style="background: #1e293b; padding: 24px; color: #e2e8f0;">
          <p>Hi ${userName},</p>
          <p>An admin has replied to your support ticket: <strong>${subject}</strong></p>
          <div style="margin-top: 16px; padding: 16px; background: #0f172a; border-radius: 8px;">
            <p style="margin: 0; white-space: pre-wrap;">${replyMessage}</p>
          </div>
          <a href="${appUrl}/support/${ticketId}" style="display: inline-block; margin-top: 20px; background: #00e5b4; color: #0f172a; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            View Ticket
          </a>
        </div>
        <div style="background: #0f172a; padding: 16px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 12px;">nxtED AI by OFORO AI</p>
        </div>
      </div>
    `,
  });
}

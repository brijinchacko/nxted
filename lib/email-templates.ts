import { APP } from './constants';

export interface EmailArgs {
  firstName?: string;
}

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#0B0B0C;color:#F5F5F7;font-family:-apple-system,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0C;padding:32px 16px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#191920;border-radius:12px;padding:32px;">
          <tr><td>
            <div style="font-size:20px;font-weight:700;letter-spacing:-0.02em;margin-bottom:24px;">
              nxt<span style="color:#5CE1E6;">ED</span><span style="color:#8A8A9A;">.ai</span>
            </div>
            <h1 style="font-size:24px;font-weight:600;letter-spacing:-0.02em;margin:0 0 16px;color:#F5F5F7;">${title}</h1>
            ${body}
            <hr style="border:none;border-top:1px solid #282830;margin:32px 0;" />
            <p style="color:#8A8A9A;font-size:12px;">${APP.brandParent} · Milton Keynes, England · Company No. 16787568</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

export const emailTemplates = {
  welcomeClient: ({ firstName }: EmailArgs) =>
    shell('Welcome to nxted.ai', `<p>Hi ${firstName || 'there'},</p>
<p>Your client account is active. From your portal you can launch Expert evaluations or request a Capture dataset.</p>
<p><a style="color:#5CE1E6;" href="${APP.url}/portal/dashboard">Open the portal →</a></p>`),

  welcomeContributor: ({ firstName }: EmailArgs) =>
    shell('Your contributor application', `<p>Hi ${firstName || 'there'},</p>
<p>We've received your application. Our team reviews each application within 3 business days. You'll hear from us at this email.</p>`),

  contributorApproved: ({ firstName }: EmailArgs) =>
    shell('You\'re approved', `<p>Hi ${firstName || 'there'},</p>
<p>Welcome to the Nxted contributor network. You can now accept tasks in your portal.</p>
<p><a style="color:#5CE1E6;" href="${APP.url}/me/dashboard">Go to portal →</a></p>`),

  passwordReset: ({ firstName, resetUrl }: EmailArgs & { resetUrl: string }) =>
    shell('Reset your password', `<p>Hi ${firstName || 'there'},</p>
<p>Use the link below to reset your nxted.ai password. The link expires in 60 minutes.</p>
<p><a style="color:#5CE1E6;" href="${resetUrl}">${resetUrl}</a></p>`),
};

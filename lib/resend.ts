import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY || '';

export const resend = apiKey ? new Resend(apiKey) : null;

export const FROM_EMAIL = process.env.FROM_EMAIL || 'hello@nxted.ai';

export async function sendMail(args: {
  to: string | string[];
  subject: string;
  react?: React.ReactElement;
  html?: string;
  text?: string;
  replyTo?: string;
}) {
  if (!resend) {
    console.warn('[resend] RESEND_API_KEY not set — skipping email:', args.subject);
    return { id: null };
  }
  const payload: Parameters<typeof resend.emails.send>[0] = {
    from: `nxted.ai <${FROM_EMAIL}>`,
    to: Array.isArray(args.to) ? args.to : [args.to],
    subject: args.subject,
    replyTo: args.replyTo,
  } as Parameters<typeof resend.emails.send>[0];
  if (args.react) (payload as { react?: React.ReactElement }).react = args.react;
  if (args.html) (payload as { html?: string }).html = args.html;
  if (args.text) (payload as { text?: string }).text = args.text;
  const result = await resend.emails.send(payload);
  if (result.error) {
    console.error('[resend] send failed:', result.error);
    throw new Error(result.error.message);
  }
  return { id: result.data?.id ?? null };
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type ContactPayload = {
  name: string;
  contact: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  room?: string;
  message?: string;
  locale?: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== 'object') return false;
  const data = body as ContactPayload;
  return (
    typeof data.name === 'string' &&
    data.name.trim().length >= 2 &&
    typeof data.contact === 'string' &&
    data.contact.trim().length >= 5
  );
}

function buildEmailHtml(data: ContactPayload): string {
  return `
    <h2>White House Sochi — Booking Inquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Contact:</strong> ${data.contact}</p>
    <p><strong>Check-in:</strong> ${data.checkIn || '—'}</p>
    <p><strong>Check-out:</strong> ${data.checkOut || '—'}</p>
    <p><strong>Guests:</strong> ${data.guests || '—'}</p>
    <p><strong>Room:</strong> ${data.room || '—'}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message?.replace(/\n/g, '<br>') || '—'}</p>
    <p><em>Locale: ${data.locale || 'ru'}</em></p>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || 'White House <onboarding@resend.dev>';

    if (resendKey && toEmail) {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `Booking inquiry — ${body.name}`,
        html: buildEmailHtml(body),
        replyTo: body.contact.includes('@') ? body.contact : undefined,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }

    if (process.env.NODE_ENV === 'development') {
      console.info('[contact] Dev mode — inquiry received:', body);
      return NextResponse.json({ ok: true, dev: true });
    }

    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 503 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
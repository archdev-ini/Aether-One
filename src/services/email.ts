
import nodemailer from 'nodemailer';

// This is a mock email service.
// In a real application, you would use a service like Nodemailer with SMTP credentials.

type VerificationEmailPayload = {
  to: string;
  name: string;
  aetherId: string;
  verificationToken: string;
};

type LoginEmailPayload = {
  to: string;
  name: string;
  loginLink: string;
}

type RsvpConfirmationPayload = {
  to: string;
  name: string;
  eventName: string;
  eventDate: Date;
  eventPlatform: string;
  eventLocation: string;
}

const transporter = (
    process.env.SMTP_HOST && 
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
) ? nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: parseInt(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
}) : null;

const fromEmail = process.env.EMAIL_FROM || 'buildrafrica@gmail.com';


const mockEmailLog = (type: string, payload: any) => {
    console.log("====================================");
    console.log(` MOCK EMAIL: ${type}`);
    console.log("====================================");
    console.log(`Recipient: ${payload.to}`);
    console.log("Payload:", payload);
    console.log("====================================");
}


export async function sendVerificationEmail(payload: VerificationEmailPayload) {
  const { to, name, aetherId, verificationToken } = payload;
  
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    const errorMsg = "NEXT_PUBLIC_BASE_URL is not set. Cannot send verification email.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${verificationToken}`;

  if (!transporter) {
      mockEmailLog('Verification', {...payload, verificationLink});
      console.warn("Nodemailer is not configured. Using mock email log.");
      return { success: true };
  }
  
  const subject = "Activate your Aether Account";
  const htmlBody = `
    <p>Hello 👋,</p>
    <p>Welcome to <b>Aether</b> — we’re excited to have you!</p>
    <p>Click the button below to verify your email and activate your account:</p>
    <p>
      <a href="${verificationLink}" 
         style="display: inline-block; padding: 12px 24px; font-family: sans-serif; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #663399; text-decoration: none; border-radius: 5px;">
        Activate Account
      </a>
    </p>
    <p>This link will expire in <b>10 minutes</b>. If it doesn’t work, copy and paste this into your browser:</p>
    <p>${verificationLink}</p>
    <hr/>
    <p>You’re receiving this email because you signed up on Aether with <b>${to}</b>.</p>
    <p>If this wasn’t you, you can safely ignore this message.</p>
  `;

  const textBody = `
    Hello,

    Welcome to Aether! Click the link below to activate your account:
    ${verificationLink}

    This link expires in 10 minutes. If you didn’t sign up, ignore this message.
  `;


  try {
      await transporter.sendMail({
          from: fromEmail,
          to: to,
          subject: subject,
          html: htmlBody,
          text: textBody,
      });
      return { success: true };
  } catch (error) {
      console.error("Error sending verification email via Nodemailer:", error);
      throw new Error("Could not send verification email.");
  }
}


export async function sendLoginEmail(payload: LoginEmailPayload) {
  if (!transporter) {
      mockEmailLog('Login', payload);
      console.warn("Nodemailer is not configured. Using mock email log.");
      return { success: true };
  }
  
  const { to, name, loginLink } = payload;
  const subject = "Your Aether Magic Login Link";
  const htmlBody = `
    <p>Hello 👋,</p>
    <p>You requested to log in to your <b>Aether</b> account.</p>
    <p>Click the button below to log in instantly:</p>
    <p>
      <a href="${loginLink}" 
         style="padding:12px 20px;background:#4f46e5;color:white;text-decoration:none;
                border-radius:8px;display:inline-block;font-weight:bold;">
        Log in to Aether
      </a>
    </p>
    <p>This link will expire in <b>10 minutes</b>. If it doesn’t work, copy and paste this into your browser:</p>
    <p>${loginLink}</p>
    <hr/>
    <p>You’re receiving this email because a login was requested for <b>${to}</b>.</p>
    <p>If you didn’t request this, you can ignore this message.</p>
  `;

  const textBody = `
    Hello,

    Click the link below to log in to your Aether account:
    ${loginLink}

    This link expires in 10 minutes. If you didn’t request this, ignore this message.
  `;

   try {
      await transporter.sendMail({
          from: fromEmail,
          to: to,
          subject: subject,
          html: htmlBody,
          text: textBody,
      });
      return { success: true };
  } catch (error) {
      console.error("Error sending login email via Nodemailer:", error);
      return { success: false, message: "Could not send login email." };
  }
}

export async function sendRsvpConfirmationEmail(payload: RsvpConfirmationPayload) {
  if (!transporter) {
      mockEmailLog('RSVP Confirmation', payload);
      console.warn("Nodemailer is not configured. Using mock email log.");
      return { success: true };
  }

  const { to, name, eventName, eventDate, eventPlatform, eventLocation } = payload;
  const formattedDate = eventDate.toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const subject = `You're confirmed for ${eventName} 🎉`;
  const htmlBody = `
     <div style="font-family: sans-serif; line-height: 1.6;">
      <h2>Hi ${name},</h2>
      <p>This email confirms your spot for <strong>${eventName}</strong>. We're excited to see you there!</p>
      <h3>Event Details:</h3>
      <ul>
        <li><strong>Date & Time:</strong> ${formattedDate}</li>
        <li><strong>Platform:</strong> ${eventPlatform} (${eventLocation})</li>
      </ul>
      <p>We'll send a reminder with the direct link closer to the event date.</p>
      <p>Best,<br/>The Aether Team</p>
    </div>
  `;

  try {
      await transporter.sendMail({
          from: fromEmail,
          to: to,
          subject: subject,
          html: htmlBody,
      });
      return { success: true };
  } catch (error)
 {
      console.error("Error sending RSVP email via Nodemailer:", error);
      return { success: false, message: "Could not send RSVP confirmation." };
  }
}

import nodemailer from 'nodemailer';

// This is a mock email service.
// In a real application, you would use a service like Nodemailer with SMTP credentials.

type VerificationEmailPayload = {
  to: string;
  name: string;
  aetherId: string;
  verificationLink: string;
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

const fromEmail = process.env.EMAIL_FROM || 'noreply@aether.xyz';


const mockEmailLog = (type: string, payload: any) => {
    console.log("====================================");
    console.log(` MOCK EMAIL: ${type}`);
    console.log("====================================");
    console.log(`Recipient: ${payload.to}`);
    console.log("Payload:", payload);
    console.log("====================================");
}


export async function sendVerificationEmail(payload: VerificationEmailPayload) {
  if (!transporter) {
      mockEmailLog('Verification', payload);
      console.warn("Nodemailer is not configured. Using mock email log.");
      return { success: true };
  }

  const { to, name, aetherId, verificationLink } = payload;
  const subject = "Activate Your Aether ID 🌍";
  const htmlBody = `
    <div style="font-family: sans-serif; line-height: 1.6;">
      <h2>Hi ${name},</h2>
      <p>Welcome to the Aether Ecosystem! 🎉</p>
      <p>Your unique Aether ID is: <strong>${aetherId}</strong>.</p>
      <p>Please click the button below to activate your account and join the community:</p>
      <a href="${verificationLink}" style="background-color: #663399; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Activate My Aether ID</a>
      <p>If you didn’t request this, please ignore this email.</p>
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
  } catch (error) {
      console.error("Error sending verification email via Nodemailer:", error);
      return { success: false, message: "Could not send verification email." };
  }
}


export async function sendLoginEmail(payload: LoginEmailPayload) {
  if (!transporter) {
      mockEmailLog('Login', payload);
      console.warn("Nodemailer is not configured. Using mock email log.");
      return { success: true };
  }
  
  const { to, name, loginLink } = payload;
  const subject = "Sign in to Aether 🔑";
  const htmlBody = `
     <div style="font-family: sans-serif; line-height: 1.6;">
      <h2>Hi ${name},</h2>
      <p>Click the button below to sign in to your Aether account:</p>
      <a href="${loginLink}" style="background-color: #663399; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Sign In to Aether</a>
      <p>This link will expire in 15 minutes.</p>
      <p>If you didn’t request this, please ignore this email.</p>
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

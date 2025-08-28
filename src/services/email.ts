
// This is a mock email service.
// In a real application, you would use a service like Resend, SendGrid, or Nodemailer.

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

export async function sendVerificationEmail(payload: VerificationEmailPayload) {
  const { to, name, aetherId, verificationLink } = payload;

  console.log("====================================");
  console.log(" MOCK EMAIL: Sending Verification   ");
  console.log("====================================");
  console.log(`Recipient: ${to}`);
  console.log(`Subject: Activate Your Aether ID 🌍`);
  console.log("--- Body ---");
  console.log(`Hi ${name},`);
  console.log(``);
  console.log(`Welcome to the Aether Ecosystem! 🎉`);
  console.log(`Your unique Aether ID is: ${aetherId}.`);
  console.log(``);
  console.log(`Click the button below to activate your account:`);
  console.log(`[Activate My Aether ID] -> ${verificationLink}`);
  console.log(``);
  console.log(`If you didn’t request this, please ignore.`);
  console.log("====================================");

  // In a real service, you would have error handling here.
  // For the mock, we'll just assume it always succeeds.
  return { success: true };
}


export async function sendLoginEmail(payload: LoginEmailPayload) {
  const { to, name, loginLink } = payload;

  console.log("====================================");
  console.log(" MOCK EMAIL: Sending Login Link     ");
  console.log("====================================");
  console.log(`Recipient: ${to}`);
  console.log(`Subject: Sign in to Aether 🔑`);
  console.log("--- Body ---");
  console.log(`Hi ${name},`);
  console.log(``);
  console.log(`Click the button below to sign in to your Aether account:`);
  console.log(`[Sign In] -> ${loginLink}`);
  console.log(``);
  console.log(`This link will expire in 15 minutes.`);
  console.log(`If you didn’t request this, please ignore.`);
  console.log("====================================");

  return { success: true };
}

export async function sendRsvpConfirmationEmail(payload: RsvpConfirmationPayload) {
  const { to, name, eventName, eventDate, eventPlatform, eventLocation } = payload;

  const formattedDate = eventDate.toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // Basic "Add to Calendar" link generator
  const createCalendarLink = () => {
    const startTime = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endTime = new Date(eventDate.getTime() + (60 * 60 * 1000)).toISOString().replace(/-|:|\.\d\d\d/g, ""); // Assume 1 hour duration
    const details = `Join the Aether event: ${eventName} on ${eventPlatform}.`;
    
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(`${eventPlatform} (${eventLocation})`)}`;
  }
  
  const calendarLink = createCalendarLink();

  console.log("====================================");
  console.log(" MOCK EMAIL: Sending RSVP Confirmation");
  console.log("====================================");
  console.log(`Recipient: ${to}`);
  console.log(`Subject: You're confirmed for ${eventName} 🎉`);
  console.log("--- Body ---");
  console.log(`Hi ${name},`);
  console.log(``);
  console.log(`This email confirms your spot for ${eventName}. We're excited to see you there!`);
  console.log(``);
  console.log(`Event Details:`);
  console.log(`- Date & Time: ${formattedDate}`);
  console.log(`- Platform: ${eventPlatform} (${eventLocation})`);
  console.log(``);
  console.log(`[Add to Calendar] -> ${calendarLink}`);
  console.log(``);
  console.log("====================================");

  return { success: true };
}

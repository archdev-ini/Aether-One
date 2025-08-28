
// This is a mock email service.
// In a real application, you would use a service like Resend, SendGrid, or Nodemailer.

type VerificationEmailPayload = {
  to: string;
  name: string;
  aetherId: string;
  verificationLink: string;
};

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

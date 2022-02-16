import nodemailer from 'nodemailer';

export async function sendEmail({
  email,
  url,
}: {
  email: string;
  url: string;
}) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Abhishek Patel" <info@abhishek.patel>',
    to: email,
    subject: 'Verification Link',
    text: 'Click on the link below to verify your account with us.', // plain text body
    html: `<a href="${url}">${url}</a>`,
  });

  console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'serviceclient@procleanempire.com',
    pass: process.env.GMAIL_APP_PASSWORD || '',
  },
});

async function testEmail() {
  try {
    console.log('🔄 Test d\'envoi d\'email...');
    console.log('Utilisateur:', 'serviceclient@procleanempire.com');
    console.log('Mot de passe configuré:', !!process.env.GMAIL_APP_PASSWORD);
    
    const info = await transporter.sendMail({
      from: '"ProClean Empire" <serviceclient@procleanempire.com>',
      to: 'serviceclient@procleanempire.com',
      subject: '✅ Test d\'email - ProClean Empire',
      html: '<h1>Test d\'email</h1><p>Cet email est un test pour vérifier que le système d\'emails fonctionne.</p>',
      text: 'Test d\'email',
    });

    console.log('✅ Email envoyé avec succès!');
    console.log('Message ID:', info.messageId);
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Détails complets:', error);
    process.exit(1);
  }
}

testEmail();

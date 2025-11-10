

const isDevelopment = process.env.NODE_ENV === 'development';

async function sendVerificationEmail(email, verificationToken) {
  const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;
  
  // DEVELOPMENT: Just log to console
  if (isDevelopment) {
    console.log('\n📧 ===== EMAIL SIMULATION =====');
    console.log('To:', email);
    console.log('Subject: Verify Your Falco AI Account');
    console.log('Message:');
    console.log(`
      Welcome to Falco AI!
      
      Please verify your email by clicking this link:
      ${verificationLink}
      
      This link expires in 24 hours.
      
      If you didn't create an account, ignore this email.
    `);
    console.log('===========================\n');
    return { success: true, mode: 'development' };
  }
  
  // PRODUCTION: Real email service ( add later)
  try {
    // TODO: Add real email service (Resend/SendGrid)
    console.log('📧 Sending real email to:', email);
    return { success: true, mode: 'production' };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}


async function sendPasswordResetEmail(email, resetToken) {
  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
  
  if (isDevelopment) {
    console.log('\n📧 ===== EMAIL SIMULATION =====');
    console.log('To:', email);
    console.log('Subject: Reset Your Password');
    console.log('Message:');
    console.log(`
      Password Reset Request
      
      Click this link to reset your password:
      ${resetLink}
      
      This link expires in 1 hour.
      
      If you didn't request this, ignore this email.
    `);
    console.log('===========================\n');
    return { success: true, mode: 'development' };
  }
  
  // PRODUCTION mode ( later)
  return { success: true, mode: 'production' };
}

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};
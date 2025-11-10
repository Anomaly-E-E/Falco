const { supabase } = require('../config/supabase');
const { hashPassword } = require('../utils/password');
const { isValidEmail, isValidPassword, sanitizeEmail } = require('../utils/validation');
const { generateToken, generateVerificationToken } = require('../utils/jwt');
const { sendVerificationEmail } = require('../services/emailService');

/**
 * 
 * 1. User sends: { email, password }
 * 2.  validate: email format, password strength
 * 3.  check: email already exists?
 * 4.  hash: password (security!)
 * 5.  create: verification token (random string)
 * 6.  insert: user into database
 * 7.  send: verification email
 * 8.  return: success message (NOT the password!)
 */

async function register(req, res) {
  try {
    // STEP 1: Get data from request body
    const { email, password } = req.body;
    
    console.log('📝 Registration attempt for:', email);
    
    // STEP 2: Validate inputs exist
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }
    
    // STEP 3: Sanitize email (remove spaces, lowercase)
    const cleanEmail = sanitizeEmail(email);
    
    // STEP 4: Validate email format
    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }
    
    // STEP 5: Validate password strength
    const passwordCheck = isValidPassword(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({ 
        error: passwordCheck.message 
      });
    }
    
    // STEP 6: Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', cleanEmail)
      .single();
    
    if (existingUser) {
      return res.status(409).json({ 
        error: 'Email already registered' 
      });
    }
    
    // STEP 7: Hash the password (security!)
    const passwordHash = await hashPassword(password);
    
    // STEP 8: Generate verification token (random string)
    const verificationToken = generateVerificationToken();
    
    // STEP 9: Insert user into database
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        email: cleanEmail,
        password_hash: passwordHash,
        verification_token: verificationToken,
        is_verified: false,
        credits: 10 // Free credits on signup!
      })
      .select('id, email, credits, created_at')
      .single();
    
    if (insertError) {
      console.error('Database error:', insertError);
      return res.status(500).json({ 
        error: 'Failed to create account' 
      });
    }
    
    // STEP 10: Send verification email
    await sendVerificationEmail(cleanEmail, verificationToken);
    
    // STEP 11: Return success (NO PASSWORD in response!)
    console.log('✅ User registered:', newUser.email);
    
    res.status(201).json({
      message: 'Registration successful! Please check your email to verify your account.',
      user: {
        id: newUser.id,
        email: newUser.email,
        credits: newUser.credits,
        isVerified: false
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'An error occurred during registration' 
    });
  }
}

module.exports = {
  register
};
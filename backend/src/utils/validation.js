function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  
  function isValidPassword(password) {
    
    // - At least 8 characters
    // - At least one uppercase letter
    // - At least one lowercase letter
    // - At least one number
    
    if (password.length < 8) {
      return { 
        valid: false, 
        message: 'Password must be at least 8 characters long' 
      };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { 
        valid: false, 
        message: 'Password must contain at least one uppercase letter' 
      };
    }
    
    if (!/[a-z]/.test(password)) {
      return { 
        valid: false, 
        message: 'Password must contain at least one lowercase letter' 
      };
    }
    
    if (!/[0-9]/.test(password)) {
      return { 
        valid: false, 
        message: 'Password must contain at least one number' 
      };
    }
    
    return { valid: true, message: 'Password is strong' };
  }
  
  
  function sanitizeEmail(email) {
    return email.trim().toLowerCase();
  }
  
  module.exports = {
    isValidEmail,
    isValidPassword,
    sanitizeEmail
  };

  console.log('Testing validation...');


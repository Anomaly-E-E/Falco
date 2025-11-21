/**
 * AUTH MIDDLEWARE
 * 
 * PURPOSE: Protect routes - only logged-in users can access
 * 
 * STEP-BY-STEP FLOW:
 * 1. Get Authorization header from request
 * 2. Check if token exists in header
 * 3. Extract token from "Bearer <token>" format
 * 4. Verify token is valid (not expired, not tampered)
 * 5. Extract user data from token (userId, email)
 * 6. Add user data to request object
 * 7. Allow request to continue (call next())
 * 
 * IF ANY STEP FAILS: Return 401 Unauthorized error
 */

const { verifyToken } = require('../utils/jwt');

async function authMiddleware(req, res, next) {
  try {
    // Step 1: Get Authorization header from request
    const authHeader = req.headers.authorization;
    
    console.log('🔒 Auth middleware triggered');
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing');
    
    // Step 2: Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'No token provided. Please login.' 
      });
    }
    
    // Step 3: Extract token from "Bearer <token>" format
    const token = authHeader.split(' ')[1];
    
    console.log('Token extracted:', token ? token.substring(0, 20) + '...' : 'MISSING');
    
    // Additional check: Make sure token exists after split
    if (!token) {
      return res.status(401).json({ 
        error: 'Invalid token format. Expected: Bearer <token>' 
      });
    }
    
    // Step 4: Verify token is valid and not expired
    const decoded = verifyToken(token);
    
    console.log('✅ Token valid for user:', decoded.email);
    
    // Step 5: Add user data to request object (available in next functions)
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    // Step 6: Continue to the next middleware/route handler
    next();
    
  } catch (error) {
    // Step 7: Handle errors
    console.error('Auth middleware error:', error);
    return res.status(401).json({ 
      error: 'Invalid or expired token' 
    });
  }
}

module.exports = authMiddleware;
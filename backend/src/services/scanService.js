//Analyze code for security vulnerabilities using OpenAI API

const OpenAI = require('openai');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


 // DETECT PROGRAMMING LANGUAGE

function detectLanguage(code) {
    // Convert to lowercase for easier matching
    const lowerCode = code.toLowerCase();
    
    // Python 
    if (lowerCode.includes('def ') || 
        lowerCode.includes('import ') || 
        lowerCode.includes('print(')) {
      return 'python';
    }
    
    // JavaScript/Node.js 
    if (lowerCode.includes('const ') || 
        lowerCode.includes('let ') || 
        lowerCode.includes('var ') ||
        lowerCode.includes('function ') ||
        lowerCode.includes('=> ') ||
        lowerCode.includes('require(') ||
        lowerCode.includes('console.log')) {
      return 'javascript';
    }
    
    // Java 
    if (lowerCode.includes('public class ') || 
        lowerCode.includes('private ') || 
        lowerCode.includes('system.out.println')) {
      return 'java';
    }
    
    // C/C++ 
    if (lowerCode.includes('#include') || 
        lowerCode.includes('printf(') ||
        lowerCode.includes('std::')) {
      return 'c/c++';
    }
    
    // If no match, return unknown
    return 'unknown';
  }

module.exports = {
    detectLanguage
};
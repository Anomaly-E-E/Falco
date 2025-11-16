const { supabase } = require('../config/supabase');
const { detectLanguage, analyzeCode } = require('../services/scanService');


async function analyzeScan(req, res){
    try{
        const {code} = req.body;
        const userId = req.user.userId;
        console.log(`🔍 Scan request from user: ${req.user.email}`);

        if (!code) {
            return res.status(400).json({ 
              error: 'Code is required' 
            });
        }
        
        //Set Max Code length
        const maxLength = 400;
        if (code.length > maxLength) {
            return res.status(400).json({ 
                error: `Code too long. Maximum ${maxLength} characters allowed.` 
            });
        }

        //Check if code is empty
        if (code.trim().length === 0) {
            return res.status(400).json({ 
              error: 'Code cannot be empty' 
            });
        }
          
        console.log(`Code length: ${code.length} characters`);

        //Check user has credits
        const {data: user, error: userError } = await supabase
          .from ('user')
          .select('credits')
          .eq('id', userId)
          .single();

        if (userError || !user) {
            return res.status(500).json({ 
              error: 'Failed to fetch user data' 
            });
        }

        if (user.credits < 1) {
            return res.status(402).json({ 
              error: 'Insufficient credits. Please purchase more credits to continue scanning.',
              credits: user.credits
            });
        }

        console.log(`User has ${user.credits} credits`);

        






    }catch (error) {
        console.error('❌ Scan error:', error);
        res.status(500).json({ 
          error: 'An error occurred during scan' 
        });
      }
}


module.export= {

}
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");



const returnDescription = async (placeName)=>{
    let description = ''
    try{
      description = await getDescription(placeName)
       
    }catch(err){
        console.log(err.message)
       description = 'Description is not available for this place'
       
    }
    return description
}

  const getDescription = async (placeName) => {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
  
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-pro-exp-02-05",
    });
    
    const generationConfig = {
      temperature: 0.7,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
  
    async function run() {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
  
      const result =
        await chatSession.sendMessage(`You are tasked with providing a description of this specific place: "${placeName}".

If this place name is unknown, fictional, or you don't have reliable information about it, respond ONLY with: "Description is not available for this place" - with no other text.

1. Description Guidelines:
   - Provide a concise, factual description (2-3 sentences maximum)
   - Focus on unique characteristics, historical significance, or key features
   - Prioritize verified, well-established information

2. Information Hierarchy:
   A. Location Context
   B. Primary Purpose/Significance
   C. Notable Features
   D. Specific Details (if applicable)

3. Specific Place Type Handling:

   ### Tourist Attractions/Historical Sites:
   - Include entry fees if definitively known
   - Format fees as:
     SAARC NATIONAL FEE: Local Currency xxx
     FOREIGNER FEE: Local Currency xxx
   - Only list fees with 100% certainty

   ### Restaurants/Dining Establishments:
   - Specify:
     - Cuisine type
     - Vegetarian/Non-Vegetarian status
     - Price range (optional)
   - Only include information you are absolutely certain about

4. Uncertainty Protocol:
   - If ANY critical information is uncertain:
     Respond with: "Detailed information is currently unavailable."

5. Geographical Considerations:
   - Clarify location context
   - If location is outside expected region, state that clearly

6. Formatting Requirements:
   - No introductory phrases
   - Direct, factual language
   - Avoid speculative statements
   - Use clear, professional tone

Constraints:
- Maximum response length: 100 words
- Only use verified, cross-referenced information
- For pricing of tourist attractions if unknow, simply put
    Pricing Details (SAARC Nations): Unknown
                    Foreigners : Unknown
  
  `);
      console.log(result.response.text());
      return result.response.text();
    }
  
    return await run();
  };


  module.exports = {returnDescription}
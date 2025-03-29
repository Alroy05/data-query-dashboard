import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getAiSuggestions = async (query) => {
  try {
    // Use the flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You're an assistant for an oil imports analytics dashboard. Suggest 3 concise query completions based on this partial input: "${query}". Focus on queries about oil imports by country, year ranges, comparisons, and trends. Keep suggestions under 10 words each. Format as a bulleted list.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response into an array of suggestions
    const suggestions = text.split('\n')
      .map(line => line.replace(/^[-•*]\s*/, '').trim())
      .filter(line => line.length > 0 && !line.toLowerCase().includes('example'))
      .slice(0, 3);
    
    return suggestions.length > 0 ? suggestions : [
      `Show oil imports for ${query}`,
      `Compare ${query} with other countries`,
      `Trend of ${query} over last 5 years`
    ];
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return [];
  }
};
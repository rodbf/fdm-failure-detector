import {GoogleGenerativeAI} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: 'models/gemini-1.5-flash-8b'});
const prompt = `Estimate a percentage of how likely this image is to contain a catastrophically failed FDM print. Disconsider minor imperfections. Numeric answer only. Don't explain the answer.`;

async function getAIResponse(base64Image){
  const payload = [
    {
      inlineData: {
        data: base64Image,
        mimeType: 'image/jpeg'
      }
    },
    prompt
  ];
  try{
    const response = await model.generateContent(payload);
    return response.response.text();
  }
  catch (error){
    return console.error(error);
  }
}

export const Gemini = {
  getAIResponse
}
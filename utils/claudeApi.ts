import { ScanResult, mockScanResult } from '../constants/mockData';

// Ensure your ANTHROPIC_API_KEY is available in your environment variables, 
// or for demo purposes, replace it below (NOT RECOMMENDED FOR PRODUCTION).
// Since we don't have an environment variable in Expo Go securely without a backend, 
// we'll rely on a mock fallback if it fails or if the key is missing.
const API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || '';

export async function analyseRental(input: string): Promise<ScanResult> {
  if (!API_KEY) {
    console.warn("No Anthropic API key found. Falling back to mock data.");
    return new Promise((resolve) => setTimeout(() => resolve(mockScanResult), 3000));
  }

  const systemPrompt = `You are RumahShield, a Malaysian rental scam detection AI. Analyse the rental listing provided. Always respond in valid JSON only with no markdown formatting or code blocks.
Fields required:
{
  "verdict": "SAFE" | "SUSPICIOUS" | "HIGH_RISK",
  "rumahScore": number (0-100),
  "riskFactors": string[],
  "recommendations": string[],
  "summary": string (in Bahasa Malaysia or English based on input language)
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022', // Assuming latest available sonnet for demo
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          { role: 'user', content: input }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.content[0].text;
    
    // Clean up in case it still wrapped in markdown
    const jsonString = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString) as ScanResult;
  } catch (error) {
    console.error("Claude API Error:", error);
    // Fallback to mock result on error
    return mockScanResult;
  }
}

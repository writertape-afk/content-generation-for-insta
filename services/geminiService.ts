
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateContentFromPages(urls: string, prompt: string): Promise<string> {
    const model = 'gemini-2.5-flash';
    
    const fullPrompt = `
You are an expert Instagram content strategist and copywriter.

Your task is to analyze the tone, style, and popular content formats from a list of influential Instagram pages. Based on this analysis, you will generate a new piece of content as requested by the user.

**Instagram Pages for Analysis:**
${urls.split('\n').filter(url => url.trim() !== '').map(url => `- ${url.trim()}`).join('\n')}

**User's Content Request:**
"${prompt}"

**Instructions:**
1.  **Analyze:** Mentally synthesize the common themes, visual styles (describe them), caption tones (e.g., humorous, inspirational, educational), and audience engagement tactics from the provided pages.
2.  **Generate:** Create the requested content, ensuring it captures the essence of the analyzed pages.
3.  **Formatting:**
    *   Use Markdown for formatting (e.g., \`**bold**\` for emphasis, bullet points for lists).
    *   For post captions, include relevant and trending hashtags.
    *   For video scripts, clearly label "SCENE," "VISUAL," and "AUDIO/VOICEOVER."

Begin your response with the generated content.
`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: fullPrompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        throw new Error("The AI model failed to generate a response. Please check your inputs or try again later.");
    }
}

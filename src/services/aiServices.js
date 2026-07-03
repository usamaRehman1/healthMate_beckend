import Groq from 'groq-sdk';
import { ENV } from "../constant/index.js"

// Initialize Groq with your environment key
const groq = new Groq({ apiKey: ENV.GROQ_API_KEY });

export const analyzeMedicalReportWithAI = async (cloudinaryUrl) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            // Using Groq's high-performance vision model
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: "text",
                            // Keep explanation clear and patient-friendly.`
                            text: `Carefully analyze the uploaded medical report image. Extract all readable medical values, test names, reference ranges, units, and remarks accurately. Then provide a structured, patient-friendly response including:
                                        A clear and concise summary of overall findings.
                                        A properly formatted table listing all abnormal values (High/Low/Borderline) along with their reference ranges.
                                        Simple explanation of each abnormal parameter in easy language (avoid complex medical jargon).
                                        Possible health concerns associated with the abnormal findings (do NOT provide a final diagnosis).
                                        Lifestyle, diet, precautionary, and medical follow-up suggestions.
                                        Intelligent follow-up questions that the patient should ask their doctor.
                                        If values are normal, clearly reassure the patient and briefly explain what that means.

                                        Guidelines:
                                        Do not assume missing values.
                                        Do not provide a confirmed diagnosis.
                                        Clearly mention if any part of the image is unclear or unreadable.
                                        Keep tone professional, calm, and reassuring.
                                        Use simple language understandable by a non-medical person.
                                        End with a disclaimer: “This analysis is for informational purposes only and not a substitute for professional medical advice.”`
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: cloudinaryUrl // Groq reads the Cloudinary URL directly!
                            }
                        }
                    ]
                }
            ],
            temperature: 0.2, // Kept low for deterministic, factual medical summaries
            // max_tokens: 1024
        });

        // Extract and return the markdown text response
        return chatCompletion.choices[0]?.message?.content || 'No analysis generated.';
    } catch (error) {
        console.error('Error during Groq AI analysis:', error);
        throw new Error(`Groq AI Processing Failed: ${error.message}`);
    }
};
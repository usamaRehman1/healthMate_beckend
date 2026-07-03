// import express from 'express';
// import multer from 'multer';
// import { GoogleGenAI, Type } from '@google/genai';
// import { protect } from '../middleware/auth.js';
// import File from '../models/File.js';

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// // Initialize official Google SDK Engine [cite: 19]
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// router.post('/upload', protect, upload.single('file'), async (req, res) => {
//   const { title, fileType, testDate } = req.body;

//   if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//   try {
//     const base64File = req.file.buffer.toString('base64');

//     // Structural enforcement schema for Gemini SDK
//     const responseSchema = {
//       type: Type.OBJECT,
//       properties: {
//         summaryEng: { type: Type.STRING, description: "Clear health summary strictly in simple English text." }, [cite: 11]
//         summaryUrdu: { type: Type.STRING, description: "Simple medical breakdown strictly translated into conversational Roman Urdu text." }, [cite: 11]
//         abnormalities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of markers falling completely outside safe biological parameters." }, [cite: 28]
//         doctorQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 high-value context questions to present to doctors during visits." }, [cite: 30]
//         remedies: { type: Type.STRING, description: "Safe natural home support suggestions contextually linked to reports." }, [cite: 32]
//         foodsToAvoid: { type: Type.STRING, description: "Nutritional warnings or items to avoid based on results." } [cite: 31]
//       },
//       required: ["summaryEng", "summaryUrdu", "abnormalities", "doctorQuestions", "remedies", "foodsToAvoid"]
//     };

//     // Forward the file payload explicitly to Gemini 1.5 Flash [cite: 10, 19, 21]
//     const aiResponse = await ai.models.generateContent({
//       model: 'gemini-1.5-flash', 
//       contents: [
//         {
//           inlineData: {
//             mimeType: req.file.mimetype,
//             data: base64File
//           }
//         },
//         "Act as a compassionate, highly skilled personal family health companion[cite: 2]. Carefully examine this uploaded medical document (could be an image or PDF) and parse data values perfectly[cite: 21, 26]. Extract insights cleanly into the requested JSON structural schema. Ensure the Roman Urdu translation feels totally organic, natural, and helpful for a common subcontinental family member[cite: 2, 59]."
//       ],
//       config: {
//         responseMimeType: "application/json",
//         responseSchema: responseSchema
//       }
//     });

//     const parsedAiInsight = JSON.parse(aiResponse.text);

//     // Save entry into MongoDB Atlas [cite: 39]
//     const savedDocument = await File.create({
//       userId: req.user.id,
//       title,
//       fileType,
//       testDate,
//       fileData: `data:${req.file.mimetype};base64,${base64File}`,
//       aiSummary: parsedAiInsight
//     });

//     res.status(201).json(savedDocument);
//   } catch (error) {
//     console.error("Gemini / Database Pipeline failure:", error);
//     res.status(500).json({ message: "Analysis processing loop crashed.", error: error.message });
//   }
// });

// // Fetch reports sorted chronologically
// router.get('/', protect, async (req, res) => {
//   try {
//     const documents = await File.find({ userId: req.user.id }).sort({ testDate: -1 });
//     res.json(documents);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;











// //////////////////
// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({ name, email, password: hashedPassword });
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;



import { Router } from "express";
import signUpController from "./controller/signup.js";
import logInController from "./controller/login.js"

const router = Router();

router.post("/signup", signUpController)
router.post("/login", logInController)

export default router
// import mongoose from 'mongoose';

// const fileSchema = new mongoose.Schema({
//     type: Type.OBJECT,
//     properties: {
//         summaryEng: { type: Type.STRING, description: "Clear health summary strictly in simple English text." },
//         summaryUrdu: { type: Type.STRING, description: "Simple medical breakdown strictly translated into conversational Roman Urdu text." },
//         abnormalities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of markers falling completely outside safe biological parameters." },
//         doctorQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 high-value context questions to present to doctors during visits." },
//         remedies: { type: Type.STRING, description: "Safe natural home support suggestions contextually linked to reports." },
//         foodsToAvoid: { type: Type.STRING, description: "Nutritional warnings or items to avoid based on results." }
//     },
//     required: ["summaryEng", "summaryUrdu", "abnormalities", "doctorQuestions", "remedies", "foodsToAvoid"]
// })

// export const fileModel = mongoose.model("Files", fileSchema)

import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    
    title: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    cloudinaryId: {
      type: String,
      required: true,
    },

    aiAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const FileModel = mongoose.model(
  "Files",
  fileSchema
);
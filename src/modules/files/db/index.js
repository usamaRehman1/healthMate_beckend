import { FileModel } from "../model/index.js";
import { analyzeMedicalReportWithAI } from "../../../services/aiServices.js";
import { cloudinary } from "../../../middlewear/uploadMiddlewear.js";

// ADD File
const addFile = async ({ userId, title, file }) => {

  if (!file) {
    throw new Error("No image uploaded.");
  }

  const cloudinaryUrl = file.path;
  const cloudinaryId = file.filename;

  const aiAnalysis = await analyzeMedicalReportWithAI(cloudinaryUrl);

  const newRecord = await FileModel.create({
    userId,
    title,
    imageUrl: cloudinaryUrl,
    cloudinaryId,
    aiAnalysis
  });

  return newRecord;
};

// Get all files of the authenticated user
const getAllFiles = async (userId) => {
    return await FileModel
        .find({ userId })
        .sort({ createdAt: -1 });
};


// const getAllFiles = async (condition) => await FileModel.find(condition);

// // UPDATE File Metadata (e.g., Title)
// exports.updateFile = async (req, res) => {
//   try {
//     const file = await File.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       { title: req.body.title },
//       { new: true }
//     );
//     if (!file) return res.status(404).json({ message: 'File not found' });
//     res.json(file);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // DELETE File from database and Cloudinary
const deleteFile = async (req, res) => {
  try {
    const file = await FileModel.findOne({ _id: req.params.id });
    if (!file) return res.status(404).json({ message: 'File not found' });

    // Remove from Cloudinary
    await cloudinary.uploader.destroy(file.cloudinaryId);

    // Remove from MongoDB
    await file.deleteOne();
    return
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export {
  addFile,
  getAllFiles,
  deleteFile
}

import { addData } from "../db/index.js";
import { ENV, POST_DATA_MESSAGE } from "../../../constant/index.js";

const postController = async (req, res) => {
    try {
        const { bp, sugar, weight, notes, date } = req.body;

        const data = await addData({
            userId: req.user.id,
            bp,
            sugar,
            weight,
            notes,
            date: date || Date.now()
        })

        return res.status(201).json({
            status: true,
            message: POST_DATA_MESSAGE,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

export default postController
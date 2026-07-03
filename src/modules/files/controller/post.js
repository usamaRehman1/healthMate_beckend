import { addFile } from "../db/index.js";
import { ENV, POST_DATA_MESSAGE } from "../../../constant/index.js";

const postController = async (req, res) => {
    try {
        const file = await addFile({
            userId: req.user.id,
            title: req.body.title,
            file: req.file
        });

        // const file = await addFile(req);

        return res.status(201).json({
            status: true,
            message: POST_DATA_MESSAGE,
            data: file
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

export default postController;
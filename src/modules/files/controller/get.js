import { getAllFiles } from "../db/index.js";
import { ENV, GET_DATA_SUCESSFULLY } from "../../../constant/index.js";

const getController = async (req, res) => {
    try {
        const files = await getAllFiles(req.user.id);

        return res.status(200).json({
            status: true,
            count: files.length,
            message: GET_DATA_SUCESSFULLY,
            data: files
        });

    } catch (error) {

        return res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

export default getController;
import { ENV, GET_DATA_SUCESSFULLY } from "../../../constant/index.js";
import { getAllVitals } from "../db/index.js";

const getController = async (req, res) => {
    try {
        const vitals = await getAllVitals(req.user.id);

        return res.status(200).json({
            status: true,
            count: vitals.length,
            message: GET_DATA_SUCESSFULLY,
            data: vitals
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

export default getController;
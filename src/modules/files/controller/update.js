import { updateByID } from "../db/index.js";
import { ENV, UPDATE_DATA_MESSAGE } from "../../../constant/index.js";

const updateController = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id, "==>id")
        // console.log(req.body, "==> data")
        await updateByID(id, req.body)
        return res.status(200).json({ status: true, message: UPDATE_DATA_MESSAGE })
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message })
    }
}

export default updateController
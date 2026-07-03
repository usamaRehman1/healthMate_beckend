import { ENV, DELETE_DATA_MESSAGE, INVALID_ID } from "../../../constant/index.js";
import { deleteFile } from "../db/index.js";

const deleteController = async (req, res) => {
    try {
        const retMessage = await deleteFile(req,res)
        console.log(retMessage, "==> Message")
        return res.status(200).json({ status: true, message: DELETE_DATA_MESSAGE })
    } catch (error) {
        return res.status(400).json({ status: false, message: ENV.INVALID_ID })
    }
}

export default deleteController
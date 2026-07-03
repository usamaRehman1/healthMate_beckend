import { ENV, DELETE_DATA_MESSAGE, INVALID_ID } from "../../../constant/index.js";
import { deleteVital } from "../db/index.js";

const deleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVital = await deleteVital(id, req.user.id);

        if (!deletedVital) {
            return res.status(404).json({
                status: false,
                message: INVALID_ID
            });
        }

        return res.status(200).json({
            status: true,
            message: DELETE_DATA_MESSAGE,
            data: deletedVital
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

export default deleteController;
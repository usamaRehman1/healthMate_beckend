import { ENV, UPDATE_DATA_MESSAGE } from "../../../constant/index.js";
import { updateVital } from "../db/index.js";

const updateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { bp, sugar, weight, notes, date } = req.body;
        const updatedVital = await updateVital(
            id,
            req.user.id,
            {
                bp,
                sugar,
                weight,
                notes,
                date
            }
        );

        if (!updatedVital) {
            return res.status(404).json({
                status: false,
                message: "Vital not found."
            });
        }

        return res.status(200).json({
            status: true,
            message: UPDATE_DATA_MESSAGE,
            data: updatedVital
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

export default updateController;
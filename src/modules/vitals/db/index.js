import { ENV } from "../../../constant/index.js";
import { VitalModel } from "../model/index.js";

const getAllVitals = async (userId) => {
    return await VitalModel.find({ userId }).sort({ date: -1 });
};

const addData = async (data) => {
    return await VitalModel.create(data);
};

const deleteVital = async (id, userId) => {
    return await VitalModel.findOneAndDelete({
        _id: id,
        userId: userId
    });
};

const updateVital = async (id, userId, data) => {
    return await VitalModel.findOneAndUpdate(
        {
            _id: id,
            userId: userId
        },
        data,
        {
            new: true,          // Return the updated document
            runValidators: true // Validate updated fields
        }
    );
};

export {
    getAllVitals,
    addData,
    deleteVital,
    updateVital
}
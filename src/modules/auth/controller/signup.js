import { addData } from "../db/index.js";
import { ENV, SIGNUP_SUCESSFULLY } from "../../../constant/index.js";

const signUpController = async (req, res) => {
    try {
        const data = await addData(req.body)
        if (data) {
            return res.status(201).json({
                status: true,
                message: SIGNUP_SUCESSFULLY
            });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export default signUpController
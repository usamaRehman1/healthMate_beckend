import { getData } from "../db/index.js";
import { ENV, LOGIN_SUCESSFULLY } from "../../../constant/index.js";

const logInController = async (req, res) => {
    try {
        const data = await getData(req.body)

        return res.status(201).json({
            status: true,
            token: data.token,
            user: {
                id: data.user._id,
                name: data.user.name,
                email: data.user.email
            },
            message: LOGIN_SUCESSFULLY
        });


    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export default logInController
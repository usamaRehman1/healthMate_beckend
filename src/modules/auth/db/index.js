import bcrypt from "bcryptjs";
import { UserModel } from "../model/index.js";
import { ENV } from "../../../constant/index.js";
import { generateTokenJWT } from "../../../helper/generateTokenJWT.js";

const getData = async (data) => {
    const { email, password } = data;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('Invalid Credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Credentials');

        }
        const token = generateTokenJWT(user._id)
        return {
            token,
            user
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const addData = async (data) => {
    try {
        const { name, email, password } = data;
        let userExists = await UserModel.findOne({ email });
        if (userExists) {
            throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await UserModel.create({ name, email, password: hashedPassword });
        return user
    } catch (error) {
        throw new Error(error.message);
    }
}
const getAllUsers = async (condition) => await UserModel.find(condition);

export {
    addData,
    getData,
    getAllUsers,
}
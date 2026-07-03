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
        // if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Credentials');

        }
        // return res.status(400).json({ message: 'Invalid Credentials' });

        const token = generateTokenJWT(user._id)

        return {
            token,
            user
        }
        // res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {

        throw new Error(error.message);
        // res.status(500).json({ message: error.message });
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
        // const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET, { expiresIn: '7d' });

        return user
    } catch (error) {
        throw new Error(error.message);
        // return false
    }
}
// const deleteByID = async (id) => await UserModel.findByIdAndDelete(id);
// const updateByID = async (id, data) => await UserModel.findByIdAndUpdate(id, data);

export {
    addData,
    getData,
    // deleteByID,
    // updateByID
}
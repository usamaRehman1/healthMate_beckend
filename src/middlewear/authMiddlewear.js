import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    // console.log(token, "==> Token")

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token execution failed, unauthorized access' });
    }
};
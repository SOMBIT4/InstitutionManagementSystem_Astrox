const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        console.log("checkPassoword", checkPassword);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "20m" });
            const refresh_token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_REF_KEY, { expiresIn: "1d" });

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // Set expiration for 1 day
            };
            res.cookie("refresh_token", refresh_token, tokenOption);
            res.cookie("token", token, { ...tokenOption, expires: new Date(Date.now() + 20 * 60 * 1000) }) // Token expires in 20 minutes
                .status(200).json({
                    message: "Login successfully",
                    data: token,
                    success: true,
                    error: false
                });

        } else {
            throw new Error("Please check password");
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
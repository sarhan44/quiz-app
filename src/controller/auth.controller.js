import User from '../model/userModel.js';
import { storeUserDetails, genToken } from '../utils/helper.js';

export async function login(req, res) {
    try {
        const data = req.body // Email, Pass
        if (!data.Email) {
            return res.status(400).json({ status: false, Message: "Email is Requird" })
        }
        if (!data.Password) {
            return res.status(400).json({ status: false, Message: "Password is Requird" })
        }

        const getUser = await User.findOne({ email: data.Email });
        if (!getUser) {
            return res.status(401).json({ Status: true, Message: "User not registerd with us.." })
        } else {
            if (getUser.password === data.Password) {
                // Token  = jndweiunuineuiwnenfennenwed 
                const userData = { Name: getUser.name, Email: getUser.email }
                const token = genToken(userData);
                // create a json file and store user details and token in a object
                storeUserDetails(userData, token);

                return res.status(200).json({ Status: true, Message: "Login Successfully.", token: token })

            } else if (getUser.password !== data.Password) {
                return res.status(401).json({ Status: true, Message: "Invalid Credintiels." })
            } else {
                return res.status(401).json({ Status: true, Message: "Invalid Credintiels." })
            }
        }

    } catch (e) {
        return res.status(500).json({ status: false, Message: "Server Error", e })
    }
}
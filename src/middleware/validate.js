import jwt from 'jsonwebtoken';
import fs from 'fs'

export async function validateUrl(req, res, next){
    try {
        const header = req.headers.authorization;
        if (!header) return res.status(401).json({ status: false, Message: "Token missing" });

        const token = header.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, "quizApp");

        // Read the contents of the userDetails.json file
        fs.readFile('src/middleware/userDetails.json', (err, data) => {
            if (err) {
                return res.status(500).json({ status: false, Message: "Error reading user details file", err });
            }

            // Parse the JSON content
            const userDetails = JSON.parse(data);

            // Check if the decoded token matches the user details
            if (decoded.Name === userDetails.name && decoded.Email === userDetails.email) {
                // Token is valid
                req.userDetails = {Name: decoded.Name}
                next();
            } else {
                return res.status(401).json({ status: false, Message: "Invalid token" });
            }
        });
    } catch (e) {
        console.log("Error ", e);
        return res.status(500).json({ status: false, Message: "Server Error", e });
    }
}

import fs from 'fs';
import jwt from 'jsonwebtoken'

export function genToken(userData) {
    const token = jwt.sign(userData, 'quizApp', { expiresIn: 60 * 60 });
    return token
}

export function storeUserDetails(userData, token) {
    const userDetails = {
        name: userData.Name,
        email: userData.Email,
        token: token
    };
    // Convert userDetails object to JSON string
    const userDetailsJSON = JSON.stringify(userDetails);
    // Write userDetailsJSON to a JSON file
    fs.writeFileSync('src/middleware/userDetails.json', userDetailsJSON);
}
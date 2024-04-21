import User from '../model/userModel.js'

export async function register(req, res){
    try {
        const data = req.body // Name, Email, Pass
        if(!data.Email && !data.Name && !data.Password){
            return res.status(400).json({status: false, Message: "Feilds Requird"})
        }
        console.log(data)
        const response = {
            name: data.Name,
            email: data.Email,
            password: data.Password
        }
        const save = await User.create(response);
        return res.status(201).json({Status: true, Message: "User Added Successfully."})
    } catch (e) {
        return res.status(500).json({status: false, Message: "Server Error", e})
    }
}
export async function test(req, res){
    const data = req.userDetails
    console.log(data);
    return res.json({data: "Sucesss"})
}
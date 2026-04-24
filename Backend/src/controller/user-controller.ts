import { createUser, findUserByEmail, findAlluser, updateProfilePic } from "../repository/user-repository.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utility/jwt.js";

const addUser = async function (req: any, res: any) {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password || !role) {
            throw new Error("name,email,password,role required")
        }

        const existsUser = await findUserByEmail(email)

        if (existsUser) {
            throw new Error("user already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await createUser({
            name,
            email,
            password: hashedPassword,
            role
        })

        res.send({
            error: false,
            message: "user created successful",
            data: newUser
        })

    } catch (err: any) {
        res.send({
            error: true,
            message: err.message
        })
    }
}



const getAllUser = async function (req: any, res: any) {
    try {
        const userData = await findAlluser()
        res.send({
            error: false,
            message: "user fetched successfully...",
            data: userData
        })
    }
    catch (err: any) {
        res.send({
            error: true,
            message: err.message
        })
    }

}

const login = async function (req: any, res: any) {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            throw new Error("email , password required...")
        }

        const user = await findUserByEmail(email)
        if (!user) {
            throw new Error("please enter a valid data")
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("please enter a valid data")
        }

        const token = generateToken({
            id: user.id,
            role: user.role
        });

        res.send({
            error: false,
            meassage: "user login successfully",
            token: token
        })
    }
    catch (err: any) {
        res.send({
            error: true,
            errormessage: err.message
        })
    }
}

const uploadProfilePicture = async function (req: any, res: any) {
    try {
        const userId = Number(req.params.id)

        if(!req.file){
            throw new Error("file not found no file uploaded ...")
        }

        const filename = req.file.filename
        await updateProfilePic(userId,filename)
        res.send({
            error:false,
            message:"profile photo updated successfully...",
            file:filename
        })
    }
    catch (err: any) {
        res.send({
            error: true,
            errormessage: err.message
        })
    }
}



export { addUser, getAllUser, login, uploadProfilePicture}
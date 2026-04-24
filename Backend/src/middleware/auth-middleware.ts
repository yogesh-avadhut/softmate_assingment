import { verifyToken } from "../utility/jwt.js";

const authenticate = async function (req: any, res: any, next: any) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Access denied , no token provided...")
        }

        const token = authHeader.split(" ")[1];
        const decode = verifyToken(token)

        if (!decode) {
            throw new Error("Invalid or Expired Token")
        }

        req.user = decode
        next()
    }
    catch (err: any) {
        res.send({
            error: true,
            errMessage: err.message
        })
    }
}

const authorizedRole = (...roles: any) => {
    return (req: any, res: any, next: any) => {

        if (!req.user) {
            return res.send({
                error: true,
                message: "unauthorised please login first"
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.send({
                error: true,
                message: `access denied. only [${roles.join(", ")}] can access this route...`
            })
        }

        next()
    }
}

export { authenticate, authorizedRole }
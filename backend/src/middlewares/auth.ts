import { Request, Response, NextFunction} from "express";
import { verifyToken } from "@utils/jwt";
import { JWT_CONFIG } from "@config/jwtcookies";
import { TokenPayload } from "../types/tokens";

interface RequestWithUser extends Request {
    user?: TokenPayload
}
export const authenticateToken = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try{
        const accessToken = req.cookies['accessToken'];
        if(!accessToken){
            res.status(401).json({message: "No access token found"});
            return;
        } 

        const decoded = verifyToken(accessToken, JWT_CONFIG.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({message: "Invalid or expired token"});
        return;
    }
}
import ApiError from "../shared/apiError";
import { jwtFunctions } from "../shared/jwt";
const auth = (...requiredRoles) => async (req, res, next) => {
    try {
        //get authorization token
        // console.log("consoling req.headers: ", req.headers);
        const token = req.headers.authorization?.split(" ")[1];
        console.log("token from auth.ts file backend: ", token);
        if (!token) {
            throw new ApiError(400, "You are not authorized");
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtFunctions.verifyToken(token);
        console.log("decoded user: ", verifiedUser);
        req.user = verifiedUser; // role  , userid
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError(400, "You are not authorized");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
export default auth;

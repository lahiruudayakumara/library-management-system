import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import logger from '../utils/logger';

interface CustomRequest extends Request {
    user?: {
        [key: string]: any;
        id: string;
        role: string;
    };
}

const checkRole = (roles: string[]) => {
    return (req: CustomRequest, res: Response | any, next: NextFunction) => {
        const authHeader = req.header('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).send('Access Denied');
        }
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(403).send('Access Denied');
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                return res.status(500).send('Internal Server Error');
            }
            const verified = jwt.verify(token, secret);
            if (!roles.includes((verified as jwt.JwtPayload).role)) {
                return res.status(403).send('Insufficient Permissions');
            }
            req.user = verified as { [key: string]: any; id: string; role: string };
            next();
        } catch (error) {
            logger.error("Invalid Token")
            res.status(400).send('Invalid Token');
        }
    };
};

export default checkRole;

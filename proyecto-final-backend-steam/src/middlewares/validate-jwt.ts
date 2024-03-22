import jwt from 'jsonwebtoken';
import { VerifyErrors, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import config from '../config/index';

const { keyToken } = config;

const validateToken = async (req: Request, res: Response, next: () => void) => {
    let token = req.headers.authorization || "";
    if (typeof token === "object") {
        return res.status(503).json({
            msg: "Not provided token",
        });
    }
    token = token.split(" ")[1] || "";
    if (token) {
        verify(token, keyToken, async (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                return res.status(403).json({
                    msg: "Failed to authenticate token",
                });
            }
            req.body.decoded = decoded;
            next();
        });
    } else {
        res.status(503).json({
            msg: "Not provided token",
        });
    }
};

export default validateToken

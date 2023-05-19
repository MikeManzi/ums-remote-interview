import { Response, NextFunction } from "express";
import { IRequest } from "../utils/types";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const authenticate = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }
    const decoded: any = jwt.verify(token, process.env.AUTH_KEY!);
    const user = await User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      throw new Error();
    }
    req.auth = {
      userId: decoded.userId,
      role: decoded.role,
      token,
    };
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

export const authorize = (role: String) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    if (role !== req.auth?.role) {
      try {
        return next(res.status(403).send("Not authorized"));
      } catch (e) {
        return res.status(400).send({ data: e });
      }
    }
    next();
  };
};
